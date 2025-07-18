export const publicRoutes = ["/", "/auth/new-verification", "/contact"];

export const protectedRoutes = ["/settings", "/dashboard"];

export const authRoutes = [
  "/auth/error",
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/verify-email",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
