import Image from "next/image";
import { useCartState } from "../Cart/CartContext";

export const CheckoutSummary = () => {
  const { totalItems, totalPrice, items, countEachItemQuantity } =
    useCartState();
  return (
    <div className='bg-gray-50 py-12 md:py-24'>
      <div className='mx-auto max-w-lg space-y-8 px-4 lg:px-8'>
        <div className='flex items-center gap-4'>
          <span className='h-10 w-10 rounded-full bg-blue-700'></span>

          <h2 className='font-medium text-gray-900'>User Name</h2>
        </div>

        <div>
          <p className='text-2xl font-medium tracking-tight text-gray-900'>
            ${totalPrice}
          </p>

          <p className='mt-1 text-sm text-gray-600'>
            For the purchase of {totalItems} items:
          </p>
        </div>

        <div>
          <div className='flow-root'>
            <ul className='-my-4 divide-y divide-gray-100'>
              {items.map(({ name, image, price, id }) => {
                const SameItems = countEachItemQuantity(id);
                const SameItemsTotalPrice = (SameItems * price) / 100;
                return (
                  <li key={id} className='flex items-center gap-4 py-4'>
                    <Image alt={name} src={image} width={75} height={75} />

                    <div>
                      <h3 className='text-sm text-gray-900'>{name}</h3>

                      <dl className='mt-0.5 space-y-px text-[10px] text-gray-600'>
                        <div>
                          <dt className='inline'>Total items: </dt>
                          <dd className='inline'>{SameItems}</dd>
                        </div>
                        <div>
                          <dt className='inline'>Price: </dt>
                          <dd className='inline'>${price / 100} each</dd>
                        </div>
                        <div>
                          <dt className='inline'>Total Price: </dt>
                          <dd className='inline'>${SameItemsTotalPrice}</dd>
                        </div>

                        <div>
                          <dt className='inline'>Size:</dt>
                          <dd className='inline'>XXS</dd>
                        </div>

                        <div>
                          <dt className='inline'>Color:</dt>
                          <dd className='inline'>White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
