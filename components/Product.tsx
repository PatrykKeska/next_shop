import { NextSeo } from "next-seo";
import Image from "next/image";
import { MarkdownReact } from "./MarkdownReact";
import { MarkdownResult } from "@/utils/types/MarkdownResult";
import { imageSizes } from "@/utils/ImageSizes";

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
      className="flex flex-col justify-center items-center max-w-7xl bg-white shadow-lg px-10 w-full gap-10 "
      key={id}
    >
      <div className="bg-white relative h-96 w-full p-5">
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
          priority
          fill
          style={{ objectFit: "contain" }}
          sizes={imageSizes}
        />
      </div>

      <h2>{title}</h2>
      <p>{price}</p>
      <p>{description}</p>
      <article className="prose">
        {<MarkdownReact>{longDescription}</MarkdownReact>}
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
  longDescription: MarkdownResult;
}
