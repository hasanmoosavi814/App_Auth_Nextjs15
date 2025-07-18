import { JWT as DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      address?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    address?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    name?: string;
    email?: string;
    picture?: string;
  }
}
