import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "./lib/user";

import authConfig from "./auth.config";
import NextAuth from "next-auth";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) throw new Error("User not found");

      token.id = user.id;
      token.role = user.role;
      token.name = user.name ?? undefined;
      token.email = user.email ?? undefined;
      token.picture = user.image ?? undefined;

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          image: token.picture,
        },
      };
    },
  },

  ...authConfig,
});
