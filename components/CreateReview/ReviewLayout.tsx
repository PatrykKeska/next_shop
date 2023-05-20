import { useState } from "react";
import { ReviewForm } from "./ReviewForm";
import { Transition } from "@headlessui/react";
import { AllReviews } from "./AllReviews";
import { ReviewButton } from "./ReviewButton";

export const ReviewLayout = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(true);

  const renderReviewForm = () => {
    setIsFormVisible(!isFormVisible);
    setIsReviewsVisible(false);
  };

  const renderAllReviews = () => {
    setIsReviewsVisible(!isReviewsVisible);
    setIsFormVisible(false);
  };
  return (
    <div className='flex flex-col'>
      <div className='flex gap-5 self-center my-5 flex-wrap justify-center xl:justify-start'>
        <ReviewButton
          width='w-72'
          type='button'
          name={`${isFormVisible ? "Hide review form" : "Leave a review"}`}
          onClick={renderReviewForm}
        />
        <ReviewButton
          width='w-72'
          type='button'
          name={`${isReviewsVisible ? "Hide reviews" : "Check all reviews"}`}
          onClick={renderAllReviews}
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
        <AllReviews />
      </Transition>
    </div>
  );
};
