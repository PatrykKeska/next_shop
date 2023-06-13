import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupInput } from "./SignupInput";
import Link from "next/link";
import {
  SignupFormData,
  SignupSchema,
} from "@/utils/yupValidators/SignupValidator";

interface SignupFormProps {}

export const SignupForm = ({}: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });
  return (
    <>
      <form onSubmit={onSubmit} className='mt-8 grid grid-cols-6 gap-6'>
        <SignupInput
          label='First Name'
          register={register}
          name='firstName'
          errors={errors}
        />

        <SignupInput
          label='Last Name'
          register={register}
          name='lastName'
          errors={errors}
        />

        <SignupInput
          label='Email'
          register={register}
          name='email'
          errors={errors}
          email
        />

        <SignupInput
          label='Password'
          register={register}
          name='password'
          errors={errors}
          password
        />

        <SignupInput
          label='Confirm Password'
          register={register}
          name='confirmPassword'
          errors={errors}
          password
        />

        <div className='col-span-6'>
          <label htmlFor='MarketingAccept' className='flex gap-4'>
            <input
              type='checkbox'
              id='MarketingAccept'
              name='marketing_accept'
              className='h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm'
            />

            <span className='text-sm text-gray-700'>
              I want to receive emails about events, product updates and company
              announcements.
            </span>
          </label>
        </div>

        <div className='col-span-6'>
          <p className='text-sm text-gray-500'>
            By creating an account, you agree to our
            <Link href='/terms' className='text-gray-700 underline'>
              terms and conditions
            </Link>
            and
            <Link href='/terms' className='text-gray-700 underline'>
              privacy policy
            </Link>
            .
          </p>
        </div>

        <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
          <button
            type='submit'
            className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
          >
            Create an account
          </button>

          <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
            Already have an account?
            <Link href='/auth/signin' className='text-gray-700 underline'>
              Log in
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
};
