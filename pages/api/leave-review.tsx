import { authorizatedApolloClient } from "@/graphql/apolloClient";
import { NextApiHandler } from "next";
import { validateSchemaMiddleware } from "./middleware/validateSchemaMiddleware";
import {
  ReviewFormApiType,
  reviewFormSchema,
} from "@/utils/yupValidators/reviewValidator";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
} from "@/graphql/generated/graphql";

import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { error } from "console";

interface error {
  statusCode: number;
  message: string;
}
const handler: NextApiHandler = async (req, res) => {
  const data = await req.body;
  const { email, content, headline, name, rating, slug } =
    (await data) as ReviewFormApiType;

  const session = await getServerSession(req, res, authOptions);
  try {
    if (!session) {
      const error = new Error("Not authenticated") as unknown as error;
      error.statusCode = 401;
      throw error;
    } else {
      authorizatedApolloClient.mutate<
        CreateProductReviewMutation,
        CreateProductReviewMutationVariables
      >({
        mutation: CreateProductReviewDocument,
        variables: {
          review: {
            headline: headline,
            name: name,
            email: email,
            content: content,
            rating: rating,
            product: { connect: { slug: slug } },
          },
        },
      });
      res.status(200).json({ message: "Review created", code: 200 });
    }
  } catch (error) {
    const err = error as error;
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export default validateSchemaMiddleware(reviewFormSchema, handler);
