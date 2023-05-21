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
import { useForm } from "react-hook-form";
import { ReviewFormSchemaType } from "@/components/CreateReview/reviewValidation";
import { ReviewForm } from "@/components/CreateReview/ReviewForm";
import { ReviewLayout } from "@/components/CreateReview/ReviewLayout";

const ProductIdPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { register, setValue, handleSubmit, formState } =
    useForm<ReviewFormSchemaType>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
      <ReviewLayout />
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
