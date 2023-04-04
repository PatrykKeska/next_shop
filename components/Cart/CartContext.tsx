import { ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
  price: number;
  title: string;
}

interface CartState {
  items: CartItem[];
}

export const cartStateContext = createContext<CartState | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      price: 21,
      title: "koszulka",
    },
  ]);

  return (
    <cartStateContext.Provider value={{ items: cartItems }}>
      {children}
    </cartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(cartStateContext);
  if (!cartState) throw new Error("Your Forgot CartStateProvider");
  return cartState;
};
