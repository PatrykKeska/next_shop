import Link from "next/link";
import Image from "next/legacy/image";

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

type ProductListItem = Pick<ProductDetails, "image" | "title" | "id">;

export const ProductListItem = ({ data }: ProductListProps) => {
  const { image, title, id } = data;
  return (
    <>
      <Link href={`details/${id}`}>
        <div className="bg-white p-5 w-full">
          <Image
            layout="responsive"
            width={16}
            height={9}
            objectFit="contain"
            src={image}
            alt={title}
          />
        </div>
        <h2>{title}</h2>
      </Link>
    </>
  );
};
