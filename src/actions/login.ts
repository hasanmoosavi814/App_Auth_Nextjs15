"use server";

import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { getFactorTokenByEmail } from "@/utils/getFactorToken";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { db } from "@/lib/db";

import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    const errors = validatedField.error.flatten().fieldErrors;
    return { error: errors };
  }
  const { email, password, code } = validatedField.data;
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
  if (existingUser.isTwoFactorEnabled) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email!);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return {
        twoFactor: true,
        success: "Two-factor code sent to your email.",
      };
    }
    const existingToken = await getFactorTokenByEmail(existingUser.email!);
    if (
      !existingToken ||
      existingToken.token !== code ||
      new Date(existingToken.expires) < new Date()
    )
      return { error: "Invalid or expired two-factor code." };
    await db.twoFactorConfirmation.create({
      data: { userId: existingUser.id },
    });
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
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
          return { error: "Unexpected authentication error." };
      }
    }
    return { error: "Something went wrong. Please try again." };
  }
};
