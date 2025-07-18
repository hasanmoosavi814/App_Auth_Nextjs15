"use server";

import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getUserByEmail } from "@/lib/user";
import { ResetSchema } from "@/schema";

import * as z from "zod";

type ResetResult = { success: string } | { error: Record<string, string[]> };

export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ResetResult> => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return { error: errors };
  }
  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user)
    return { success: "If that email exists, we have sent a reset link." };
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "If that email exists, we have sent a reset link." };
};
