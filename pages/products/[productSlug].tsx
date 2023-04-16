import { ProductDetails } from "@/components/Product";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import { MarkdownResult } from "@/utils/types/MarkdownResult";

const ProductIdPage = ({ product }: GetProductDetailsBySlug) => {
  if (!product) {
    return <p>Something went wrong...</p>;
  }
  const { description, id, images, price, name, slug } = product;

  return (
    <>
      <div className='flex flex-col items-center justify-center p-10'>
        <ProductDetails
          slug={slug}
          description={description}
          id={id}
          images={images}
          price={price}
          name={name}
          key={id}
        />
      </div>
    </>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsResponse>({
    query: gql`
      query GetProductsSlugs {
        products {
          slug
        }
      }
    `,
  });

  return {
    paths: data.products.map((product) => {
      return { params: { productSlug: product.slug } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (props: Path) => {
  const { productSlug } = props.params;
  const { data } = await apolloClient.query<GetProductDetailsBySlug>({
    variables: {
      slug: productSlug,
    },
    query: gql`
      query GetProductDetailsBySlug($slug: String) {
        product(where: { slug: $slug }) {
          slug
          id
          name
          price
          description
          images {
            url
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};

interface GetProductsSlugsResponse {
  products: ProductSlug[];
}

interface ProductSlug {
  slug: string;
}

interface Path {
  params: {
    productSlug: string;
  };
}

export interface GetProductDetailsBySlug {
  product: Product;
}

export interface Product {
  slug: string;
  id: string;
  name: string;
  price: number;
  description: string;
  images: Image[];
}

export interface Image {
  url: string;
}
