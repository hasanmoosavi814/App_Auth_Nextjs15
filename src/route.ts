export const publicRoutes = ["/", "/about", "/contact"];

export const protectedRoutes = ["/settings", "/dashboard"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
  "/auth/verify-email",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
