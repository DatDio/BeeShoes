import React from "react";
import ModalComponent from "../../components/Modal";
// import { useData } from "../../context/app.context";
import Images from "../../static";
import SimpleToast from "../../components/Toast";
type FormLoginProp = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  typeModal: number;
  setTypeModal: React.Dispatch<React.SetStateAction<number>>;
};
const FormLogin = ({
  showModal,
  setShowModal,
  typeModal,
  setTypeModal,
}: FormLoginProp) => {
  // const { sharedData } = useData();
  const [showToast, setShowToast] = React.useState<boolean>(false);
  return (
    <div>
      <ModalComponent
        check={false}
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {typeModal === 1 ? (
          <section className="bg-gray-50  ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
              >
                <img
                  className="w-20 h-20 mr-2 object-contain"
                  src={Images.iconLogo}
                  alt="logo"
                />
                BeeShoes
              </a>
              <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FFBA00] md:text-2xl ">
                    Đăng nhập ngay
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#FFBA00]"
                      >
                        Tài khoản
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5 "
                        placeholder="Số điện thoại hoặc email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5   "
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0  checked:bg-[#FFBA00] "
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-[#FFBA00] ">
                            Nhớ mật khẩu
                          </label>
                        </div>
                      </div>
                      <a
                        onClick={() => {
                          setTypeModal(3);
                        }}
                        className="text-sm font-medium text-[#FFBA00]  hover:underline "
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        setShowToast(true);
                      }}
                      type="submit"
                      className="w-full text-white bg-[#FFBA00] hover:bg-[#c3ff00] focus:ring-4 focus:outline-none focus:ring-[#FFBA00] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Đăng nhập
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      Bạn chưa có tài khoản?{" "}
                      <a
                        onClick={() => {
                          setTypeModal(2);
                        }}
                        className="cursor-pointer font-medium text-[#FFBA00] hover:underline  "
                      >
                        Đăng ký ngay
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : typeModal === 2 ? (
          <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
              >
                <img
                  className="w-20 h-20 mr-2 object-contain"
                  src={Images.iconLogo}
                  alt="logo"
                />
                BeeShoes
              </a>
              <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  -gray-700 mb-4">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FFBA00] md:text-2xl ">
                    Tạo tài khoản
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Số điện thoại hoặc Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5 "
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5 "
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Nhập lại mật khẩu
                      </label>
                      <input
                        type="confirm-password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5 "
                        required
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FFBA00] checked:bg-[#FFBA00]"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 "
                        >
                          Tôi đồng ý với các{" "}
                          <a
                            className="font-medium text-[#FFBA00] hover:underline "
                            href="#"
                          >
                            điều khoản
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#FFBA00] hover:bg-[#FFBA00] focus:ring-4 focus:outline-none focus:ring-[#FFBA00] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={() => {
                        setTypeModal(2);
                        setShowToast(true);
                      }}
                    >
                      Tạo tài khoản
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      Bạn đã có tài khoản?{" "}
                      <a
                        onClick={() => {
                          setTypeModal(1);
                          setShowToast(false);
                        }}
                        className="cursor-pointer font-medium text-[#FFBA00] hover:underline "
                      >
                        Đăng nhập ngay
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
              >
                <img
                  className="w-20 h-20 mr-2 object-contain"
                  src={Images.iconLogo}
                  alt="logo"
                />
                BeeShoes
              </a>
              <div className="w-full bg-white rounded-lg shadow ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FFBA00] md:text-2xl ">
                    Quên mật khẩu
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Số điện thoại hoặc Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5      "
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5      "
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-[#FFBA00] "
                      >
                        Nhập lại mật khẩu
                      </label>
                      <input
                        type="confirm-password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FFBA00] focus:border-[#FFBA00] block w-full p-2.5      "
                        required
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FFBA00] checked:bg-[#FFBA00]   "
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 "
                        >
                          Tôi đồng ý với các{" "}
                          <a
                            className="font-medium text-[#FFBA00] hover:underline "
                            href="#"
                          >
                            điều khoản
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#FFBA00] hover:bg--700 focus:ring-4 focus:outline-none focus:ring-[#FFBA00] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={() => {
                        setTypeModal(3);
                        setShowToast(true);
                      }}
                    >
                      Gửi xác nhận
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      Bạn đã có tài khoản?{" "}
                      <a
                        onClick={() => {
                          setTypeModal(1);
                          setShowToast(false);
                        }}
                        className="font-medium text-[#FFBA00]600 hover:underline "
                      >
                        Đăng nhập ngay
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </ModalComponent>
      {typeModal === 1 && showToast === true ? (
        <SimpleToast typeToast="success" message="Đăng nhập thành công" />
      ) : (
        typeModal === 2 &&
        showToast === true && (
          <SimpleToast typeToast="success" message="Đăng ký thành công" />
        )
      )}
    </div>
  );
};

export default FormLogin;
