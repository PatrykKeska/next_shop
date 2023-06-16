import Link from "next/link";

export const SigninSignup = () => {
  return (
    <>
      <Link
        href='/auth/signin'
        className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
      >
        Sign in
      </Link>

      <Link
        href='/signup'
        className='inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500'
      >
        Sign up
      </Link>
    </>
  );
};
