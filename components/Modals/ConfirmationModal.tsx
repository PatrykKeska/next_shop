import { useModalsState } from "./ModalsContext";
import clsx from "clsx";

export const ConfirmationModal = () => {
  //TODO: use this modals https://www.hyperui.dev/components/application-ui/alerts
  const {
    isConfirmationVisible,
    setIsConfirmationVisible,
    confirmationMessage,
  } = useModalsState();
  const { error, title, content } = confirmationMessage!;

  return (
    <>
      {isConfirmationVisible && (
        <>
          <section className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-50 rounded-3xl shadow-2xl'>
            <div className='p-8 text-center sm:p-12'>
              <p
                className={clsx(
                  `text-sm font-semibold uppercase tracking-widest text-${
                    error ? "bg-red-500" : "green-500"
                  }`
                )}
              >
                {title}
              </p>

              <h2 className='mt-6 text-lg font-bold'>{content}</h2>

              <button
                onClick={() => setIsConfirmationVisible(false)}
                className={clsx(
                  `w-72 mt-8 inline-block  rounded-full ${
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
