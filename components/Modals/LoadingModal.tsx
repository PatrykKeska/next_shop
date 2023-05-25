import clsx from "clsx";
import { useEffect, useState } from "react";
import { useModalsState } from "./ModalsContext";

export const LoadingModal = () => {
  const { isLoadingVisible } = useModalsState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 1);
      } else {
        setProgress(0);
      }
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <>
      {isLoadingVisible && (
        <>
          <div className='bg-zinc-500/80 rounded-xl h-40 w-full max-w-md p-10 flex flex-col justify-end sm:w-72 md:w-96 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='block rounded-full bg-gray-200'>
              <span
                style={{ width: `${progress}%` }}
                className={clsx(
                  `w-[10%] block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500`
                )}
              ></span>
            </span>
            <p className='text-white  animate-bounce p-2 text-2xl'>
              Loading...
            </p>
          </div>
        </>
      )}
    </>
  );
};
