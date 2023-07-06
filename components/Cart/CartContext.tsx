import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getItemsFromLocalStorage, setItemToLocalStorage } from "./CartModel";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@/graphql/generated/graphql";
import { count } from "console";

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
  countEachItemQuantity: (id: string) => number;
}

export const cartStateContext = createContext<CartState | null>(null);
export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const session = useSession();
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

  const { data, isLoading, isError, isFetched } = useQuery<CartItem[]>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    refetchOnMount: "always",
    onSuccess: () => {
      setCartItems(data!);
      setItemToLocalStorage(data!);
    },
  });

  useEffect(() => {});
  // const countTotalPrice = useCallback(() => {
  //   const itemsPerCount = cartItems.map((item) => {
  //     if (!item.product) return 0;
  //     item.product.price * item.quantity;
  //     const totalPrice = itemsPerCount.reduce((a, b) => a + b, 0);
  //     setTotalPrice(totalPrice / 100);
  //   });
  // }, [cartItems]);

  const countTotalItems = useCallback(() => {
    const eachItemCounts = cartItems.map((item) => item.quantity);
    const totalItems = eachItemCounts.reduce((a, b) => a + b, 0);
    setTotalItems(totalItems);
  }, [cartItems]);

  const countEachItemQuantity = useCallback(
    (id: string) => {
      const eachItemQuantity = cartItems
        .filter((item) => item.id === id)
        .map((item) => item.quantity);
      const totalItems = eachItemQuantity.reduce((a, b) => a + b, 0);
      return totalItems;
    },
    [cartItems]
  );

  useEffect(() => {
    if (isFetched) {
      countTotalItems();
    }
  }, [isFetched]);
  // useEffect(() => {
  //   (async () => {
  //     if (isLoaded) {
  //       setLoading(false);
  //       return;
  //     }
  //     countTotalPrice();
  //     countTotalItems();
  //   })();
  // }, [cartItems, isLoaded, countTotalItems]);

  return (
    <cartStateContext.Provider
      value={{
        items: cartItems,
        totalPrice: totalPrice,
        totalItems: totalItems,
        countEachItemQuantity,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const exisitingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!exisitingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.quantity + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const exsistingItem = prevState.find((item) => item.id === id);
            if (exsistingItem && exsistingItem?.quantity <= 1) {
              return prevState.filter((item) => item.id !== id);
            }
            return prevState.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  count: item.quantity - 1,
                };
              }
              return item;
            });
          });
        },
      }}
    >
      {children}
    </cartStateContext.Provider>
  );
};

export const useCartState = () => {
  // const query = useQueryClient();

  // const { data, isLoading, isError } = useQuery<CartItem[]>({
  //   queryKey: ["cartItems"],
  //   queryFn: getCartItems,
  //   refetchOnMount: "always",
  // });

  // useEffect(() => {
  //   query.fetchQuery<CartItem[]>({
  //     queryKey: ["cartItems"],
  //     queryFn: getCartItems,
  //   });
  // }, [session]);

  const cartState = useContext(cartStateContext);
  if (!cartState) throw new Error("Your Forgot CartStateProvider");
  return cartState;
};
