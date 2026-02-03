import { toast } from 'react-toastify';

  export const useCustomAlertBox = () => {
    const apiWithToast = 
    async (promise: Promise<any>, message: { loading: string; success: string; error: string }) => {
      const id = toast.loading(message.loading);
      try {
        const res = await promise;
        debugger;
        if(res){
        toast.update(id, { render: message.success, type: 'success', isLoading: false, autoClose: 5000 });
        //toast.dismiss(id);
        }
        else{
            toast.update(id, { render: message.error, type: 'error', isLoading: false, autoClose: 5000 });
        }
        return res;

      } catch (err: any) {
        toast.update(id, { render: message.error, type: 'error', isLoading: false, autoClose: 5000 });
        //toast.dismiss(id);
        throw err;
      }
    };

    return {apiWithToast}
  };
