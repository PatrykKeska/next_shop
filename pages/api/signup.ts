import { NextApiHandler } from "next";
import { validateSignupMiddleware } from "./middleware/validateSignupMiddleware";
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
} from "@/graphql/generated/graphql";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body as SignupFormData;
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await authorizatedApolloClient.mutate<
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
      userID: user.data?.createAccount?.id,
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export default validateSignupMiddleware(SignupSchema, handler);
