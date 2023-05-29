import {
  Review,
  useGetReviewsForProductSlugQuery,
} from "@/graphql/generated/graphql";
import { RatingStar } from "../CreateReview/RatingStar";
import { StarIcon } from "./StarIcon";
import { CustomerReviewsHeader } from "./CustomerReviewsHeader";
interface AllReviewsProps {
  slug: string;
}
export const AllReviews = ({ slug }: AllReviewsProps) => {
  const { data, error, loading } = useGetReviewsForProductSlugQuery({
    variables: {
      slug,
    },
  });
  if (!data?.product) return null;
  const { reviews } = data.product;
  const avrageRating =
    reviews.reduce((acc, review) => acc + review.rating!, 0) / reviews.length;

  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8'>
        <CustomerReviewsHeader
          avrageRating={avrageRating}
          reviewsLength={reviews.length}
        />
        <div className='mt-8 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2'>
          {reviews.map(({ content, headline, id, name, rating, createdAt }) => (
            <blockquote key={id}>
              <header className='sm:flex sm:items-center sm:gap-4'>
                <StarIcon value={rating!} />

                <p className='mt-2 font-medium sm:mt-0'>{headline}</p>
              </header>

              <p className='mt-2 text-gray-700'>{content}</p>

              <footer className='mt-4'>
                <p className='text-xs text-gray-500'>
                  {name} -
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
