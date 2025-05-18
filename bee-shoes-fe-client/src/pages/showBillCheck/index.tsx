import React, { useEffect, useState } from "react";
import path from "../../constants/path";
import Images from "../../static";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../api";
import { toast } from "react-toastify";
import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
import { formartDate } from "../../utils/formatCurrency";
import { convertToCurrencyString } from "../../utils/format";
import DetailAddress from "../information/address/detailAddress";

const ShowBillCheck = () => {
  const params = useParams();
  const [bill, setBill] = useState<IBill>();
  const [billDetail, setBillDetail] = useState<IDetailOrder[]>();
  const getBillDetail = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(params?.idBill)),
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
        url: API.getSearchBill(params?.code ? params?.code : ""),
      });
      if (res.status) {
        setBill(res?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getBillDetail();
    getBill();
  }, [params]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-[80%] min-h-screen mx-auto pt-24">
      <img src={Images.iconSuccesss} alt="" className="w-20 h-auto mx-auto " />
      <p className="text-center text-4xl font-normal">Đơn hàng đã nhận</p>
      <p className="text-center mt-5 text-sm">
        Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
      </p>
      <div className="bg-[#f7f7f7] rounded mt-5 p-5">
        <div className="flex justify-between items-center px-5">
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Mã đơn hàng</p>
            <p className="font-medium">{params?.code}</p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Ngày</p>
            <p className="font-medium">
              {" "}
              {!!bill ? formartDate(bill?.createAt) : ""}{" "}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Tạm tính</p>
            <p className="font-medium  ">
              {!!bill ? convertToCurrencyString(Number(bill?.totalMoney)) : ""}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Giảm giá </p>
            <p className="font-medium  ">
              {!!bill ? convertToCurrencyString(Number(bill?.moneyReduce)) : ""}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Phí ship</p>
            <p className="font-medium  ">
              {!!bill ? convertToCurrencyString(Number(bill?.moneyShip)) : ""}
            </p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm mb-2">Tổng thanh toán</p>
            <p className="font-medium  ">
              {!!bill
                ? convertToCurrencyString(
                    Number(bill?.totalMoney) +
                      Number(bill?.moneyShip) 
                      // -Number(bill?.moneyReduce)
                  )
                : ""}
            </p>
          </div>
        </div>
      </div>
      {!!bill && !!billDetail && (
        <div className="border-[1px] border-gray-300 mt-5 rounded">
          <p className="font-semibold text-base m-4 ">Danh sách sản phẩm </p>
          {billDetail?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-4 m-4 pb-4 ${
                  index === billDetail.length - 1
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
              spec={bill.address.split("##")[0]}
              war={bill.address.split("##")[1]}
              distr={bill.address.split("##")[2]}
              prov={bill.address.split("##")[3]}
            />
          </div>
          {bill?.note && (
            <p className="font-medium">
              Lưu ý: <span className="font-normal"> {bill?.note}</span>
            </p>
          )}
        </div>
      )}
      <div className="w-full  flex justify-center my-20 gap-8">
        <button
          className="border-[1px] border-gray-500 px-4 py-2 rounded-lg font-medium "
          onClick={() => {
            navigate(path.lookUpOrders);
          }}
        >
          Tra cứu đơn hàng
        </button>
        <button
          className=" bg-gray-400 px-4 py-2 rounded-lg font-medium text-white min-w-[150px]"
          onClick={() => {
            navigate(path.home);
          }}
        >
          Trang chủ
        </button>
      </div>
    </div>
  );
};

export default ShowBillCheck;
