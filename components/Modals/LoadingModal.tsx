import clsx from "clsx";
import { clear } from "console";
import { useEffect, useState } from "react";
import { useModalsState } from "./ModalsContext";

export const LoadingModal = () => {
  const { isLoadingVisible, setIsLoadingVisible } = useModalsState();
  const [progress, setProgress] = useState(0);

  const handleClose = () => {
    console.log("click");
    setIsLoadingVisible(false);
    setProgress(0);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
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
          <section
            onClick={handleClose}
            className='w-full top-0 absolute h-[150vh] bg-zinc-700/50'
          ></section>
          <div className='sm:w-72 md:w-96 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='block rounded-full bg-gray-200'>
              <span
                style={{ width: `${progress}%` }}
                className={clsx(
                  `w-[10%] block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500`
                )}
              ></span>
            </span>
            <p className='text-blue-500 animate-bounce p-10 text-2xl'>
              Loading...
            </p>
          </div>
        </>
      )}
    </>
  );
};
