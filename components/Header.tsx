import Link from "next/link";
import { useRouter } from "next/router";
import { useCartState } from "./Cart/CartContext";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { SideMenuLayout } from "./SideMenu/SideMenuLayout";
import { BurgerIcon } from "./assets/icons/BurgerIcon";
import { CloseIcon } from "./assets/icons/CloseIcon";

export const Header = () => {
  const { asPath } = useRouter();
  const { totalItems } = useCartState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = (arg: boolean) => {
    setIsMenuOpen(arg);
  };

  const pickedStyle =
    "block h-16 border-b-4 leading-[4rem] hover:border-current hover:text-red-700 border-red-700 text-red-700";
  const regularStyle =
    "block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700";

  return (
    <>
      <header
        aria-label='Site Header'
        className='border-b bg-gray-150 border-gray-300 relative'
      >
        <div className='mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => handleMenuOpen(!isMenuOpen)}
              type='button'
              className='p-2 lg:hidden'
            >
              {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>

            <Link href='#' className='flex'>
              <span className='sr-only'>Logo</span>
              <span className='inline-block h-10 w-32 rounded-lg bg-gray-200'></span>
            </Link>
          </div>

          <div className='flex flex-1 items-center justify-end gap-8'>
            <nav
              aria-label='Site Nav'
              className='hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500'
            >
              <Link
                href='/about'
                className={asPath === "/about" ? pickedStyle : regularStyle}
              >
                About
              </Link>

              <Link
                href='/news'
                className={asPath === "/news" ? pickedStyle : regularStyle}
              >
                News
              </Link>

              <Link
                href='/products'
                className={asPath === "/products" ? pickedStyle : regularStyle}
              >
                Products
              </Link>

              <Link
                href='/contact'
                className={asPath === "/contact" ? pickedStyle : regularStyle}
              >
                Contact
              </Link>
            </nav>

            <div className='flex items-center'>
              <div className='flex items-center border-x border-gray-100'>
                <span className='border-e border-e-gray-100 '>
                  <Link
                    href='/cart'
                    className='grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-red-700 '
                  >
                    <div className='inline-flex items-center'>
                      <span className=' text-green-700 p-2 text-sm'>
                        {totalItems}
                      </span>
                      <svg
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                        />
                      </svg>
                    </div>
                    <span className='sr-only'>Cart</span>
                  </Link>
                </span>

                <span className='border-e border-e-gray-100'>
                  <Link
                    href='/account'
                    className='grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-red-700'
                  >
                    <svg
                      className='h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>

                    <span className='sr-only'> Account </span>
                  </Link>
                </span>

                <span className='hidden sm:block'>
                  <Link
                    href='/search'
                    className='grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-red-700'
                  >
                    <svg
                      className='h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>

                    <span className='sr-only'> Search </span>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Transition
        show={isMenuOpen}
        enter='transform transition duration-300'
        enterFrom='opacity-0 -translate-x-full'
        enterTo='opacity-300'
        leave='transform transition translate-x-0'
        leaveFrom='opacity-300'
        leaveTo='opacity-0'
      >
        <SideMenuLayout isOpen={isMenuOpen} onClose={handleMenuOpen} />
      </Transition>
    </>
  );
};
