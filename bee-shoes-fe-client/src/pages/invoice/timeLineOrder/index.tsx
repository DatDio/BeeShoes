import React, { useEffect, useState } from "react";
import Images from "../../../static";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../../api";
import { toast } from "react-toastify";
import { CustomError, IBill, IDetailOrder } from "../../../types/product.type";
import { convertToCurrencyString } from "../../../utils/format";
import DetailAddress from "../../information/address/detailAddress";
interface IData {
  createAt: string;
  createBy: string;
  id: number;
  index: number;
  note: string;
  status: number;
}
const TimeLineOrder = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData[]>();
  const [bill, setBill] = useState<IBill>();
  const [billDetail, setBillDetail] = useState<IDetailOrder[]>();
  const getBillHistory = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getBillHistory(Number(param?.idBill)),
      });
      if (res.status) {
        setData(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bill history: ", error);
    }
  };
  const getBillDetail = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(param?.idBill)),
      });
      if (res.status) {
        setBillDetail(res?.data?.data);
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
        toast.error("Hãy thử lại.");
      }
    }
  };
  const getBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getSearchBill(param?.code ? param?.code : ""),
      });
      if (res.status) {
        setBill(res?.data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (param) {
      getBillHistory();
      getBill();
      getBillDetail();
    }
  }, [param]);
  return (
    <div className="w-[80%] mt-20 mx-auto min-h-screen ">
      <div className="  flex items-center  justify-between ">
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={Images.iconBack}
              alt=""
              className="w-10 h-10 object-contain "
            />
          </button>
          <span className="font-semibold ">Trạng thái đơn hàng của bạn</span>
        </div>
        <div>
          <span className="uppercase font-medium">
            Mã đơn hàng: {param?.code}
          </span>
        </div>
      </div>
      {!!data && (
        <ol className=" sm:flex justify-between  mt-20">
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-1 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <img
                  src={Images.iconWaitComfirm}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span className={`text-sm font-semibold text-red-700  `}>
                Chờ xác nhận
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[0]?.createAt}
              </time>
              <span className="text-sm font-medium">
                Ghi chú: {data[0]?.note}
              </span>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-1 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) === 2 ? (
                  <img
                    src={Images.iconWaitDeliveryGray}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconWaitDelivery}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${Number(param?.status) === 2 ? "text-gray-500" : "text-red-600"
                  }`}
              >
                Chờ giao
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[1]?.createAt ? data[1]?.createAt : ""}
              </time>
              {data[1]?.note && (
                <span className="text-sm font-medium">
                  Ghi chú: {data[1]?.note ? data[1]?.note : ""}
                </span>
              )}
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-1 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) <= 4 ? (
                  <img
                    src={Images.iconDeliveryFash}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconDeliveryFashRed}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${Number(param?.status) <= 4 ? "text-gray-500" : "text-red-600"
                  }`}
              >
                Đang giao
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white"></span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[2]?.createAt ? data[2]?.createAt : ""}
              </time>
              {data[2]?.note && (
                <span className="text-sm font-medium">
                  Ghi chú: {data[2]?.note}
                </span>
              )}
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-1 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) <= 5 ? (
                  <img
                    src={Images.iconUnboxGray}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconUnbox}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${Number(param?.status) <= 5 ? "text-gray-500" : "text-red-600"
                  }`}
              >
                Hoàn thành
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[3]?.createAt ? data[3]?.createAt : ""}
              </time>
              {data[3]?.note && (
                <span className="text-sm font-medium">
                  Ghi chú: {data[3]?.note ? data[3]?.note : ""}
                </span>
              )}
            </div>
          </li>
        </ol>
      )}
      {!!bill && !!billDetail && (
        <div className="border-[1px] border-gray-300 mt-5 rounded">
          <p className="font-semibold text-base m-4 ">Danh sách sản phẩm </p>
          {billDetail?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-4 m-4 pb-4 ${index === billDetail.length - 1
                    ? ""
                    : "border-b-[1px] border-gray-300"
                  }`}
              >
                <img
                  src={item?.images.split(",")[0]}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <div className=" flex flex-col justify-between  h-20">
                  <p className="text-xs font-semibold uppercase">
                    {item?.name}
                  </p>
                  <div className="flex items-center  gap-8">
                    <p className="text-xs font-normal">
                      Màu sắc:{" "}
                      <span className="font-medium">{item?.color}</span>
                    </p>
                    <p className="text-xs font-normal">
                      Số lượng:{" "}
                      <span className="font-medium">{item?.quantity}</span>
                    </p>
                    <p className="text-xs font-normal">
                      Kích thước:{" "}
                      <span className="font-medium">{item?.size}</span>
                    </p>
                    <p className="text-xs font-normal">
                      Loại đế: <span className="font-medium">{item?.sole}</span>
                    </p>
                  </div>
                  <p className="text-xs font-normal">
                    Thành tiền :{" "}
                    <span className="font-medium">
                      {!!item?.discountValue
                        ? convertToCurrencyString(
                          item?.discountValue * item?.quantity
                        )
                        : convertToCurrencyString(item?.price * item?.quantity)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!!bill && (
        <div className="w-full border rounded-md mt-5 p-4 flex flex-col gap-4 ">
          <h3 className="font-medium">Thông tin người nhận:</h3>
          <p className="font-medium">
            Tên khách hàng:{" "}
            <span className="font-normal"> {bill?.customerName}</span>
          </p>
          {bill?.phoneNumber && (
            <p className="font-medium">
              Số điện thoại:{" "}
              <span className="font-normal"> {bill?.phoneNumber}</span>
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="font-medium">Địa chỉ: </span>
            <DetailAddress
              spec={(bill.address?.split("##")[0]) ?? ""}
              war={(bill.address?.split("##")[1]) ?? ""}
              distr={(bill.address?.split("##")[2]) ?? ""}
              prov={(bill.address?.split("##")[3]) ?? ""}
            />

          </div>
          {bill?.note && (
            <p className="font-medium">
              Lưu ý: <span className="font-normal"> {bill?.note}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeLineOrder;
