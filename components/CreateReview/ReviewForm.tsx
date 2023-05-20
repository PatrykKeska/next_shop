import { useForm } from "react-hook-form";
import { ReviewFormSchemaType, reviewFormSchema } from "./reviewValidation";
import { ReviewInput } from "./ReviewInput";
import { ReviewButton } from "./ReviewButton";
import { RatingStar } from "./RatingStar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProductReviewMutation } from "@/graphql/generated/graphql";
import { useRouter } from "next/router";
import { ConfirmationModal } from "../Modals/ConfirmationModal";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export const ReviewForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createReview, { data: dataResponse, loading, error }] =
    useCreateProductReviewMutation();
  const {
    query: { productSlug },
  } = useRouter();

  const slug = productSlug as string;
  console.log(dataResponse);
  const { register, setValue, handleSubmit, watch, formState } =
    useForm<ReviewFormSchemaType>({ resolver: yupResolver(reviewFormSchema) });
  const addReview = async (data: ReviewFormSchemaType, slug: any) => {
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
    });
  };
  const handleModal = (arg: boolean) => {
    setIsModalVisible(arg);
  };
  const onSubmit = handleSubmit(async (data) => {
    addReview(data, "unisex-long-sleeve-tee");

    dataResponse && handleModal(true);
  });
  return (
    <>
      <Transition
        show={isModalVisible}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ConfirmationModal
          isModalVisible={isModalVisible}
          handler={handleModal}
        />
      </Transition>

      <section className='bg-gray-100 p-10'>
        <h2 className='text-2xl font-semibold mb-4'>Create a review</h2>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid  grid-cols-1 gap-y-8 lg:grid-cols-5'>
            <form
              onSubmit={onSubmit}
              className='grid lg:col-start-2 lg:col-end-5 gap-y-4'
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