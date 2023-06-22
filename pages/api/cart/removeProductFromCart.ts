import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  RemoveProductFromCartDocument,
  RemoveProductFromCartMutation,
  RemoveProductFromCartMutationVariables,
} from "@/graphql/generated/graphql";
import { countTotalPrice } from "./countTotalPrice";

export const removeProductFromCart = async (id: string, email: string) => {
  try {
    authorizatedApolloClient.mutate<
      RemoveProductFromCartMutation,
      RemoveProductFromCartMutationVariables
    >({
      mutation: RemoveProductFromCartDocument,
      variables: {
        id: id,
        email: email,
      },
    });
    await countTotalPrice(email);
  } catch (err) {
    throw new Error("No such product in cart");
  }
};
