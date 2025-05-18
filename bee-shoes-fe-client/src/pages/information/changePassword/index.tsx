import axios from "axios";
import { useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../../utils/format";
import { toast } from "react-toastify";
import ModalComponent from "../../../components/Modal";
import { useShoppingCart } from "../../../context/shoppingCart.context";

interface CustomError {
  message: string;
  response?: {
    data?: string;
    status?: number;
  };
}

const ChangePassword = () => {
  const { infoUser } = useShoppingCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState(infoUser?.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordComfirm, setNewPasswordComfirm] = useState("");
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    newPassword: "",
    newPasswordComfirm: "",
  });
  const handleRePassword = async () => {
    if (!validatePassword(newPassword)) {
      setErrors((prev) => ({
        ...prev,
        newPassword:
          "Mật khẩu không hợp lệ. Định dạng mật khẩu: ít nhất 8  ký tự",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }
    if (newPassword !== newPasswordComfirm) {
      setErrors((prev) => ({
        ...prev,
        newPasswordComfirm: "Mật khẩu nhập lại không khớp.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, newPasswordComfirm: "" }));
    }
    try {
      const res = await axios({
        method: "post",
        url: API.changePassword(),
        data: {
          email: email,
          password: password,
          newPassword: newPassword,
        },
      });
      if (res.status) {
        toast.success("Đã đổi mật khẩu thành công");
        navigate("/");
      }
    } catch (error) {
      if (typeof error === "string") {
        // Nếu error là một chuỗi, giả sử đó là một thông báo lỗi từ server
        toast.error(error);
      } else if (error instanceof Error) {
        // Nếu error là một đối tượng Error và có response
        const customError = error as CustomError;
        if (customError.response && customError.response.data) {
          toast.error(customError.response.data);
        } else {
          toast.error(customError.message);
        }
      } else {
        // Trường hợp khác, hiển thị một thông báo mặc định
        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
      }
    }
  };
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <div className="w-[80%] mx-auto">
        <p className="font-semibold text-gray-800">Đổi mật khẩu</p>
      </div>
      <div className="mx-auto w-[50%] mt-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email*
          </label>
          <input
            value={email}
            disabled
            onChange={(e) => setEmail(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu*
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*****************"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu*
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*****************"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newpassword"
          >
            Nhập mật khẩu mới*
          </label>
          <input
            value={newPasswordComfirm}
            onChange={(e) => setNewPasswordComfirm(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newpassword"
            type="password"
            placeholder="*****************"
          />
          {errors.newPasswordComfirm && (
            <p className="text-red-500 text-xs italic">
              {errors.newPasswordComfirm}
            </p>
          )}
        </div>
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded "
          onClick={() => {
            setShowModalDelete(true);
          }}
        >
          Xác nhận thay đổi mật khẩu
        </button>
      </div>
      {showModalDelete && (
        <ModalComponent
          check={true}
          isVisible={showModalDelete}
          onClose={() => {
            setShowModalDelete(false);
          }}
        >
          <div className="w-full flex flex-col justify-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
              Xác nhận thay đổi mật khẩu mới ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2">
              <button
                onClick={() => {
                  setShowModalDelete(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  handleRePassword();
                  setShowModalDelete(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ChangePassword;
