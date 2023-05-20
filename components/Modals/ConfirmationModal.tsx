import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface ConfirmationModalProps {
  handler: (arg: boolean) => void;
  isModalVisible: boolean;
}

export const ConfirmationModal = ({
  handler,
  isModalVisible,
}: ConfirmationModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);
  return (
    <>
      {isModalVisible && (
        <>
          <section className='w-full top-0 absolute h-[150vh] bg-zinc-700/50'></section>
          <section className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-50 rounded-3xl shadow-2xl'>
            <div className='p-8 text-center sm:p-12'>
              <p className='text-sm font-semibold uppercase tracking-widest text-pink-500'>
                Your review has been submitted!
              </p>

              <h2 className='mt-6 text-3xl font-bold'>
                Thanks for your review
              </h2>

              <button
                onClick={() => handler(false)}
                className='mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl'
              >
                Track Order
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
