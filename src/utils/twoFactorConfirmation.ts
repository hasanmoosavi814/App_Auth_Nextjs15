import { TwoFactorConfirmation } from "@prisma/client";
import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<TwoFactorConfirmation | null> => {
  try {
    const confirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return confirmation;
  } catch (error) {
    console.error("Error fetching TwoFactorConfirmation:", error);
    return null;
  }
};
