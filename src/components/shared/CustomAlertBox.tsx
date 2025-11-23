import { toast } from 'react-toastify';

export const useCustomAlertBox = () => {
  const apiWithToast = 
  async (promise: Promise<any>, message: any) => {
    const id = toast.loading(message.loading);
    try {
      const res = await promise;
      toast.update(id, { render: message.success, type: 'success', isLoading: false });
      return res;
    } catch (err: any) {
      toast.update(id, { render: message.error, type: 'error', isLoading: false });

      throw err;
    }
  };

  return {apiWithToast}
};
