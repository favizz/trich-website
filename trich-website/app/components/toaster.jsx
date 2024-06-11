import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastManager = {
    notify: (message, type = 'info') => {
        toast[type](message, {
        toastId: "single-toast",
        position: "bottom-right",
        autoClose: 1500,
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