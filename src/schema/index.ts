import { UserRole } from "@prisma/client";

import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().min(6)),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New Password is Required !",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    {
      message: "Password is Required !",
      path: ["Password"],
    }
  );

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  code: z.string().optional(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ResetSchema = z.object({
  email: z.string().min(1, "Email is required"),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
