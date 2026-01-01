import { useState, createContext, ReactElement } from 'react';

interface CustomBoxContextProviderProps {
  children: ReactElement;
}

interface ConfirmationState {
  isVisible: boolean;
  message: string;
  title: string;
  resolve: ((value: boolean) => void) | null;
}

interface CustomBoxContextProps {
  isVisible: boolean;
  handleClose: (result: boolean) => void;
  showConfirmation: (title: string, message: string) => Promise<boolean>;
  message: string;
  title: string;
}

export const CustomBoxContext = createContext<CustomBoxContextProps>({
  isVisible: false,
  handleClose: () => null,
  showConfirmation: () => Promise.resolve(false),
  title: '',
  message: '',
});

export const CustomBoxContextProvider = ({ children }: CustomBoxContextProviderProps) => {
  const [state, setState] = useState<ConfirmationState>({
    isVisible: false,
    message: '',
    title: '',
    resolve: null,
  });

  const showConfirmation = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isVisible: true,
        title,
        message,
        resolve, 
      });
    });
  };

  const handleClose = (result: boolean) => {
    if (state.resolve) {
      state.resolve(result);
    }
    
    setState({
      isVisible: false,
      message: '',
      title: '',
      resolve: null,
    });
  };

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