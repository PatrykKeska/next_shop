import { Pagination } from "@/components/Pagination";
import { ProductDetails } from "@/components/Product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getProducts = async (page: number) => {
  let offset = page * 3;
  if (page === 1) {
    offset = 0;
  }

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
  );

  const products: StoreApiResponse[] = await res.json();

  return products;
};

const ProductsPageCsr = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    keepPreviousData: false,
  });
  const { data, isLoading, isError, isFetching } = query;

  if (isLoading && isFetching) {
    return <p>Loading...</p>;
  }
  if (isError) return <p>something went wrong</p>;
  if (!data) return <p>Please try one more time</p>;

  return (
    <section className="p-5">
      <Pagination setPage={setPage} />
      <ul className="md:grid-cols-1 lg:grid-cols-2 grid gap-3">
        {query.data.map(
          ({
            description,
            id,
            image,
            price,
            title,
            longDescription,
            rating,
            category,
          }) => (
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
          )
        )}
      </ul>
    </section>
  );
};

export default ProductsPageCsr;

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
