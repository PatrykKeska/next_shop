import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  CountCartTotalPriceDocument,
  CountCartTotalPriceMutation,
  CountCartTotalPriceMutationVariables,
  CreateCartItemDocument,
  CreateCartItemMutation,
  CreateCartItemMutationVariables,
  GetProductsInUserCartDocument,
  GetProductsInUserCartQuery,
  GetProductsInUserCartQueryVariables,
  PublishCartItemDocument,
  PublishCartItemMutation,
  PublishCartItemMutationVariables,
} from "@/graphql/generated/graphql";
import { AddCartItemType } from "@/utils/types/Cart";
import { NextApiHandler } from "next";

const AddItem: NextApiHandler = async (req, res) => {
  const { email, slug, quantity } = req.body as AddCartItemType;
  try {
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
    try {
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
        await currentCartItems.data?.cart?.cartItems?.map(async (item) => {
          if (!item.product) return null;
          const totalPriceOfEachItem = item.quantity * item.product.price;
          currTotalPrice.push(totalPriceOfEachItem);
        });
        const totalPrice = currTotalPrice.reduce((a, b) => a + b, 0);

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
      }

      res.json({ message: "Product added to cart!" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Cant publish product in cart!" });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong!" });
  }
};

export default AddItem;
