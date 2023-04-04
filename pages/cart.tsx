import { useCartState } from "@/components/Cart/CartContext";

const CartPage = () => {
  const cartContext = useCartState();

  return (
    <div>
      <ul>
        {cartContext.items.map((item, index) => (
          <li key={`${item.title}_${index}}`}>
            {item.title} = {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
