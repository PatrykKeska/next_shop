import { CartItem } from "./CartContext";

export const getItemsFromLocalStorage = () => {
  const localStorageCart = localStorage.getItem("NextShop_Cart");
  if (!localStorageCart) {
    return [];
  }
  try {
    const items = JSON.parse(localStorageCart);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const setItemToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("NextShop_Cart", JSON.stringify(cartItems));
};
