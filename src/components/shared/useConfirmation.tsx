// useConfirmation.ts

import React, { useState, useCallback } from 'react'; 
import ConfirmBox from './ConfirmBox'; // Verify this path is correct!

interface ConfirmationState {
  isVisible: boolean;
  message: string;
  title: string;
  resolvePromise: ((confirmed: boolean) => void) | null;
}

export const useConfirmation = () => {
  const [state, setState] = useState<ConfirmationState>({
    isVisible: false,
    message: '',
    title: '',
    resolvePromise: null,
  });

  const showConfirmation = useCallback(
    (title: string, message: string): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setState({
          isVisible: true,
          title,
          message,
          resolvePromise: resolve,
        });
      });
    },
    []
  );

  const handleClose = useCallback((confirmed: boolean) => {
    if (state.resolvePromise) {
      state.resolvePromise(confirmed); 
    }
    setState({
      isVisible: false,
      message: '',
      title: '',
      resolvePromise: null,
    });
  }, [state.resolvePromise]);


  const ConfirmationModal = () => (
  <ConfirmBox
    isVisible={state.isVisible}
    title={state.title}
    message={state.message}
    onClose={handleClose}
  />
);
  
  // FINAL RETURN
  return { showConfirmation, ConfirmationModal };
};