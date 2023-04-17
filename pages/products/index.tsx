import { ProductListItem } from "@/components/ProductListItem";
import { apolloClient } from "@/graphql/apolloClient";
import { GetProductsDocument, GetProductsQuery } from "@/src/gql/graphql";
import { InferGetStaticPropsType } from "next";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <ul className='md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5 p-10 bg-white'>
        {data.products.map(({ id, images, name, slug, price }) => {
          return (
            <li
              key={slug}
              className='shadow-lg p-5 flex flex-col items-center w-full'
            >
              <ProductListItem data={{ id: slug, images, name, slug, price }} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default ProductsPage;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductsQuery>({
    query: GetProductsDocument,
  });
  return {
    props: {
      data,
    },
  };
};
