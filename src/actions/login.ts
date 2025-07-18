"use server";

import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    const errors = validatedField.error.flatten().fieldErrors;
    return { error: errors };
  }
  const { email, password } = validatedField.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password)
    return { error: "Invalid credentials." };
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
    if (!result || result.error) return { error: "Invalid credentials." };
    return {
      success: "Login successful!",
      redirect: result.url || DEFAULT_LOGIN_REDIRECT,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "An unexpected authentication error occurred." };
      }
    }
    return { error: "Something went wrong. Please try again." };
  }
};
