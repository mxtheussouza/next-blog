import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    username?: string;
  }

  interface Session {
    user?: {
      username?: string;
    } & DefaultSession["user"];
  }
}
