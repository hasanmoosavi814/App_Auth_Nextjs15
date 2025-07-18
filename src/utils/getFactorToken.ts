import { TwoFactorToken } from "@prisma/client";
import { db } from "@/lib/db";

export const getFactorTokenByToken = async (
  token: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching twoFactorToken by token:", error);
    return null;
  }
};

export const getFactorTokenByEmail = async (
  email: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching twoFactorToken by email:", error);
    return null;
  }
};
