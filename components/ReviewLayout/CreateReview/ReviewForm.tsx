import { useForm } from "react-hook-form";
import { ReviewFormSchemaType, reviewFormSchema } from "./reviewValidation";
import { ReviewInput } from "./ReviewInput";
import { ReviewButton } from "./ReviewButton";
import { RatingStar } from "./RatingStar";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateProductReviewMutation,
  GetReviewsForProductSlugQuery,
} from "@/graphql/generated/graphql";
import { ConfirmationModal } from "../../Modals/ConfirmationModal";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { useModalsState } from "../../Modals/ModalsContext";
import { LoadingModal } from "../../Modals/LoadingModal";
import { GetReviewsForProductSlugDocument } from "@/graphql/generated/graphql";

interface ReviewFormProps {
  slug: string;
}
// TODO: secure review for logged in users only

export const ReviewForm = ({ slug }: ReviewFormProps) => {
  const {
    isConfirmationVisible,
    setIsConfirmationVisible,
    setIsLoadingVisible,
    isLoadingVisible,
    setConfirmationMessage,
  } = useModalsState();
  const [createReview, { data: dataResponse, loading, error }] =
    // useCreateProductReviewMutation({
    //   refetchQueries: [
    //     { query: GetReviewsForProductSlugDocument, variables: { slug } },
    //   ],
    // });

    useCreateProductReviewMutation({
      update(cache, result) {
        const originalQuery = cache.readQuery<GetReviewsForProductSlugQuery>({
          query: GetReviewsForProductSlugDocument,
          variables: { slug },
        });
        if (!originalQuery?.product?.reviews || !result.data?.review) {
          return;
        }

        const newReviewsQueries = {
          ...originalQuery,
          product: {
            ...originalQuery.product,
            reviews: [...originalQuery.product?.reviews, result.data.review],
          },
        };

        cache.writeQuery({
          query: GetReviewsForProductSlugDocument,
          variables: { slug },
          data: newReviewsQueries,
        });
      },
    });

  const { register, setValue, handleSubmit, reset, formState } =
    useForm<ReviewFormSchemaType>({ resolver: yupResolver(reviewFormSchema) });
  const addReview = async (data: ReviewFormSchemaType, slug: string) => {
    createReview({
      variables: {
        review: {
          headline: data.headline,
          name: data.name,
          email: data.email,
          content: data.content,
          rating: data.rating,
          product: { connect: { slug: slug } },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(),
          createdAt: new Date().toISOString(),
          ...data,
        },
      },
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    await addReview(data, slug);
    setIsLoadingVisible(true);
  });

  useEffect(() => {
    if (!loading) {
      setIsLoadingVisible(false);
    }
    if (error) {
      setConfirmationMessage({
        error: true,
        title: "Something went wrong",
        content: "Please try again later",
      });
    }
    if (dataResponse) {
      setConfirmationMessage({
        error: false,
        title: "Your review has been submitted",
        content:
          "Thank you for your feedback. It will soon be visible on the website.",
      });
      setIsConfirmationVisible(true);
      reset();
    }

    return () => {
      setIsConfirmationVisible(false);
      setIsLoadingVisible(false);
    };
  }, [dataResponse, loading, error]);
  return (
    <>
      <section className='bg-gray-100 relative'>
        <h2 className='text-2xl font-semibold mb-4'>Create a review</h2>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid  grid-cols-1 gap-y-8 lg:grid-cols-5'>
            <>
              <Transition
                show={isConfirmationVisible}
                enter='transition-opacity duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <ConfirmationModal />
              </Transition>

              <Transition
                show={isLoadingVisible}
                enter='transition-opacity duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <LoadingModal />
              </Transition>
            </>
            <LoadingModal />
            <form
              onSubmit={onSubmit}
              className=' grid lg:col-start-2 lg:col-end-5 gap-y-4'
            >
              <ReviewInput
                register={register}
                label='Name'
                formState={formState}
                name='name'
              />
              <ReviewInput
                register={register}
                label='Email'
                formState={formState}
                name='email'
              />
              <ReviewInput
                register={register}
                label='Title'
                formState={formState}
                name='headline'
              />
              <RatingStar setValue={setValue} />
              <ReviewInput
                textArea
                register={register}
                label='Review'
                formState={formState}
                name='content'
              />

              <ReviewButton type='submit' name='Send Review' width='w-72' />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
