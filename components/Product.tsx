import Image from "next/legacy/image";

export const ProductDetails = ({
  id,
  description,
  image,
  price,
  title,
}: ProductDetails) => {
  return (
    <div
      className="max-w-5xl shadow-lg px-10 w-full flex flex-col align-center justify-center"
      key={id}
    >
      <Image
        src={image}
        alt={title}
        width={16}
        height={9}
        layout="responsive"
        objectFit="contain"
      />
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{description}</p>
    </div>
  );
};

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
