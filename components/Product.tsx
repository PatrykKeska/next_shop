import { NextSeo } from "next-seo";
import Image from "next/image";
import { MarkdownReact } from "./MarkdownReact";
import { MarkdownResult } from "@/utils/types/MarkdownResult";
import { imageSizes } from "@/utils/ImageSizes";

export const ProductDetails = ({
  id,
  description,
  images,
  price,
  name,
}: ProductDetails) => {
  return (
    <div
      className='flex flex-col justify-center items-center max-w-7xl bg-white shadow-lg px-10 w-full gap-10 '
      key={id}
    >
      <div className='bg-white relative h-96 w-full p-5'>
        <NextSeo
          title={name}
          canonical={`https://next-shop-git-products-patrykkeska.vercel.app/products/page/details/${id}`}
          openGraph={{
            url: `https://next-shop-git-products-patrykkeska.vercel.app/products/page/details/${id}`,
            title: name,
            images: [
              {
                url: images[0].url,
                width: 800,
                height: 600,
                alt: name,
                type: "image/jpeg",
              },
            ],
            siteName: "Next Sklep",
          }}
        />

        <Image
          src={images[0].url}
          alt={name}
          priority
          fill
          style={{ objectFit: "contain" }}
          sizes={imageSizes}
        />
      </div>

      <h2>{name}</h2>
      <p>{price / 100}$</p>
      <article className='prose'>
        {<MarkdownReact>{description}</MarkdownReact>}
      </article>
    </div>
  );
};

export interface ProductDetails {
  slug: string;
  id: string;
  name: string;
  price: number;
  description: MarkdownResult;
  images: Image[];
}

export interface Image {
  url: string;
}
