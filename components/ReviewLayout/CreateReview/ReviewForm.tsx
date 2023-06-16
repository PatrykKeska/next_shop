import { useForm } from "react-hook-form";
import { ReviewInput } from "./ReviewInput";
import { ReviewButton } from "./ReviewButton";
import { RatingStar } from "./RatingStar";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmationModal } from "../../Modals/ConfirmationModal";
import { LoadingModal } from "../../Modals/LoadingModal";
import {
  ReviewFormSchemaType,
  reviewFormSchema,
} from "@/utils/yupValidators/reviewValidator";
import { useCreateReviewHook } from "./useCreateReviewHook";
import { useSession } from "next-auth/react";
import { Sign } from "crypto";
import { SigninSignup } from "./SigninSignup";
import { ReviewRule } from "./ReviewRule";
import { NonSigninInfo } from "./NonSigninInfo";

interface ReviewFormProps {
  slug: string;
}

export const ReviewForm = ({ slug }: ReviewFormProps) => {
  // useCreateProductReviewMutation({
  //   refetchQueries: [
  //     { query: GetReviewsForProductSlugDocument, variables: { slug } },
  //   ],
  // });

  //TODO : PUBLISH REVIEW
  //TODO : GET EMAIL/NAME FROM SESSION

  const { register, setValue, handleSubmit, reset, formState } =
    useForm<ReviewFormSchemaType>({ resolver: yupResolver(reviewFormSchema) });
  const { addReview } = useCreateReviewHook();
  const onSubmit = handleSubmit(async (data) => {
    await addReview(data, slug, reset);
  });
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <>
          <LoadingModal />
          <ConfirmationModal />
          <section className='bg-gray-100 relative'>
            <h2 className='text-2xl font-semibold mb-4'>Create a review</h2>
            <ReviewRule />
            <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
              <div className='grid  grid-cols-1 gap-y-8 lg:grid-cols-5'>
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
      ) : (
        <section className='bg-gray-100 relative flex flex-col items-center gap-2 p-5'>
          <NonSigninInfo />
          <div className='flex gap-5 p-5'>
            <SigninSignup />
          </div>
        </section>
      )}
    </>
  );
};
