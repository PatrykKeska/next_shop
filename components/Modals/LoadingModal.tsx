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
          <div className='bg-zinc-500/30 rounded-xl inset-0  p-52 flex flex-col justify-center text-center absolute z-50'>
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
