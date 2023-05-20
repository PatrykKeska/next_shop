import clsx from "clsx";
interface ReviewButtonProps {
  onClick?: () => void;
  name: string;
  type: "button" | "submit";
  width?: string;
}

export const ReviewButton = ({
  onClick,
  name,
  type,
  width,
}: ReviewButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        `${
          width ? width : "w-full"
        } inline-block rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto}`
      )}
    >
      {name}
    </button>
  );
};
