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
console.log(images[0].url);
  const { addItemToCart } = useCartState();

  return (
    <>
      <Link href={`/products/${id}`}>
        <>
          <div className='relative w-40 h-56'>
            <Image
              priority
              fill
              style={{ objectFit: "contain" }}
              src={images[0].url}
              alt={name}
              sizes={imageSizes}
            />
          </div>
        </>
        <h2>{name}</h2>
        <h3 className='text-center'>{price / 100}$</h3>
      </Link>
      <button
        onClick={() => addItemToCart({ name, price, count: 1, id, image: images[0].url })}
        className='inline-block rounded bg-gray-700 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
      >
        Add
      </button>
    </>
  );
};
