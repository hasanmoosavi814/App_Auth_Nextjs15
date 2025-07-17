import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./lib/user";
import { LoginSchema } from "./schema";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) return null;
        const { email, password } = validated.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
