import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastManager = {
    notify: (message, type = "info") => {
        const toastType = type === "error" ? "error" : 
                         type === "success" ? "success" : 
                         type === "warning" ? "warning" : "info";
        
        toast[toastType](message, {
            toastId: "single-toast",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
};

export const ToastContainerWrapper = () => <ToastContainer />;
export default ToastManager;