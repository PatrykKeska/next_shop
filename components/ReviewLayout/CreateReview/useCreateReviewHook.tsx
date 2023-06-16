import { useModalsState } from "@/components/Modals/ModalsContext";
import { ReviewFormSchemaType } from "@/utils/yupValidators/reviewValidator";
import { UseFormReset } from "react-hook-form";

interface json {
  message: string;
  code: number;
}

export const useCreateReviewHook = () => {
  const {
    setIsLoadingVisible,
    setConfirmationMessage,
    setIsConfirmationVisible,
  } = useModalsState();

  const addReview = async (
    data: ReviewFormSchemaType,
    slug: string,
    reset: UseFormReset<ReviewFormSchemaType>
  ) => {
    setIsLoadingVisible(true);
    const response = await fetch("/api/leave-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ ...data, slug }),
    });

    const json = (await response.json()) as json;
    console.log(json);

    if (json.code === 200) {
      console.log("response ok");
      setIsLoadingVisible(false);
      setConfirmationMessage({
        error: false,
        title: "Your review has been submitted",
        content:
          "Thank you for your feedback. It will soon be visible on the website.",
      });
      reset();
      setIsConfirmationVisible(true);
    } else if (json.code === 500) {
      setIsLoadingVisible(false);
      setConfirmationMessage({
        error: true,
        title: "Something went wrong",
        content: "Please try again later",
      });
      setIsConfirmationVisible(true);
    }
  };

  return { addReview };
};
