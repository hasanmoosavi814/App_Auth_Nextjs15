import { getTwoFactorConfirmationByUserId } from "./utils/twoFactorConfirmation";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "./lib/user";
import { db } from "./lib/db";

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { getAccountByUserId } from "./lib/account";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async signIn({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email ?? "" },
        });
        if (existingUser && existingUser.id !== user.id)
          throw new Error("OAuthAccountNotLinked");
        return true;
      }
      const existingUser = await getUserById(user.id);
      console.log(existingUser);
      if (!existingUser) return true;
      if (!existingUser.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) throw new Error("User not found");
      const existingAccount = await getAccountByUserId(user.id);
      token.id = user.id;
      token.role = user.role;
      token.isOAuth = !!existingAccount;
      token.name = user.name ?? undefined;
      token.email = user.email ?? undefined;
      token.picture = user.image ?? undefined;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          image: token.picture,
          isOAuth: token.isOAuth as boolean,
          isTwoFactorEnabled: token.isTwoFactorEnabled,
        },
      };
    },
  },

  ...authConfig,
});
