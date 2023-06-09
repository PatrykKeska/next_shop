import Link from "next/link";
import { SideLink } from "./SideLink";
import { NewsIcon } from "../assets/icons/NewsIcon";
import { ContactIcon } from "../assets/icons/ContactIcon";
import { ProductsIcon } from "../assets/icons/ProductsIcon";
import { AboutIcon } from "../assets/icons/AboutIcon";
import { LoginIcon } from "../assets/icons/LoginIcon";
import { LogoutIcon } from "../assets/icons/LogoutIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface SideMenuProps {
  isOpen: boolean;
  onClose: (arg: boolean) => void;
}

export const SideMenuLayout = ({ onClose }: SideMenuProps) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
  });
  const session = useSession();

  useEffect(() => {
    console.log(session);
    if (session.data?.user) {
      setUserDetails({
        email: session.data.user.email,
      });
    }
  }, [session]);

  const handleRedirectToLogin = () => {
    signIn();
    onClose(false);
  };

  const handleRedirectToLogout = () => {
    signOut();
    onClose(false);
  };

  // TODO: add user session, icon etc on the bottom
  return (
    <div className='flex h-screen flex-col justify-between border-e bg-gray-100  max-w-sm w-72 absolute -bottom-13 left-0 z-20'>
      <div className='px-4 py-6'>
        <nav aria-label='Main Nav' className='mt-6 flex flex-col space-y-1'>
          <SideLink
            svg={<AboutIcon />}
            name='About'
            href='/about'
            onClose={onClose}
          />

          <SideLink
            svg={<NewsIcon />}
            name='News'
            href='/news'
            onClose={onClose}
          />

          <SideLink
            svg={<ProductsIcon />}
            name='Products'
            href='/products'
            onClose={onClose}
          />

          <SideLink
            svg={<ContactIcon />}
            name='Contact'
            href='/contact'
            onClose={onClose}
          />
          <details className='group [&_summary::-webkit-details-marker]:hidden'>
            <summary className='flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 opacity-75'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>

                <span className='text-sm font-medium'> Account </span>
              </div>

              <span className='shrink-0 transition duration-300 group-open:-rotate-180'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label='Account Nav' className='mt-2 flex flex-col px-4'>
              <Link
                href='#'
                className='flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 opacity-75'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
                  />
                </svg>

                <span className='text-sm font-medium'> Details </span>
              </Link>

              <Link
                href='#'
                className='flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 opacity-75'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>

                <span className='text-sm font-medium'> Security </span>
              </Link>
              {session.status === "authenticated" ? (
                <button
                  onClick={handleRedirectToLogout}
                  className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                >
                  <LogoutIcon />
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleRedirectToLogin}
                  className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                >
                  <LoginIcon />
                  Login
                </button>
              )}
            </nav>
          </details>
        </nav>
      </div>

      <div className='sticky inset-x-0 bottom-0 border-t border-gray-100'>
        <Link
          href='#'
          className='flex items-center gap-2 bg-white p-4 hover:bg-gray-50'
        >
          <img
            alt='Man'
            src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            className='h-10 w-10 rounded-full object-cover'
          />

          <div>
            <p className='text-xs'>
              <strong className='block font-medium'>
                {/* {userDetails.firstName} {userDetails.lastName} */}
              </strong>

              <span>{userDetails.email}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
