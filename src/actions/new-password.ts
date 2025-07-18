"use server";

import { getPasswordResetTokenByToken } from "@/utils/resetPasswordToken";
import { NewPasswordSchema } from "@/schema";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: "Token is required" };
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return { error: errors };
  }
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken || existingToken.expires < new Date())
    return { error: "Token is invalid or has expired" };
  const user = await getUserByEmail(existingToken.email);
  if (!user) return { error: "Email does not exist" };
  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
  await db.passwordResetToken.delete({
    where: { token },
  });
  return { success: "Password has been reset. You can now log in." };
};
