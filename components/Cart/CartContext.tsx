import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getItemsFromLocalStorage, setItemToLocalStorage } from "./CartModel";

export interface CartItem {
  readonly price: number;
  readonly name: string;
  readonly count: number;
  readonly id: string;
  readonly image: string;
}

interface CartState {
  items: CartItem[];

  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
}

export const cartStateContext = createContext<CartState | null>(null);
export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setLoading] = useState(true);

  useEffect(() => {
    setCartItems(getItemsFromLocalStorage());
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
      return;
    }
    setItemToLocalStorage(cartItems);
  }, [cartItems, isLoaded]);

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
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const exsistingItem = prevState.find((item) => item.id === id);
            if (exsistingItem && exsistingItem?.count <= 1) {
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
