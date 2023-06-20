import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  GetProductsInUserCartDocument,
  GetProductsInUserCartQuery,
  GetProductsInUserCartQueryVariables,
} from "@/graphql/generated/graphql";
import { GetCartItemsType } from "@/utils/types/Cart";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const GetCartItem: NextApiHandler = async (req, res) => {
  const { email } = req.body as GetCartItemsType;
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.email !== email) {
    throw new Error("Not authenticated");
  }
  try {
    const cartItems = await authorizatedApolloClient.query<
      GetProductsInUserCartQuery,
      GetProductsInUserCartQueryVariables
    >({
      query: GetProductsInUserCartDocument,
      variables: {
        email: email,
      },
    });

    res.json({ cartItems });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export default GetCartItem;
