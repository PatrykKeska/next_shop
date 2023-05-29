import { ProductDetails } from "@/components/Product";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { apolloClient } from "@/graphql/apolloClient";
import { ParsedUrlQuery } from "querystring";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from "@/graphql/generated/graphql";

const ProductIdPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  if (!product) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center p-10'>
        <ProductDetails product={product} />
      </div>
    </>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return { params: { productSlug: product.slug } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const { productSlug } = props.params as IParams;
  const { data } = await apolloClient.query<GetProductDetailsBySlugQuery>({
    variables: {
      slug: productSlug,
    },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...data.product,
        description: await serialize(data.product?.description),
      },
    },
  };
};

interface IParams extends ParsedUrlQuery {
  productSlug: string;
}
