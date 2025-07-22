import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Two-Factor Authentication Code",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Two-Factor Authentication</h2>
          <p>Use the following code to complete your sign-in:</p>
          <p style="font-size: 24px; font-weight: bold;">${token}</p>
          <hr />
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send two-factor token email:", error);
    throw new Error("Failed to send two-factor authentication email.");
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. <a href="${resetLink}" style="color: #6366F1; text-decoration: underline;">Click here</a> to reset your password.</p>
          <hr />
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Password reset email sending failed.");
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Verify Your Email Address</h2>
          <p><a href="${confirmLink}" style="color: #6366F1; text-decoration: underline;">Click here</a> to verify your email address and complete your registration.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Email sending failed.");
  }
};
