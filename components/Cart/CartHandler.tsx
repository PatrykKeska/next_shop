import { CartItem } from "@/graphql/generated/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const useUpdateCart = () => {
  const session = useSession();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const countTotalItems = (data: CartItem[]) => {
    const values = data?.map((item) => item.quantity);
    const total = values?.reduce((a, b) => a + b, 0);
    setTotalItems(total);
  };

  const countTotalPrice = (data: CartItem[]) => {
    const values = data?.map((item) => item.product?.price! * item.quantity);
    const total = values?.reduce((a, b) => a + b, 0);
    setTotalPrice(total!);
  };

  const getCartItems = async () => {
    if (session.data?.user?.email === undefined) return null;
    const res = await fetch("/api/cart/get-item", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: session.data?.user?.email,
      }),
    });
    const { cartItems } = await res.json();
    setTotalItems(cartItems.data.cart.totalItems);
    return cartItems.data.cart.cartItems;
  };

  const query = useQueryClient();

  const { data, isLoading, isError } = useQuery<CartItem[]>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    refetchOnMount: "always",
  });

  useEffect(() => {
    query.fetchQuery<CartItem[]>({
      queryKey: ["cartItems"],
      queryFn: getCartItems,
    });
  }, [session]);

  useEffect(() => {
    countTotalItems(data!);
    countTotalPrice(data!);
  }, [data, totalPrice]);

  return { data, isLoading, isError, totalPrice, totalItems };
};
