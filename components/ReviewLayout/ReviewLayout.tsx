import { useState } from "react";
import { ReviewForm } from "./CreateReview/ReviewForm";
import { Transition } from "@headlessui/react";
import { AllReviews } from "./AllReviews/AllReviews";
import { ReviewButton } from "./CreateReview/ReviewButton";

interface ReviewLayoutProps {
  slug: string;
}
export const ReviewLayout = ({ slug }: ReviewLayoutProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(true);

  const handleReviewSelection = () => {
    if (isReviewsVisible) {
      setIsReviewsVisible(false);
      setIsFormVisible(true);
    } else {
      setIsReviewsVisible(true);
      setIsFormVisible(false);
    }
  };
  return (
    <div className='flex flex-col'>
      <div className='flex gap-5 self-center my-5 flex-wrap justify-center xl:justify-start'>
        <ReviewButton
          width='w-72'
          type='button'
          name={`${isFormVisible ? "Customer reviews" : "Leave a review"}`}
          onClick={handleReviewSelection}
        />
      </div>

      <Transition
        show={isFormVisible}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ReviewForm />
      </Transition>
      <Transition
        show={isReviewsVisible}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <AllReviews slug={slug} />
      </Transition>
    </div>
  );
};
