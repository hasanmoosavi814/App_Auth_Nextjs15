"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/utils/getVerificationToken";
import { getUserByEmail } from "@/lib/user";

/**
 * Handles email verification by token.
 * @param token The verification token from the email link
 * @returns success or error message
 */
export const newVerification = async (token: string) => {
  try {
    if (!token) return { error: "Verification token is missing." };

    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) return { error: "Invalid or expired token." };

    const isExpired = new Date(existingToken.expires) < new Date();
    if (isExpired) return { error: "Verification token has expired." };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "User not found." };

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email, // Optional: only if email was updated
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Your email has been successfully verified." };
  } catch (error) {
    console.error("[VERIFICATION_ERROR]:", error);
    return {
      error:
        "Something went wrong during verification. Please try again later.",
    };
  }
};
