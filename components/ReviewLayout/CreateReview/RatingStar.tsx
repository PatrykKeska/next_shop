import clsx from "clsx";
import { useState } from "react";

interface RatingStarProps {
  setValue: (name: "rating", rating: number) => void;
}

export const RatingStar = ({ setValue }: RatingStarProps) => {
  const [rating, setRating] = useState(1);
  const [clicked, setClicked] = useState(false);
  const handleRatingHover = (starValue: number) => {
    setClicked(false);
    setRating(starValue);
  };

  const handleRatingClick = (starValue: number) => {
    setClicked(true);
    setRating(starValue);
    setValue("rating", starValue);
  };

  const handleRatingMouseLeave = () => {
    !clicked && setRating(1);
  };

  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <svg
          key={starValue}
          xmlns='http://www.w3.org/2000/svg'
          className={clsx(
            ` h-10 w-10 ${
              starValue <= rating ? "text-yellow-400" : "text-gray-500"
            } cursor-pointer`
          )}
          viewBox='0 0 20 20'
          fill='currentColor'
          onMouseEnter={() => handleRatingHover(starValue)}
          onMouseLeave={handleRatingMouseLeave}
          onClick={() => handleRatingClick(starValue)}
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  );
};
