import { StarIcon } from "./StarIcon";

interface CustomerReviewsHeaderProps {
  avrageRating: number;
  reviewsLength: number;
}

export const CustomerReviewsHeader = ({
  avrageRating,
  reviewsLength,
}: CustomerReviewsHeaderProps) => {
  return (
    <>
      <h2 className='text-xl font-bold sm:text-2xl'>Customer Reviews</h2>
      {reviewsLength > 0 ? (
        <div className='mt-4 flex items-center gap-4'>
          <p className='text-3xl font-medium'>
            {avrageRating.toFixed(1)}
            <span className='sr-only'> Average review score </span>
          </p>

          <div>
            <StarIcon value={avrageRating} />

            <p className='mt-0.5 text-xs text-gray-500'>
              Based on {reviewsLength} reviews
            </p>
          </div>
        </div>
      ) : (
        <p>There are no reviews yet!</p>
      )}
    </>
  );
};
