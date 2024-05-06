import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    username: string;
  }
  interface Session {
    user: User & {
      name: string;
      username: string;
    };
    token: {
      name: string;
      username: string;
    };
  }
}
