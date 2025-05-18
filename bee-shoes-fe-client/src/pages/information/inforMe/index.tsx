import React, { useEffect, useState } from "react";
import API from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";
import Images from "../../../static";
import { CustomError, IAddress, Iinfo } from "../../../types/product.type";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import ModalComponent from "../../../components/Modal";

const InforMe = () => {
  const { userPrf, infoUser } = useShoppingCart();
  const [birthday, setBirthday] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState("Nam");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState<string>("");
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    infoUser?.avatar ? infoUser?.avatar : null
  );
  useEffect(() => {
    if (!!infoUser) {
      setBirthday(infoUser?.birthday);
      setPhoneNumber(infoUser?.phoneNumber);
      setGender(infoUser.gender);
      setEmail(infoUser?.email);
      setUserName(infoUser?.username);
      setImagePreview(infoUser?.avatar);
    }
  }, [infoUser]);
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);
  const updateInfoUser = async () => {
    if (!!birthday && !!phoneNumber && !!email && !!gender && !!username) {
      const formData = new FormData();
      formData.append("birthday", birthday);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("name", username);
      formData.append("email", email as string);
      formData.append("cccd", "000000000000");
      formData.append("username", username);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      try {
        const response = await axios.put(
          API.updateInfo(Number(userPrf?.id)),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        if (response.status) {
          toast.success("Cập nhật thông tin thành công");
          window.location.reload();
        }
      } catch (error) {
        if (typeof error === "string") {
          toast.error(error);
        } else if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response && customError.response.data) {
            toast.error(customError.response.data);
          } else {
            toast.error(customError.message);
          }
        } else {
          toast.error("Thất bại. Vui lòng thử lại sau.");
        }
      }
    } else {
      toast.warning("Bạn cần nhâp đầy đủ thông tin ");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full h-full ">
      <div className=" w-[80%] mx-auto shadow-lg px-4 min-h-screen mb-10">
        <div className="mb-2">
          <p className="font-semibold text-gray-800  ">Hồ sơ của tôi</p>
          <p className="text-sm text-gray-500">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="w-[80%]  mx-auto">
          <div>
            {" "}
            <div className="flex justify-between  ">
              <div className="flex flex-col  items-center">
                <img
                  src={imagePreview ? imagePreview : Images.iconAccout3}
                  alt="Ảnh đại diện"
                  className=" w-[120px] h-[120px] rounded-[100%] object-cover"
                />
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer   text-gray-500 py-2 px-4 rounded-md hover:bg-[#dbdada] transition duration-300  border-[2px] border-[#f5f5f5]"
                  >
                    Chọn ảnh
                  </label>
                </div>
              </div>
              <div className="flex-col w-[70%] justify-items-center">
                <div className="relative z-0 w-full mb-6 group">
                  <div className="">
                    Họ và tên:
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                    />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <div>
                    Giới tính
                    <div className="flex items-center ps-4   rounded ">
                      <input
                        id="bordered-radio-1"
                        type="radio"
                        name="bordered-radio"
                        value="Nam"
                        checked={gender === "Nam"}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-4 h-4 text-gray-600 bg-gray-100"
                      />
                      <label
                        htmlFor="bordered-radio-1"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
                      >
                        Nam
                      </label>
                      <input
                        id="bordered-radio-2"
                        type="radio"
                        value="Nữ"
                        checked={gender === "Nữ"}
                        onChange={(e) => setGender(e.target.value)}
                        name="bordered-radio"
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="bordered-radio-2"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {selectedFile && (
              <div className="mt-4">
                <p className="text-gray-600 text-xs">
                  Đã chọn: {selectedFile.name} (
                  {(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <div>
              Địa chỉ email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            Số điện thoại
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              disabled={phoneNumber?.length >= 10 ? true : false}
              pattern="^0[0-9]{9}"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className=" mx-auto bg-white rounded ">
            <label
              htmlFor="datepicker"
              className="block text-sm font-medium text-gray-600"
            >
              Ngày sinh
            </label>
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              type="date"
              id="datepicker"
              name="datepicker"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              setShowModalUpdate(true);
            }}
            type="button"
            className="text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-9 py-2.5 text-center my-5 "
          >
            Cập nhật
          </button>
        </div>
      </div>
      {showModalUpdate && (
        <ModalComponent
          check={true}
          isVisible={showModalUpdate}
          onClose={() => {
            setShowModalUpdate(false);
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
              Xác nhận cập nhật thông tin người dùng ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2">
              <button
                onClick={() => {
                  setShowModalUpdate(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  updateInfoUser();
                  setShowModalUpdate(false);
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

export default InforMe;
