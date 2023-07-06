import Link from "next/link";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { SideMenuLayout } from "./SideMenu/SideMenuLayout";
import { BurgerIcon } from "./assets/icons/BurgerIcon";
import { CloseIcon } from "./assets/icons/CloseIcon";
import { useCartState } from "./Cart/CartContext";
export const Header = () => {
  const { totalItems } = useCartState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = (arg: boolean) => {
    setIsMenuOpen(arg);
  };

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
              className='p-2'
            >
              {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>

            <Link href='#' className='flex'>
              <span className='sr-only'>Logo</span>
              <span className='inline-block h-10 w-32 rounded-lg bg-gray-200'></span>
            </Link>
          </div>

          <div className='flex flex-1 items-center justify-end gap-8'>
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
              </div>
            </div>
          </div>
        </div>
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
      </header>
    </>
  );
};
