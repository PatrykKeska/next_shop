import { useCreateProductReviewMutation } from "@/graphql/generated/graphql";

const HomePage = () => {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();

  const addReview = async () => {
    createReview({
      variables: {
        review: {
          headline: "Great Product 2",
          name: "Patryk 2",
          email: "Pk@gmail.com2",
          content: "Great product and best value 2",
          rating: 5,
        },
      },
    });
  };

  return (
    <div>
      {loading && <p className='animate-bounce text-3xl'>loading...</p>}
      {error && (
        <p className='text-3xl'>{JSON.stringify(error.message, null, 2)}</p>
      )}
      {data && <p className='text-3xl'>{JSON.stringify(data, null, 2)}</p>}
      <button
        onClick={addReview}
        type='button'
        className='bg-slate-500 p-2 rounded-sm'
      >
        add review
      </button>
    </div>
  );
};

export default HomePage;
