import { authorizatedApolloClient } from "@/graphql/apolloClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from "@/graphql/generated/graphql";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username === undefined) return null;
        const userByEmail = await authorizatedApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: { email: credentials.username },
        });

        if (!userByEmail.data.account?.password) {
          return null;
        }

        const arePasswordEqual = await bcrypt.compareSync(
          credentials.password,
          userByEmail.data.account.password
        );

        if (!arePasswordEqual) {
          return null;
        } else {
          return {
            id: userByEmail.data.account.id,
            email: userByEmail.data.account.email,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
