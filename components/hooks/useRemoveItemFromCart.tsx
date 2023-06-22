import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
export const useRemoveItemFromCart = () => {
  const session = useSession();
  const query = useQueryClient();
  const removeItemFn = async (slug: string) => {
    const res = await fetch("/api/cart/remove-item", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: session.data?.user?.email,
        slug: slug,
      }),
    });
    return await res.json();
  };

  const mutation = useMutation({
    mutationFn: removeItemFn,
  });

  const RemoveItemFromCart = async (slug: string) => {
    mutation.mutate(slug);
    query.invalidateQueries({ queryKey: ["cartItems"] });
  };
  return { RemoveItemFromCart };
};
