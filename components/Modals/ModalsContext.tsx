import { ReactNode, createContext, useContext, useState } from "react";
interface ConfirmationMessageInterface {
  title: string;
  content: string;
  error: boolean;
}

interface ModalsContextInterface {
  isConfirmationVisible: boolean;
  setIsConfirmationVisible: (arg: boolean) => void;
  isLoadingVisible: boolean;
  setIsLoadingVisible: (arg: boolean) => void;
  confirmationMessage: ConfirmationMessageInterface;
  setConfirmationMessage: (obj: ConfirmationMessageInterface) => void;
}

export const ModalsStateContext = createContext<ModalsContextInterface | null>(
  null
);

export const ModalsStateProvider = ({ children }: { children: ReactNode }) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] =
    useState<ConfirmationMessageInterface>({
      title: "",
      content: "",
      error: false,
    });

  return (
    <ModalsStateContext.Provider
      value={{
        isConfirmationVisible,
        setIsConfirmationVisible,
        isLoadingVisible,
        setIsLoadingVisible,
        confirmationMessage,
        setConfirmationMessage,
      }}
    >
      {children}
    </ModalsStateContext.Provider>
  );
};

export const useModalsState = () => {
  const modalsState = useContext(ModalsStateContext);
  if (!modalsState) {
    throw new Error("useModalsState must be used within a ModalsStateProvider");
  }
  return modalsState;
};
