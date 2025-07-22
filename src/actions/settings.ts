"use server";

import { SettingsSchema } from "@/schema";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/lib/user";
import { db } from "@/lib/db";

import * as z from "zod";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validated = SettingsSchema.safeParse(values);
  if (!validated.success) return { error: validated.error.issues[0].message };
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };
  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "User not found" };
  const { name, email, role, isTwoFactorEnabled } = validated.data;
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: "Email Already in User!" };
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }
  let updatedPassword: string | undefined = undefined;
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) return { error: "Incorrect password!" };
    updatedPassword = await bcrypt.hash(values.newPassword, 10);
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(typeof isTwoFactorEnabled === "boolean" && { isTwoFactorEnabled }),
      ...(updatedPassword && { password: updatedPassword }),
    },
  });

  return { success: "Account updated successfully." };
};
