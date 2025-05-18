import React from "react";
import path from "../../../constants/path";
import { IOrderType } from "../../../types/product.type";
import { useNavigate } from "react-router-dom";

const Delivering = () => {
  const navigate = useNavigate();
  const dataReturn: IOrderType[] = [
    {
      customers: "customers 1",
      amount: 1,
      status: 3,
      totalMoney: 80,
      date: "10/09/2021",
      id: "1",
    },
    {
      customers: "customers 3",
      amount: 18,
      status: 3,
      totalMoney: 28,
      date: "10/09/2021",
      id: "3",
    },
    {
      customers: "customers 4",
      amount: 20,
      status: 3,
      totalMoney: 44,
      date: "10/09/2021",
      id: "4",
    },
    {
      customers: "customers 5",
      amount: 66,
      status: 3,
      totalMoney: 11,
      date: "10/09/2021",
      id: "5",
    },
    {
      customers: "customers 6",
      amount: 92,
      status: 3,
      totalMoney: 86,
      date: "10/09/2021",
      id: "6",
    },
    {
      customers: "customers 7",
      amount: 63,
      status: 3,
      totalMoney: 31,
      date: "10/09/2021",

      id: "7",
    },
    {
      customers: "customers 8",
      amount: 24,
      status: 3,
      totalMoney: 79,
      date: "10/09/2021",

      id: "8",
    },
    {
      customers: "customers 9",
      amount: 76,
      status: 3,
      totalMoney: 79,
      date: "10/09/2021",

      id: "9",
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Mã ID đơn hàng
              </th> */}
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Khách hàng
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Số Sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Tình trạng
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Tổng Tiền
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Ngày tạo
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]"></th>
            </tr>
          </thead>
          <tbody>
            {dataReturn.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#FFBA00] dark:hover:bg-gray-600 group"
                  key={index}
                >
                  {/* <th
                    scope="row"
                    className="px-6 py-4 font-thin text-gray-900 whitespace-nowrap dark:text-white group-hover:font-semibold group-hover:text-black"
                  >
                    #{item.id}
                  </th> */}

                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.customers}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.status === 1
                      ? "Đang xử lý"
                      : item.status === 2
                      ? "Đang vận chuyển"
                      : item.status === 3
                      ? "Đang giao"
                      : item.status === 4
                      ? "Hoàn thành"
                      : item.status === 5
                      ? "Đã hủy"
                      : item.status === 6
                      ? "Trả hàng"
                      : null}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.totalMoney} đ
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.date}{" "}
                  </td>
                  <td className="px-6 py-4 text-right group-hover:font-semibold group-hover:text-black">
                    <a
                      onClick={() => {
                        navigate(path.detailReturn, { state: item });
                      }}
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Hoàn trả
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Delivering;
