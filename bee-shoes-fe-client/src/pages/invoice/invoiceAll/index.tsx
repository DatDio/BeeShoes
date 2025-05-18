import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../../static";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import axios from "axios";
import API from "../../../api";
import { IDetailOrder, IOrder } from "../../../types/product.type";
import { convertToCurrencyString } from "../../../utils/format";
import { toast } from "react-toastify";
type ItemProps = {
  name: string;
  price: number;
  color: string;
  quantity: number;
};
const Item = ({ item }: { item: IDetailOrder }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b ">
      <div className="flex gap-5 ">
        <div className="w-24 h-20 flex items-center justify-center">
          <img
            src={item.images.split(",")[0]}
            className="max-w-24 max-h-20  object-contain"
          />
        </div>
        <div>
          <div className="text-sm font-semibold">{item.name}</div>
          <div className="text-xs text-[#0000008a]">
            Phân loại hàng: {item?.color} - {item?.size} - {item?.sole}
          </div>
          <div className="text-[10px] text-gray-600 font-semibold ">
            X{item?.quantity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm">
          {!!item?.discountValue ? (
            <>
              <span className="line-through mr-2">
                {convertToCurrencyString(Number(item?.price))}
              </span>
              <span className="text-red-600 font-semibold">
                {convertToCurrencyString(Number(item?.discountValue))}
              </span>
            </>
          ) : (
            <span className="text-red-600 font-semibold">
              {convertToCurrencyString(Number(item?.price))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
const ItemOrder = ({
  item,
  setLoading,
  loading,
}: {
  item: IOrder;
  setLoading: any;
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const [dataDetailOrder, setDataDetailOrder] = useState<IDetailOrder[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [statusPayment, setStatusPayment] = useState<boolean>(false);
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
    if (item?.id) {
      getStatusPayMent(item?.id);
    }
  }, [item?.id]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const getDetailBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(item?.id)),
      });
      if (res.status) {
        setDataDetailOrder(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };
  useEffect(() => {
    if (item?.id) {
      getDetailBill();
    }
  }, [item?.id]);
  const changeStatusBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/client/api/bill/change-status/${item?.id}`,
        params: {
          note: selectedOption,
          isCancel: true,
        },
      });
      if (res.status) {
        setLoading(!loading);
        toast.success("Đã hủy đơn hàng thành công");
      } else {
        toast.warning("Lỗi hủy đơn hàng");
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };
  return (
    <div className="bg-white mb-3 shadow-lg flex flex-col">
      <div className="w-full px-2 py-2 border-b-[1px] flex items-center justify-between">
        <p className=" text-gray-500 text-sm">Mã Hóa Đơn: {item?.code}</p>
        <div className="flex items-center gap-4">
          {item.status !== 7 && (
            <button
              className="text-gray-500 text-sm font-semibold"
              onClick={() => {
                navigate(
                  `/timeLineOrder/${item?.status}/${item?.id}/${item?.code}`
                );
              }}
            >
              Xem tình trạng đơn hàng
            </button>
          )}
          <p className=" text-red-400 text-sm uppercase">
            |{" "}
            {item?.status === 2
              ? "Chờ xác nhận"
              : item?.status === 4
              ? "Chờ giao"
              : item?.status === 5
              ? "Đang giao"
              : item?.status === 6
              ? "Hoàn thành"
              : item?.status === 7
              ? "Đã hủy"
              : ""}
          </p>
        </div>
      </div>
      {!!dataDetailOrder && dataDetailOrder.length > 0 ? (
        dataDetailOrder.map((item, index) => {
          return <Item key={index} item={item} />;
        })
      ) : (
        <svg
          className="animate-spin w-12 h-12 text-indigo-400"
          viewBox="0 0 24 24"
        >
          {" "}
        </svg>
      )}
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold text-xs ">
          Trạng thái:{" "}
          <span className="text-red-600">
            {statusPayment === true ? (
              <span>Đã thanh toán</span>
            ) : (
              <span>Chưa thanh toán</span>
            )}
          </span>
        </div>
        {item?.status === 4 || item?.status === 2 ? (
          <div
            className="border border-red-400 rounded px-2 py-1 cursor-pointer "
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="text-red-500">Hủy đơn hàng</span>
          </div>
        ) : (
          <></>
        )}
        <div className="font-semibold text-xs ">
          Thành tiền:{" "}
          <span className="text-red-600">
            {convertToCurrencyString(item?.totalMoney + item?.moneyShip)}
          </span>
        </div>
      </div>
      {showModal === true && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mt-20"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-[30%] shadow-lg rounded-md bg-white px-10">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Lý Do Hủy
              </h3>
              <div className="mt-2">
                <label className="flex justify-start items-center gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi muốn thay đổi mã giảm giá"
                    checked={selectedOption === "Tôi muốn thay đổi mã giảm giá"}
                    onChange={handleChange}
                    className="mr-2 
"
                  />
                  Tôi muốn thay đổi mã giảm giá.
                </label>
                <label className="flex justify-start items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi muốn thay đổi sản phẩm"
                    checked={selectedOption === "Tôi muốn thay đổi sản phẩm"}
                    onChange={handleChange}
                    className="mr-2 
"
                  />
                  Tôi muốn thay đổi sản phẩm
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Thủ tục thanh toán rắc rối"
                    checked={selectedOption === "Thủ tục thanh toán rắc rối"}
                    onChange={handleChange}
                    className="mr-2 "
                  />
                  Thủ tục thanh toán rắc rối
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi tìm thấy chỗ mua khác tốt hơn"
                    checked={
                      selectedOption === "Tôi tìm thấy chỗ mua khác tốt hơn"
                    }
                    onChange={handleChange}
                    className="mr-2 "
                  />
                  Tôi tìm thấy chỗ mua khác tốt hơn
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi không có nhu cầu mua nữa"
                    checked={selectedOption === "Tôi không có nhu cầu mua nữa"}
                    onChange={handleChange}
                    className="mr-2 "
                  />
                  Tôi không có nhu cầu mua nữa
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi không tìm thấy lý do hủy phù hợp"
                    checked={
                      selectedOption === "Tôi không tìm thấy lý do hủy phù hợp"
                    }
                    onChange={handleChange}
                    className="mr-2 "
                  />
                  Tôi không tìm thấy lý do hủy phù hợp
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tìm được chỗ khác rẻ hơn"
                    checked={selectedOption === "Tìm được chỗ khác rẻ hơn"}
                    onChange={handleChange}
                    className="mr-2 
"
                  />
                  Tìm được chỗ khác rẻ hơn
                </label>
                <label className="flex justify-start  items-center  gap-4 my-3">
                  <input
                    type="radio"
                    name="reason"
                    value="Tôi muốn cập nhật địa chỉ/sđt nhận hàng"
                    checked={
                      selectedOption ===
                      "Tôi muốn cập nhật địa chỉ/sđt nhận hàng"
                    }
                    onChange={handleChange}
                    className="mr-2 
"
                  />
                  Tôi muốn cập nhật địa chỉ/sđt nhận hàng.
                </label>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={() => {
                    changeStatusBill();
                    setShowModal(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const InvoiceAll = ({ status }: { status: number | null }) => {
  const { userPrf } = useShoppingCart();
  const [dataOrder, setDataOrder] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const getAllOrders = async () => {
    if (status === null) {
      try {
        setLoading(true);
        const res = await axios({
          method: "get",
          url: API.getAllOrders(Number(userPrf?.id)),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axios({
          method: "get",
          url: API.getOrderWithStatus(Number(userPrf?.id), status),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userPrf) {
      getAllOrders();
    }
  }, [userPrf, loading2]);

  console.log("loading2", loading2);
  return (
    <div className="w-full h-full">
      <div className="  rounded-lg overflow-hidden flex flex-col w-[80%] mx-auto  px-[1px]  mb-10">
        {!!dataOrder && dataOrder?.length > 0 && loading === false ? (
          dataOrder.map((e, i) => {
            return (
              <ItemOrder
                item={e}
                key={i}
                setLoading={setLoading2}
                loading={loading2}
              />
            );
          })
        ) : dataOrder.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            {" "}
            <img
              src={Images.iconNoOrder}
              alt=""
              className="w-56 h-56 object-contain"
            />
            <span className="text-center font-medium text-3xl">
              Chưa có đơn hàng
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 animate-bounce mt-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full" />
            <div className="w-8 h-8 bg-green-400 rounded-full" />
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceAll;
