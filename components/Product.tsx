import Image from "next/legacy/image";
import ReactMarkdown from "react-markdown";

export const ProductDetails = ({
  id,
  description,
  image,
  price,
  title,
  longDescription,
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
      <article className="prose p-4">
        <ReactMarkdown>{longDescription}</ReactMarkdown>
      </article>
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
