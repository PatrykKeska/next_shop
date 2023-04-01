import { ProductDetails } from "@/components/Product";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { API } from "@/utils/Api";
import { MarkdownResult } from "@/utils/types/MarkdownResult";

const ProductIdPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticPaths>) => {
  if (!product) {
    return <p>Something went wrong...</p>;
  }
  const {
    description,
    id,
    image,
    price,
    title,
    longDescription,
    category,
    rating,
    source,
  } = product;

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10">
        <ProductDetails
          longDescription={longDescription}
          category={category}
          rating={rating}
          description={description}
          id={id}
          image={image}
          price={price}
          title={title}
          key={id}
          source={source}
        />
      </div>
    </>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`${API}`);
  const products: StoreApiResponse[] | null = await res.json();

  return {
    paths: products?.map((product) => {
      return { params: { index: product.id.toString() } };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async (paths: StaticPaths) => {
  const { index } = paths.params;
  const res = await fetch(`${API}/${index}`);
  const product: StoreApiResponse = await res.json();
  if (!product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...product,
        source: await serialize(product.longDescription),
      },
    },
  };
};

interface StoreApiResponse {
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
  source?: MarkdownResult;
}

interface StaticPaths {
  params: {
    index: string;
  };
}
