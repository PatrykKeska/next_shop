import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  GetProductsInUserCartQuery,
  GetProductsInUserCartQueryVariables,
  GetProductsInUserCartDocument,
  CountCartTotalPriceMutation,
  CountCartTotalPriceMutationVariables,
  CountCartTotalPriceDocument,
} from "@/graphql/generated/graphql";

export const countTotalPrice = async (email: string) => {
  const currentCartItems = await authorizatedApolloClient.query<
    GetProductsInUserCartQuery,
    GetProductsInUserCartQueryVariables
  >({
    query: GetProductsInUserCartDocument,
    variables: {
      email: email,
    },
  });
  const currTotalPrice = [] as number[];
  let totalPrice = 0;
  await currentCartItems.data?.cart?.cartItems?.map(async (item) => {
    if (!item.product) return null;
    const totalPriceOfEachItem = item.quantity * item.product.price;
    currTotalPrice.push(totalPriceOfEachItem);
  });
  if (
    currentCartItems.data?.cart?.cartItems?.length &&
    currentCartItems.data?.cart?.cartItems?.length <= 0
  ) {
    totalPrice = 0;
  } else {
    totalPrice = currTotalPrice.reduce((a, b) => a + b);
  }

  await authorizatedApolloClient.mutate<
    CountCartTotalPriceMutation,
    CountCartTotalPriceMutationVariables
  >({
    mutation: CountCartTotalPriceDocument,
    variables: {
      email: email,
      value: totalPrice,
    },
  });
  return totalPrice;
};
