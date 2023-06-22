import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
export const useAddItemToCart = (slug: string) => {
  const session = useSession();

  const addItemFn = async () => {
    const res = await fetch("/api/cart/add-item", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: session.data?.user?.email,
        slug: slug,
        quantity: 1,
      }),
    });
    return await res.json();
  };

  const mutation = useMutation({
    mutationFn: addItemFn,
  });

  const addItemToCart = async () => {
    mutation.mutate();
  };
  return { addItemToCart };
};
