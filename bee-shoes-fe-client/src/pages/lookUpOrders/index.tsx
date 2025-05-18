import React, {
  DetailedHTMLProps,
  TdHTMLAttributes,
  useEffect,
  useState,
} from "react";
import API from "../../api";
import axios from "axios";
import Images from "../../static";
import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
import { formartDate, formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import { convertToCurrencyString } from "../../utils/format";
import DetailAddress from "../information/address/detailAddress";

const LookUpOrders = () => {
  const [inputHD, setInputHD] = useState<string>("");
  const [listDataBill, setListDataBill] = useState<IBill>();
  const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
  const [statusPayment, setStatusPayment] = useState<boolean>(false);
  console.log(statusPayment);
  const getInfoDetailProduct = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getSearchBill(inputHD),
      });
      if (res.status) {
        setListDataBill(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    if (listDataBill?.id) {
      getBillDetail();
    }
  }, [listDataBill]);
  const getStatusPayMent = async (id: number) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/client/api/payment-method/${id}`,
      });
      if (res.status) {
        console.log(res.data);
        setStatusPayment(res?.data[0].type);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (listDataBill?.id) {
      getStatusPayMent(listDataBill?.id);
    }
  }, [listDataBill]);
  console.log("listDataBill", listDataBill);
  console.log("detailBill", detailBill);
  const getBillDetail = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(listDataBill?.id)),
      });
      if (res.status) {
        setDetailBill(res?.data?.data);
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
  console.log("listDataBill", listDataBill);
  return (
    <div className="w-full h-full bg-white min-h-screen">
      <div className="relative w-fit h-fit">
        <img
          src={
            "https://viettelpost.com.vn/wp-content/uploads/2021/02/1920px-Hong_Kong_Skyline_Panorama_-_Dec_200811.jpg"
          }
          className="w-full h-auto "
        />
        <div className="absolute top-[50%] right-[50%] translate-x-1/2 text-center -translate-y-1/2">
          <p className="text-white font-bold text-2xl uppercase  space-x-8 ">
            Tra cứu hành trình đơn hàng
          </p>
          <p className="text-white font-bold ">
            "Mạng chuyển phát nhanh rộng khắp nơi"
          </p>
        </div>
      </div>
      <div className="bg-[#f0f0f0] w-full px-4 py-2">
        Trang chủ / Tra cứu hành trình đơn hàng
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-[50%]">
          <p className="text-[rgba(68,73,77,1)] font-medium text-xl mt-5">
            Mã phiếu gửi
          </p>
          <input
            type="text"
            placeholder="VD:  "
            className="rounded border-[1px] mt-2 w-[60%] border-[#ccc]"
            value={inputHD}
            onChange={(e) => setInputHD(e.target.value)}
          />
          <div className="mt-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded "
              onClick={() => {
                getInfoDetailProduct();
              }}
            >
              Tra cứu
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <img src={Images.imgTrack} className="w-[220px] object-contain" />
        </div>
      </div>
      {listDataBill && (
        <div className="w-full">
          <p className="font-semibold text-2xl my-2">Danh sách phiếu gửi</p>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-white uppercase bg-gray-500  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Mã phiếu gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày tạo đơn
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Trạng thái đơn
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phí ship
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {listDataBill?.code}
                  </th>
                  <td className="px-6 py-4">
                    {formartDate(listDataBill?.createAt)}
                  </td>
                  <td className="px-6 py-4">
                    {listDataBill?.status === 2
                      ? "Chờ xác nhận"
                      : listDataBill.status === 4
                      ? "Chờ giao"
                      : listDataBill.status === 5
                      ? "Đang giao"
                      : listDataBill.status === 6
                      ? "Hoàn Thành"
                      : listDataBill.status === 7
                      ? "Đã hủy"
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(listDataBill.moneyShip)}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(
                      listDataBill.totalMoney + listDataBill.moneyShip
                    )}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {statusPayment === true
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#f0f0f0] shadow-md rounded px-8 pt-6 pb-8 my-4">
              <div className="mb-4">
                <h1 className="text-lg font-bold mb-3">THÔNG TIN VẬN ĐƠN</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Mã phiếu gửi:
                    </label>
                    <p className="text-gray-700">{listDataBill.code}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phí ship:
                    </label>
                    <p className="text-gray-700">
                      {formatCurrency(listDataBill.moneyShip)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Dịch vụ:
                    </label>
                    <p className="text-gray-700">
                      Chuyển phát tiết kiệm hàng hóa
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Người nhận:
                    </label>
                    <p className="text-gray-700">
                      {listDataBill?.customerName}
                      {!!listDataBill && -listDataBill?.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Trạng thái:
                    </label>
                    <p className="text-gray-700">
                      {" "}
                      {listDataBill?.status === 2
                        ? "Chờ xác nhận"
                        : listDataBill.status === 4
                        ? "Chờ giao"
                        : listDataBill.status === 5
                        ? "Đang giao"
                        : listDataBill.status === 6
                        ? "Hoàn Thành"
                        : listDataBill.status === 7
                        ? "Đã hủy"
                        : ""}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Số điện thoại:
                    </label>
                    <p className="text-gray-700">
                      {!!listDataBill && listDataBill?.phoneNumber}
                    </p>
                  </div>
                  <div>
                    {" "}
                    {!!listDataBill && (
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Địa chỉ:
                      </label>
                    )}
                    <DetailAddress
                      spec={listDataBill.address.split("##")[0]}
                      war={listDataBill.address.split("##")[1]}
                      distr={listDataBill.address.split("##")[2]}
                      prov={listDataBill.address.split("##")[3]}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Lưu ý:
                    </label>
                    <p className="text-gray-700">
                      {!!listDataBill && listDataBill?.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!detailBill && (
        <div className="border-[1px] border-gray-300 mt-5 rounded mb-7">
          <p className="font-semibold text-base m-4 ">Danh sách sản phẩm </p>
          {detailBill?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-4 m-4 pb-4 ${
                  index === detailBill.length - 1
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
    </div>
  );
};

export default LookUpOrders;
