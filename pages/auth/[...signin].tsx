import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  signupSchema,
  signupSchemaType,
} from "../../utils/yupValidators/signinValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModalsState } from "@/components/Modals/ModalsContext";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
const SigninPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<signupSchemaType>({
    resolver: yupResolver(signupSchema),
  });
  const {
    setIsLoadingVisible,
    setConfirmationMessage,
    setIsConfirmationVisible,
  } = useModalsState();
  const onSubmit = handleSubmit(async (data, e) => {
    setIsLoadingVisible(true);
    if (!e) return;
    e.preventDefault();
    const isCorrect = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });
    if (!isCorrect?.ok) {
      setIsLoadingVisible(false);
      setConfirmationMessage({
        title: "Something went wrong",
        content: "Please try again",
        error: true,
      });
      setIsConfirmationVisible(true);
    }
    if (isCorrect?.ok) {
      setIsLoadingVisible(false);
      setIsConfirmationVisible(false);
      router.push("/products");
    }
  });

  return (
    <>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-lg text-center'>
          <h1 className='text-2xl font-bold sm:text-3xl'>Welcome back!</h1>

          <p className='mt-4 text-gray-500'>
            Log in to your account to continue shopping.
          </p>
          <LoadingModal />
          <ConfirmationModal />
        </div>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={onSubmit}
          className='mx-auto mb-0 mt-8 max-w-md space-y-4'
        >
          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>

            <div className='relative'>
              <input
                {...register("email")}
                type='email'
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter email'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>

            <div className='relative'>
              <input
                {...register("password")}
                type='password'
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter password'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>
              No account?
              <Link className='underline' href='/signup'>
                Sign up
              </Link>
            </p>

            <button
              type='submit'
              className='inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SigninPage;
