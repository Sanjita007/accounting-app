import { toast } from 'react-toastify';

  export const useAlertBox = () => {

    const useApiWithToast = async (promise: Promise<any>, message: { loading: string; success: string; error: string }| null): Promise<boolean>=>{
        const id = toast.loading(  message != null ? message.loading: "loading");
        debugger;
        try{
          const res = await promise;
          if(res.status == 200 || res.status == 204){

            // even when the response is 200 for the api, there might be other error repective to the api response
            // so check the statusCode field for the result

            if(res.data.statusCode == 200){
            toast.update(id, { render: message != null ? message.success : "success", type: 'success', isLoading: false, autoClose: 5000 });
            return true;
            }
            else{
              toast.update(id, { render: message != null  ? message.error : "error", type: 'error', isLoading: false, autoClose: 5000 });
            return false;
            }
          }
          else{
            toast.update(id, { render: message != null  ? message.error : "error", type: 'error', isLoading: false, autoClose: 5000 });
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
