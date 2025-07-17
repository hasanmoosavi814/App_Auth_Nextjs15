import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./route";
import { protectedRoutes, publicRoutes } from "./route";
import { NextResponse } from "next/server";
import { matchesRoute } from "./utils/MatchFunction";

import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname.startsWith(apiAuthPrefix)) return NextResponse.next();

  const isPublicRoute = matchesRoute(pathname, publicRoutes);
  const isAuthRoute = matchesRoute(pathname, authRoutes);
  const isDeclaredProtected = matchesRoute(pathname, protectedRoutes);

  const isProtectedRoute =
    isDeclaredProtected || (!isPublicRoute && !isAuthRoute);

  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));

  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)?"],
};
