// useConfirmation.ts

import { useState, createContext, ReactElement } from 'react';

// could have created this context on the main.tsx file itself, but wanted to keep it separate for a cleaner code.

interface CustomBoxContextProviderProps {
  children: ReactElement;
}
interface ConfirmationState {
  isVisible: boolean;
  message: string;
  title: string;
}

interface CustomBoxContextProps {
  isVisible: boolean;
  handleClose: () => void;
  showConfirmation: (title: string, message: string) => void;
  message: string;
  title: string;
}

export const CustomBoxContext = createContext<CustomBoxContextProps>({
  isVisible: false,
  handleClose: () => null,
  showConfirmation: () => null,
  title: '',
  message: '',
});

export const CustomBoxContextProvider = ({ children }: CustomBoxContextProviderProps) => {
  const [state, setState] = useState<ConfirmationState>({
    isVisible: false,
    message: '',
    title: '',
  });

  const showConfirmation = (title: string, message: string) =>
    setState({
      isVisible: true,
      title,
      message,
    });

  const handleClose = () =>
    setState({
      isVisible: false,
      message: '',
      title: '',
    });

  return (
    <CustomBoxContext.Provider
      value={{
        handleClose,
        showConfirmation,
        isVisible: state.isVisible,
        title: state.title,
        message: state.message,
      }}
    >
      {children}
    </CustomBoxContext.Provider>
  );
};
