import { useEffect } from "react";
import { useModalsState } from "./ModalsContext";
import clsx from "clsx";

export const ConfirmationModal = () => {
  const {
    isConfirmationVisible,
    setIsConfirmationVisible,
    confirmationMessage,
    setConfirmationMessage,
  } = useModalsState();
  const { error, title, content } = confirmationMessage!;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isConfirmationVisible]);
  return (
    <>
      {isConfirmationVisible && (
        <>
          <section
            onClick={() => setIsConfirmationVisible(false)}
            className='w-full top-0 absolute h-[150vh] bg-zinc-700/50'
          ></section>
          <section className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-50 rounded-3xl shadow-2xl'>
            <div className='p-8 text-center sm:p-12'>
              <p
                className={clsx(
                  `text-xl font-semibold uppercase tracking-widest text-${
                    error ? "bg-red-500" : "green-500"
                  }`
                )}
              >
                {title}
              </p>

              <h2 className='mt-6 text-2xl font-bold'>{content}</h2>

              <button
                onClick={() => setIsConfirmationVisible(false)}
                className={clsx(
                  `max-w-xs mt-8 inline-block w-full rounded-full ${
                    error ? "bg-red-500" : "bg-green-500"
                  }  py-4 text-sm font-bold text-white shadow-xl hover:bg-green-600 transition-colors duration-300`
                )}
              >
                Close
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
