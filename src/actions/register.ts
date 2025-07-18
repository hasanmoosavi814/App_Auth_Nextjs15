"use server";

import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";
import z from "zod";
import { sendVerificationEmail } from "@/lib/mail";

type RegisterResult =
  | { success: string }
  | { error: string }
  | { error: Record<string, string[]> };

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<RegisterResult> => {
  const validatedField = RegisterSchema.safeParse(values);
  if (!validatedField.success) {
    const errors = validatedField.error.flatten().fieldErrors;
    return { error: errors };
  }
  const { email, name, password } = validatedField.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser)
    return { error: { email: ["User already exists with this email."] } };
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation email sent!" };
};
