import { JWT as DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    isTwoFactorEnabled: boolean;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    isTwoFactorEnabled: boolean;
    name?: string;
    email?: string;
    picture?: string;
  }
}
