import Link from "next/link";
import Image from "next/image";
import { imageSizes } from "@/utils/ImageSizes";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  data: {
    id: string;
    name: string;
    price: number;
    slug: string;
    images: any;
  };
}

export const ProductListItem = ({ data }: ProductDetails) => {
  const { id, name, price, slug, images } = data;
  const { addItemToCart } = useCartState();

  return (
    <>
      <Link
        href={`/products/${slug}`}
        className='group relative block overflow-hidden'
      >
        <button className='absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75'>
          <span className='sr-only'>Wishlist</span>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
        </button>

        <div className='bg-white p-6'>
          <div className='relative w-40 h-56'>
            <Image
              className='transition duration-500 group-hover:scale-105 sm:h-72'
              priority
              fill
              style={{ objectFit: "contain" }}
              src={images[0].url}
              alt={name}
              sizes={imageSizes}
            />
          </div>
          <span className='whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium'>
            New
          </span>

          <h3 className='mt-4 text-md font-medium text-gray-900'>{name}</h3>

          <p className='mt-1.5 text-sm text-gray-700'>${price / 100}</p>
        </div>
      </Link>
      <button
        onClick={() =>
          addItemToCart({ name, price, count: 1, id, image: images[0].url })
        }
        className='block w-56 max-w-xs rounded bg-yellow-400 p-4 text-sm mt-4 font-medium transition hover:scale-105'
      >
        Add to Cart
      </button>
    </>
  );
};
