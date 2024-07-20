import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    name: string;
    username: string;
    role: UserRole;
  }
  interface Session {
    user: User & {
      name: string;
      username: string;
      role: UserRole;
    };
    token: {
      name: string;
      username: string;
      role: UserRole;
    };
  }
}
