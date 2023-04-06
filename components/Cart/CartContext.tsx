import { ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly id: string;
}

interface CartState {
  items: CartItem[];

  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
}

export const cartStateContext = createContext<CartState | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <cartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const exisitingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!exisitingItem) {
              return [...prevState, item];
            }
            return prevState.map((exisitingItem) => {
              if (exisitingItem.id === item.id) {
                return {
                  ...exisitingItem,
                  count: exisitingItem.count + 1,
                };
              }
              return exisitingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const exisitingItem = prevState.find((item) => item.id === id);
            if (exisitingItem && exisitingItem?.count <= 1) {
              return prevState.filter((item) => item.id !== id);
            }
            return prevState.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  count: item.count - 1,
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
  const cartState = useContext(cartStateContext);
  if (!cartState) throw new Error("Your Forgot CartStateProvider");
  return cartState;
};
