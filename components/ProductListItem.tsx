import Link from "next/link";
import Image from "next/image";
import { imageSizes } from "@/utils/ImageSizes";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
}

interface ProductListProps {
  data: ProductListItem;
}

type ProductListItem = Pick<ProductDetails, "image" | "title" | "id" | "price">;

export const ProductListItem = ({ data }: ProductListProps) => {
  const { image, title, id, price } = data;
  const { addItemToCart } = useCartState();
  return (
    <>
      <Link href={`details/${id}`}>
        <>
          <div className="h-56 relative">
            <Image
              priority
              fill
              style={{ objectFit: "contain" }}
              src={image}
              alt={title}
              sizes={imageSizes}
            />
          </div>
        </>
        <h2>{title}</h2>
        <h3 className="text-center">{price}$</h3>
      </Link>
      <button
        onClick={() => addItemToCart({ title, price })}
        className="inline-block rounded bg-gray-700 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
      >
        Add
      </button>
    </>
  );
};
