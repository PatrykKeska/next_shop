import { yupResolver } from "@hookform/resolvers/yup";
import {
  NewsletterFormData,
  NewsletterValidationSchema,
} from "./NewsletterValidation";
import { useForm } from "react-hook-form";
import { useModalsState } from "../Modals/ModalsContext";
import { LoadingModal } from "../Modals/LoadingModal";
import { useEffect } from "react";
import { ConfirmationModal } from "../Modals/ConfirmationModal";
import { useAddToNewsletter } from "./useAddToNewsletter";

export const NewsLetterForm = () => {
  const {
    setIsConfirmationVisible,
    setIsLoadingVisible,
    setConfirmationMessage,
  } = useModalsState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(NewsletterValidationSchema),
  });

  const onSubmit = handleSubmit((data: NewsletterFormData) =>
    mutate({ email: data.email })
  );

  const { mutate, isError, isLoading, isSuccess } = useAddToNewsletter();

  useEffect(() => {
    if (isLoading) {
      setIsLoadingVisible(true);
    }
    if (isError) {
      setIsLoadingVisible(false);
      setIsConfirmationVisible(true);
      setConfirmationMessage({
        title: "Error",
        content: "Something went wrong, please try again later !",
        error: true,
      });
      return;
    }
    if (isSuccess && !isError) {
      setIsLoadingVisible(false);
      setIsConfirmationVisible(true);
      setConfirmationMessage({
        title: "Success",
        content: "You have been subscribed to our newsletter !",
        error: false,
      });
      reset();
    }

    return () => {
      setIsConfirmationVisible(false);
      setIsLoadingVisible(false);
    };
  }, [isLoading, isError, isSuccess]);

  return (
    <div>
      <LoadingModal />
      {<ConfirmationModal />}
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <label
          htmlFor='UserEmail'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            {...register("email")}
            type='email'
            id='UserEmail'
            placeholder='Email'
            className='peer h-8 w-full min-w-[300px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
          />
          <span className='absolute start-3 top-3 -translate-y-1/2 left-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Email
          </span>
        </label>
        {errors.email && (
          <span className='text-red-500 text-md'>{errors.email.message}</span>
        )}
        <button className='block w-full max-w-xs self-center rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto'>
          Subscribe
        </button>
      </form>
    </div>
  );
};
