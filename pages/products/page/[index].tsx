import { PaginationSSG } from "@/components/PaginationSSG";
import { ProductListItem } from "@/components/ProductListItem";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

const ProductsPage = ({
  products,
  totalPages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const currPage = router.query.index;
  if (currPage) {
    return (
      <>
        <PaginationSSG currentPage={currPage} totalPages={totalPages} />
        <ul className="md:grid-cols-2 lg:grid-cols-3 grid gap-5">
          {products.map(({ id, title, image }) => (
            <li key={id} className="shadow-lg px-10">
              <ProductListItem data={{ image, title, id }} />
            </li>
          ))}
        </ul>
      </>
    );
  }
};
export default ProductsPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const page: StoreApiResponse[] = await res.json();

  const arr = Array.from(Array(11).keys());

  return {
    paths: arr.map((element) => {
      return { params: { index: element.toString() } };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async (paths: StaticPaths) => {
  const { index } = paths.params;
  let offset = 0;
  if (Number(index) > 1) {
    offset = Number(index) * 10;
  }
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
  );

  const products: StoreApiResponse[] = await res.json();

  return {
    props: {
      products,
      totalPages: 160,
    },
    revalidate: 10,
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
