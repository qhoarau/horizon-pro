import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  debug: true,
  useSecureCookies: false, // Ajoutez cette ligne
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const employee = await prisma.v2_employee.findFirst({
          where: { mail: credentials.email },
        });
        if (!employee) {
          return null;
        }
        // const isPasswordValid = await bcrypt.compare(
        //   credentials.password,
        //   employee.password
        // );
        const isPasswordValid = credentials.password === employee.password;
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: employee.id.toString(),
          email: employee.mail,
          name: `${employee.prenom} ${employee.nom}`,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
