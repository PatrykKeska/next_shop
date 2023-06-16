import { UseFormHandleSubmit } from "react-hook-form";
import { useModalsState } from "../Modals/ModalsContext";
import { SignupFormData } from "@/utils/yupValidators/SignupValidator";

interface Res {
  code: number;
  message: string;
}

export const useSignupHook = (
  handleSubmit: UseFormHandleSubmit<SignupFormData>
) => {
  const {
    setIsLoadingVisible,
    setConfirmationMessage,
    setIsConfirmationVisible,
  } = useModalsState();

  return handleSubmit(async (data: SignupFormData) => {
    setIsLoadingVisible(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response: Res = await res.json();
    if (response.code === 409) {
      setIsLoadingVisible(false);
      setConfirmationMessage({
        title: "Email already exists",
        content: "Please try again with a different email",
        error: true,
      });
      setIsConfirmationVisible(true);
    } else if (!res.ok) {
      setIsLoadingVisible(false);
      setConfirmationMessage({
        title: "Something went wrong",
        content: "Please try again later",
        error: true,
      });
      setIsConfirmationVisible(true);
    } else {
      setIsLoadingVisible(false);
      setConfirmationMessage({
        title: "Account created",
        content: "Please check your email to confirm your account",
        error: false,
      });
      setIsConfirmationVisible(true);
    }
  });
};
