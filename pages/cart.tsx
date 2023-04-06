import { useCartState } from "@/components/Cart/CartContext";
import { RemoveItemButon } from "@/components/Cart/RemoveItemButton";

export const CartContent = () => {
  const cartContext = useCartState();
  return (
    <div className='col-span-2'>
      <ul className='divide-y divide-gray-400'>
        {cartContext.items.map((item) => (
          <li className='py-3 flex justify-between' key={item.id}>
            <p>
              {item.title} {item.count}
            </p>
            <div className='flex gap-2'>
              <p>
                {item.price}
                <span className='text-green-600 font-bold text-lg'>$</span>
              </p>
              <RemoveItemButon id={item.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CartSummary = () => {
  const { items } = useCartState();
  return (
    <div>
      Cart Summary
      <p>
        Total items in basket: <span className='font-bold'>{items.length}</span>
      </p>
    </div>
  );
};

const CartPage = () => {
  const cartContext = useCartState();

  return (
    <div className='w-full max-w-5xl mx-auto p-4'>
      <div className='grid  sm:grid-cols-2 md:grid-cols-3 gap-8'>
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
