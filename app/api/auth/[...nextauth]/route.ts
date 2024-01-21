import prisma from "@/prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        if (!credentials.email || !credentials.password) {
          console.log("No email or password provided");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("email is incorrect");
          return null;
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          console.log("password is incorrect");
          return null;
        }

        return {
          id: user.id.toString(), // Use toString() to ensure it's a string
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      console.log("jwt callback", { token, user });
      return {
        ...token,
        ...user,
      };
    },
    session: ({ session, token }) => {
      return {
        ...session,
        ...token,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
