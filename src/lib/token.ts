import { getVerificationTokenByEmail } from "@/utils/getVerificationToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 30 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const newToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newToken;
};
