import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successNotification = (message) => {
  toast.success(message);
};

export const errorNotification = (message) => {
  toast.error(message);
};

export const warningNotification = (message) => {
  toast.warning(message);
};
export const infoNotification = (message) => {
  toast.info(message);
};
