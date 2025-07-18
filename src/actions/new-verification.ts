"use server";

import { getVerificationTokenByToken } from "@/utils/getVerificationToken";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Invalid or expired token" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User not found" };
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Verification successful" };
};
