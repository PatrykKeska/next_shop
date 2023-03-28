import { NextSeo } from "next-seo";
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
      <div>
        <NextSeo
          title={title}
          description={description}
          canonical={`https://next-shop-git-products-patrykkeska.vercel.app/products/page/details/${id}`}
          openGraph={{
            url: `https://next-shop-git-products-patrykkeska.vercel.app/products/page/details/${id}`,
            title: title,
            description: description,
            images: [
              {
                url: image,
                width: 800,
                height: 600,
                alt: title,
                type: "image/jpeg",
              },
            ],
            siteName: "Next Sklep",
          }}
        />
        <Image
          src={image}
          alt={title}
          width={16}
          height={9}
          layout="responsive"
          objectFit="contain"
        />
      </div>
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
