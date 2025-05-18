import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastType {
  typeToast: string;
  message: string;
}

const SimpleToast = ({ typeToast, message }: ToastType) => {
  const prevTypeToast = useRef<string | undefined>(typeToast);
  const prevMessage = useRef<string | undefined>(message);
  useEffect(() => {
    // Kiểm tra xem props có thay đổi so với lần trước hay không
    if (
      typeToast !== prevTypeToast.current ||
      message !== prevMessage.current
    ) {
      if (typeToast === "success") {
        toast.success(message);
      } else if (typeToast === "error") {
        toast.error(message);
      } else if (typeToast === "warn") {
        toast.warn(message);
      } else if (typeToast === "info") {
        toast.info(message);
      } else {
        toast(message);
      }

      // Lưu giá trị props hiện tại vào refs để so sánh trong lần render tiếp theo
      prevTypeToast.current = typeToast;
      prevMessage.current = message;
    }
  }, [typeToast, message]);

  return (
    <div className="z-[1000]">
      <ToastContainer
        position="top-right"
        closeOnClick={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={2000}
        closeButton={<p>Đóng</p>}
        icon={"❤"}
      />
    </div>
  );
};

export default SimpleToast;
