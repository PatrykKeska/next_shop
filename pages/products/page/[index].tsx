import { PaginationSSG } from "@/components/PaginationSSG";
import { ProductListItem } from "@/components/ProductListItem";
import { InferGetStaticPropsType } from "next";

const ProductsPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PaginationSSG />
      <ul className="md:grid-cols-2 lg:grid-cols-3 grid gap-5">
        {products.map(({ id, title, image }) => (
          <li key={id} className="shadow-lg px-10">
            <ProductListItem data={{ image, title, id }} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;

export const getStaticPaths = async () => {
  return {
    paths: PaginationPages.map((Page) => {
      return { params: { index: Page.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (paths: StaticPaths) => {
  console.log(paths.params.index);
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset${paths.params.index}}`
  );
  const products: StoreApiResponse[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

export interface StoreApiResponse {
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
    index: string;
  };
}

const PaginationPages = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];
