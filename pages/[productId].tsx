import { ProductDetails } from "@/components/Product";
import { InferGetStaticPropsType } from "next";
import { API } from "@/utils/Api";

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
  } = product;

  return (
    <>
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
      />
    </>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`${API}`);
  const products: StoreApiResponse[] | null = await res.json();

  return {
    paths: products?.map((product) => {
      return { params: { productId: product.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (paths: StaticPaths) => {
  let offset = 0;
  if (Number(paths.params.productId) === 1) {
    offset = 0;
  } else {
    offset = Number(paths.params.productId) * 25;
  }

  const res = await fetch(`${API}/${paths.params.productId}`);
  const product = await res.json();

  return {
    props: {
      product,
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
}

interface StaticPaths {
  params: {
    productId: string;
  };
}
