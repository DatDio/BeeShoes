import React from "react";
interface TypeProcess {
  type: number;
}
const ShippingProcess = ({ type }: TypeProcess) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center border-b border-red-400 bg-white py-2 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <p className="text-lg font-semibold text-red-400">
          Trạng thái đơn hàng
        </p>
        <div className="mt-2 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base ">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              {type === 1 ? (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-xs font-semibold text-white ring ring-red-400 ring-offset-2"
                    // href="#"
                  >
                    1
                  </a>
                  <span className="font-semibold text-red-400">Giỏ hàng</span>
                </li>
              ) : (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span className="font-semibold text-red-400">Giỏ hàng</span>
                </li>
              )}

              <svg
                className="h-4 w-4 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {type === 2 ? (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-xs font-semibold text-white ring ring-red-400 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-red-400">Thanh toán</span>
                </li>
              ) : type === 1 ? (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-500">
                    Thanh toán
                  </span>
                </li>
              ) : (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-xs font-semibold text-red-400"
                    href="#"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Giỏ hàng</span>
                </li>
              )}
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {type === 3 ? (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-900">
                    Thanh toán
                  </span>
                </li>
              ) : type === 1 || type === 2 ? (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">
                    Đặt hàng thành công
                  </span>
                </li>
              ) : (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">
                    Vận chuyển
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingProcess;
