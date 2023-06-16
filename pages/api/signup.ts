import { NextApiHandler } from "next";
import { validateSchemaMiddleware } from "./middleware/validateSchemaMiddleware";
import {
  SignupFormData,
  SignupSchema,
} from "@/utils/yupValidators/SignupValidator";
import * as bcrypt from "bcrypt";
import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables,
  IsExmailExistQueryVariables,
} from "@/graphql/generated/graphql";
import { IsExmailExistQuery } from "@/graphql/generated/graphql";
import { IsExmailExistDocument } from "@/graphql/generated/graphql";

interface error {
  message: string;
  code: number;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const { data } = await authorizatedApolloClient.query<
      IsExmailExistQuery,
      IsExmailExistQueryVariables
    >({
      query: IsExmailExistDocument,
      variables: {
        email: req.body.email,
      },
    });
    const isEmailExist =
      data?.draftAccount?.email === req.body.email ||
      data?.publishedAccount?.email === req.body.email;
    if (isEmailExist) {
      const error = new Error("Email already registered") as unknown as error;
      error.code = 409;
      throw error;
    } else {
      const { firstName, lastName, email, password } =
        req.body as SignupFormData;
      const passwordHash = await bcrypt.hash(password, 12);

      await authorizatedApolloClient.mutate<
        CreateAccountMutation,
        CreateAccountMutationVariables
      >({
        mutation: CreateAccountDocument,
        variables: {
          firstName,
          lastName,
          email,
          password: passwordHash,
        },
      });

      res.status(200).json({
        message: "Account created",
      });
    }
  } catch (error) {
    const err = error as error;
    return res.status(400).json({ message: err.message, code: err.code });
  }
};

export default validateSchemaMiddleware(SignupSchema, handler);
