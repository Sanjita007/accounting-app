import { toast } from 'react-toastify';

  export const useAlertBox = () => {
    const useApiWithToast = async (promise: Promise<any>, message: { loading: string; success: string; error: string }| null): Promise<boolean>=>{
        const id = toast.loading("loading");
        try{
          debugger;
          const res = await promise;
          if(res.statusCode == 200){
            toast.update(id, { render: message?.success ? res.message : "success", type: 'success', isLoading: false, autoClose: 5000 });
            return true;
          }
          else{
            toast.update(id, { render: message?.error  ? res.message : "error", type: 'error', isLoading: false, autoClose: 5000 });
            return false;
          }
        }
        catch(err: any){
          console.log(err);
          toast.update(id, { render: "error", type: 'error', isLoading: false, autoClose: 5000 });
          throw err;

        }
    }

    return {useApiWithToast}

  };
