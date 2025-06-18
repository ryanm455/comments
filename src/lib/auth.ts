import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { authConfig } from "../../auth.config";
import prisma from "./prisma";

const adapter = PrismaAdapter(prisma);

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const result = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!result.success) throw new Error("Invalid credentials");

        const { email, password } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;
        const valid = await Bun.password.verify(password, user.password);
        if (!valid) return null;
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  adapter,
});
