import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  IsProductExistInCartQuery,
  IsProductExistInCartQueryVariables,
  IsProductExistInCartDocument,
  UpdateProductInCartQuantityMutation,
  UpdateProductInCartQuantityMutationVariables,
  UpdateProductInCartQuantityDocument,
} from "@/graphql/generated/graphql";
import { countTotalPrice } from "./countTotalPrice";
import { removeProductFromCart } from "./removeProductFromCart";

export const updateExistingProductQuantity = async (
  email: string,
  slug: string,
  sign: "-" | "+"
) => {
  const isExactProductExistInCart = await authorizatedApolloClient.query<
    IsProductExistInCartQuery,
    IsProductExistInCartQueryVariables
  >({
    query: IsProductExistInCartDocument,
    variables: {
      email: email,
      slug: slug,
    },
  });

  if (
    isExactProductExistInCart.data.cart?.cartItems.length &&
    isExactProductExistInCart.data.cart?.cartItems[0].quantity <= 1 &&
    sign === "-"
  ) {
    console.log("removeProductFromCart");
    removeProductFromCart(
      isExactProductExistInCart.data.cart?.cartItems[0].id,
      email
    );
    return true;
  } else if (
    isExactProductExistInCart.data.cart?.cartItems.length &&
    isExactProductExistInCart.data.cart?.cartItems[0].quantity > 1 &&
    sign === "-"
  ) {
    await authorizatedApolloClient.mutate<
      UpdateProductInCartQuantityMutation,
      UpdateProductInCartQuantityMutationVariables
    >({
      mutation: UpdateProductInCartQuantityDocument,
      variables: {
        id: isExactProductExistInCart.data.cart?.cartItems[0].id,
        quantity:
          isExactProductExistInCart.data.cart?.cartItems[0].quantity - 1,
      },
    });
    await countTotalPrice(email);
    return true;
  } else if (
    isExactProductExistInCart.data.cart?.cartItems.length &&
    isExactProductExistInCart.data.cart?.cartItems[0].quantity >= 1 &&
    sign === "+"
  ) {
    await authorizatedApolloClient.mutate<
      UpdateProductInCartQuantityMutation,
      UpdateProductInCartQuantityMutationVariables
    >({
      mutation: UpdateProductInCartQuantityDocument,
      variables: {
        id: isExactProductExistInCart.data.cart?.cartItems[0].id,
        quantity:
          isExactProductExistInCart.data.cart?.cartItems[0].quantity + 1,
      },
    });
    await countTotalPrice(email);
    return true;
  } else {
    return false;
  }
};
