import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  CreateCartItemMutation,
  CreateCartItemMutationVariables,
  CreateCartItemDocument,
  PublishCartItemDocument,
  PublishCartItemMutation,
  PublishCartItemMutationVariables,
} from "@/graphql/generated/graphql";
import { countTotalPrice } from "./countTotalPrice";

export const addNewProductToCart = async (
  email: string,
  slug: string,
  quantity: number
) => {
  const addedProduct = await authorizatedApolloClient.mutate<
    CreateCartItemMutation,
    CreateCartItemMutationVariables
  >({
    mutation: CreateCartItemDocument,
    variables: {
      data: {
        cart: { connect: { exmail: email } },
        quantity: quantity,
        product: { connect: { slug: slug } },
      },
    },
  });
  if (!addedProduct.data?.createCartItem?.id) {
    throw new Error("The product was not added to the cart");
  }
  const publishedProduct = await authorizatedApolloClient.mutate<
    PublishCartItemMutation,
    PublishCartItemMutationVariables
  >({
    mutation: PublishCartItemDocument,
    variables: {
      id: addedProduct.data?.createCartItem?.id,
    },
  });
  if (publishedProduct.data?.publishCartItem?.cart?.id) {
    await countTotalPrice(email);
    return true;
  }
};
