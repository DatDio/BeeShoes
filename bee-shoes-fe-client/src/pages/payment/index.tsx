import React, { useState, useEffect } from "react";
import ShippingProcess from "../../components/shippingProcess";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CustomError,
  IDetailProductCart2,
  IVoucher,
} from "../../types/product.type";
import {
  convertToCurrencyString,
  regexPhoneNumber,
  validateEmail,
} from "../../utils/format";
import { useShoppingCart } from "../../context/shoppingCart.context";
import { formatCurrency } from "../../utils/formatCurrency";
import API, { baseUrl } from "../../api";
import ModalComponent from "../../components/Modal";
import { configApi } from "../../utils/config";
import { toast } from "react-toastify";
import Images from "../../static";
import ShowVoucherList from "./showVoucherList";
interface Province {
  ProvinceID: number;
  ProvinceName: string;
}
interface District {
  DistrictID: number;
  DistrictName: string;
}
interface Ward {
  WardCode: number;
  WardName: string;
}

const ItemPayMent = ({ item }: { item: any }) => {
  const [inforShoe, setInforShoe] = useState<IDetailProductCart2>();
  const getDetailShoeWithId = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoeDetailWithId(item?.id),
    });
    if (res.status) {
      setInforShoe(res?.data?.data);
    }
  };
  useEffect(() => {
    getDetailShoeWithId();
  }, [item?.id]);
  return (
    <div
      className={`flex px-6 py-2 w-full border-b-[1px] border-gray-500 border-dashed `}
    >
      {
        <img
          className="h-[90px] w-[80px] object-contain "
          src={inforShoe?.images.split(",")[0]}
        />
      }
      <div className="flex-1">
        <div className="flex flex-col justify-between ml-4 flex-grow w-full h-full ">
          <span className="font-bold text-sm  ">{inforShoe?.name}</span>
          <span className="text-red-500 text-xs font-medium">
            <span className="text-xs font-medium  text-[#333333]">
              Loại đế:
            </span>{" "}
            {inforShoe?.sole}
          </span>
          <p className="  text-xs font-medium  text-[#333333]  ">
            Số lượng: {item?.quantity}
          </p>
          <div className="flex justify-between  ">
            <div className="flex  ">
              <span className="text-xs font-medium  text-[#333333]  ">
                Giá:
              </span>
              {inforShoe?.discountValue ? (
                <div className="flex items-center gap-1 ml-1 ">
                  <span className="text-xs font-medium line-through text-gray-400">
                    {convertToCurrencyString(inforShoe?.price)}
                  </span>
                  <span className="text-xs font-medium text-red-500">
                    {" "}
                    {convertToCurrencyString(inforShoe?.discountValue)}
                  </span>
                </div>
              ) : (
                inforShoe?.price && (
                  <span className="text-xs font-medium text-red-500 ml-1 ">
                    {convertToCurrencyString(inforShoe?.price)}
                  </span>
                )
              )}
            </div>
            <span className="text-center  font-medium text-xs w-[45%] text-red-700">
              <span className="text-[#666666]">Thành tiền: </span>
              {!!inforShoe?.discountValue
                ? formatCurrency(item.quantity * inforShoe?.discountValue)
                : inforShoe?.price &&
                formatCurrency(inforShoe?.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useShoppingCart();
  const [showModal, setShowMoal] = useState<boolean>(false);
  const [percent, setPrecent] = useState<number>(0);
  const [radioChoose, setRadioChoose] = React.useState<number>(0);
  const [voucher, setVoucher] = useState<number | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [specificAddress, setSpecificAddress] = useState<string>(" ");
  const [codeVoucher, setCodeVoucher] = useState<string>();
  const [feeShip, setFeeShip] = useState(0);
  const [listDetailShoe, setListDetailShoe] = useState<IDetailProductCart2[]>();
  const [textHVT, setTextHVT] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Add logging useEffect here
  useEffect(() => {
    console.log('Provinces:', provinces);
    console.log('Districts:', districts);
    console.log('Wards:', wards);
  }, [provinces, districts, wards]);

  const getDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoeDetail(),
    });
    if (res.status) {
      setListDetailShoe(res?.data?.data);
    }
  };
  const postBill = async () => {
    if (textHVT === "" || textHVT === null || textHVT === undefined) {
      toast.warning("Không được để trống họ và tên");
    } else if (email === "" || email === null || email === undefined) {
      toast.warning("Không được để email");
    } else if (!regexPhoneNumber.test(phoneNumber)) {
      toast.warning("Số điện không hợp lệ");
    } else if (!validateEmail(email)) {
      toast.warning("Email không hợp lệ");
    } else if (
      selectedDistrict === null ||
      selectedDistrict === undefined ||
      selectedProvince === null ||
      selectedProvince === undefined ||
      selectedWard === null ||
      selectedWard === undefined ||
      specificAddress === null ||
      specificAddress === undefined ||
      specificAddress === " "
    ) {
      toast.warning("Không được để trống địa chỉ");
    } else if (paymentMethod === null || paymentMethod === undefined) {
      toast.warning("Hãy chọn phương thức thanh toán");
    } else {
      if (listDetailShoe) {
        try {
          const newBill = {
            customerName: textHVT,
            email: email,
            phoneNumber: phoneNumber,
            voucher: voucher ? voucher : null,
            district: selectedDistrict,
            province: selectedProvince,
            ward: selectedWard,
            specificAddress: specificAddress,
            moneyShip: Number(feeShip),
            moneyReduce:
              (percent / 100) *
              cartItems.reduce((total, cartItem) => {
                const item = listDetailShoe.find((i) => i.id === cartItem.id);
                return (
                  total +
                  (item?.discountValue
                    ? item?.discountValue
                    : item?.price || 0) *
                  cartItem.quantity
                );
              }, 0),
            totalMoney:
              cartItems.reduce((total, cartItem) => {
                const item = listDetailShoe.find((i) => i.id === cartItem.id);
                return (
                  total +
                  (item?.discountValue
                    ? item?.discountValue
                    : item?.price || 0) *
                  cartItem.quantity
                );
              }, 0) -
              (percent / 100) *
              cartItems.reduce((total, cartItem) => {
                const item = listDetailShoe.find((i) => i.id === cartItem.id);
                return (
                  total +
                  (item?.discountValue
                    ? item?.discountValue
                    : item?.price || 0) *
                  cartItem.quantity
                );
              }, 0),
            note: note,
            paymentMethod: paymentMethod,
            carts: cartItems,
          };

          if (radioChoose === 0) {
            const response = await axios.post(
              baseUrl + "api/bill/create-bill-client",
              newBill
            );
            if (response.status) {
              toast.success("Đặt hàng thành công");
              navigate(
                `/showBillCheck/${response?.data?.data?.data?.id}/${response?.data?.data?.data?.code}`
              );
              clearCart();
            }
          }
          if (radioChoose === 1) {
            const tempNewBill = { ...newBill, id: generateUUID() };
            console.log("tempNewBill", tempNewBill);
            localStorage.setItem("checkout", JSON.stringify(tempNewBill));
            try {
              const response = await axios.get(
                baseUrl +
                `api/vn-pay/payment?id=${tempNewBill.id}&total=${cartItems.reduce((total, cartItem) => {
                  const item = listDetailShoe.find(
                    (i) => i.id === cartItem.id
                  );
                  return (
                    total +
                    (item?.discountValue
                      ? item?.discountValue
                      : item?.price || 0) *
                    cartItem.quantity
                  );
                }, 0) +
                feeShip -
                (percent / 100) *
                cartItems.reduce((total, cartItem) => {
                  const item = listDetailShoe.find(
                    (i) => i.id === cartItem.id
                  );
                  return (
                    total +
                    (item?.discountValue
                      ? item?.discountValue
                      : item?.price || 0) *
                    cartItem.quantity
                  );
                }, 0)
                }`
              );
              if (response.status) {
                window.location.href = response.data.data;
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
      }
    }
  };
  function generateUUID() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
  const caculateFee = async () => {
    try {
      const response = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          //service_id: 53320,
          service_type_id: 2,
          to_district_id: Number(selectedDistrict),
          to_ward_code: selectedWard,
          height: 50,
          length: 20,
          weight: 2000,
          width: 20,
          cod_failed_amount: 2000,
          insurance_value: 10000,
          coupon: null,
        },
        {
          headers: {
            Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
            "Content-Type": "application/json",
            ShopId: 124173,
          },
        }
      );
      setFeeShip(response?.data?.data?.total);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );
      setProvinces(response?.data?.data);
      setSelectedProvince(response?.data?.data[0]?.ProvinceID);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const fetchDistrictsByProvince = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        configApi
      );
      setDistricts(response?.data?.data);
      setSelectedDistrict(response?.data?.data[0]?.DistrictID);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWardsByDistrict = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        configApi
      );
      setWards(response.data.data);
      setSelectedWard(response?.data?.data[0]?.WardCode);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };
  useEffect(() => {
    getDetailShoe();
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      fetchDistrictsByProvince(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsByDistrict(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard !== undefined) {
      caculateFee();
    } else {
      return;
    }
  }, [selectedWard]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(parseInt(event.target.value, 10));
    setRadioChoose(parseInt(event.target.value, 10));
  };
  return (
    <div className="w-full h-full">
      <ShippingProcess type={2} />
      <div className="grid sm:px-5 lg:grid-cols-2 lg:px-10 xl:px-10 shadow-md my-10 bg-[#f9fafb] py-4">
        <div className="px-4 ">
          <p className="text-base font-medium text-black mt-3">
            Trang Thanh Toán
          </p>
          <p className="text-gray-400 text-sm">
            Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển
            phù hợp.
          </p>

          {!!cartItems && cartItems.length ? (
            <div className="mt-4 space-y-3  bg-white overflow-y-scroll h-[360px] ">
              {cartItems.map((item, index) => {
                return <ItemPayMent item={item} key={index} />;
              })}
            </div>
          ) : (
            <img src={Images.isEmtyCart} className="h-72  mx-auto" />
          )}

          <div className=" w-full   mt-2">
            <div className="flex gap-5 items-center mb-1">
              <span className=" text-sm font-medium"> ÁP DỤNG MÃ GIẢM GIÁ</span>
              {!!codeVoucher && (
                <div className="relative">
                  <p className="font-semibold bg-blue-600 px-2  rounded text-white">
                    {codeVoucher}
                  </p>
                  <div
                    className="bg-blue-600 rounded-full p-[1px] absolute -top-1 -right-1 cursor-pointer "
                    onClick={() => {
                      setPrecent(0);
                      setCodeVoucher("");
                    }}
                  >
                    <img
                      src={Images.iconClose2}
                      alt=""
                      className="  w-3 h-3 object-contain "
                    />
                  </div>
                </div>
              )}
            </div>
            {!!listDetailShoe && (
              <ShowVoucherList
                setVoucher={setVoucher}
                setCodeVoucher={setCodeVoucher}
                setPrecent={setPrecent}
                valueCheck={cartItems.reduce((total, cartItem) => {
                  const item = listDetailShoe.find((i) => i.id === cartItem.id);
                  return (
                    total +
                    (item?.discountValue
                      ? item?.discountValue
                      : item?.price || 0) *
                    cartItem.quantity
                  );
                }, 0)}
              />
            )}
          </div>
        </div>
        {/* Thanh toán */}
        <div className="mt-10 bg-gray-50 px-4 pt-2 lg:mt-0">
          <p className="text-base font-medium  ">Chi tiết thanh toán</p>
          <p className="text-gray-400">
            Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh
            toán của bạn.
          </p>
          <div className="mt-2">
            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]">
                <input
                  value={textHVT}
                  onChange={(e) => {
                    setTextHVT(e?.target?.value);
                  }}
                  autoComplete="off"
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập họ và tên
                </label>
              </div>
              <div className="relative z-0 w-[45%] ">
                <input
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e?.target?.value);
                  }}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập email
                </label>
              </div>
            </div>
            <div className="flex justify-between w-full px-4 my-3">
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedProvince}
                    onChange={(e: any) => setSelectedProvince(e?.target?.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {provinces && provinces.length > 0 ? (
                      provinces.map((province) => (
                        <option key={province.ProvinceID} value={province.ProvinceID}>
                          {province.ProvinceName}
                        </option>
                      ))
                    ) : (
                       <option value="">Chọn Phường/Xã</option>
                    )}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Tỉnh/Thành Phố
                </label>
              </div>
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedDistrict}
                    onChange={(e: any) => setSelectedDistrict(e?.target?.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {districts && districts.length > 0 ? (
                      districts.map((district) => (
                        <option key={district.DistrictID} value={district.DistrictID}>
                          {district.DistrictName}
                        </option>
                      ))
                    ) : (
                      <option value="">Chọn Quận/Huyện</option>
                    )}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Quận/Huyện
                </label>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedWard}
                    onChange={(e: any) => setSelectedWard(e?.target?.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {wards && wards.length > 0 ? (
                      wards.map((ward) => (
                        <option
                          key={ward.WardCode}
                          value={ward.WardCode.toString()}
                        >
                          {ward.WardName}
                        </option>
                      ))) : (
                      <option value="">Loading...</option>
                    )}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Phường/Xã
                </label>
              </div>
              <div className="relative z-0  w-[45%]">
                <input
                  value={specificAddress}
                  onChange={(e: any) => setSpecificAddress(e?.target?.value)}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập địa chỉ cụ thể
                </label>
              </div>
            </div>
            <div className="w-full flex justify-between items-end  px-4 my-5">
              <div className="relative z-0 w-[45%] ">
                <input
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e?.target?.value);
                  }}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập số điện thoại
                </label>
              </div>
              <div className=" flex  items-end justify-between    w-[45%]">
                <span className="text-sm font-medium">Lời nhắn :</span>
                <input
                  className="py-1 border border-gray-300 rounded focus:border-gray-500 p-2 outline-none  text-sm "
                  type="text"
                  value={note}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNote(e.target.value);
                  }}
                />
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium text-gray-900"
            >
              Chọn phương thức thanh toán
            </label>

            <div className="flex items-center justify-around">
              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    value={0}
                    checked={radioChoose === 0}
                    name="payment"
                    onChange={handleChange}
                    id="option2"
                    aria-describedby="helper-radio-text"
                    type="radio"
                    className=" peer-checked:border-gray-500  peer-checked: peer-checked:ring-gray-500 w-4 h-4 text-gray-500 bg-gray-100 border-gray-300 focus:ring-gray-500  "
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="option2"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Thanh toán khi nhận hàng
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    value={1}
                    checked={radioChoose === 1}
                    name="payment"
                    onChange={handleChange}
                    id="option3"
                    aria-describedby="helper-radio-text"
                    type="radio"
                    className=" peer-checked:border-gray-500  peer-checked: peer-checked:ring-gray-500 w-4 h-4 text-gray-500 bg-gray-100 border-gray-300 focus:ring-gray-500  "
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="option3"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Thanh toán vnpay
                  </label>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Tổng tiền hàng
                </p>
                {!!listDetailShoe && (
                  <p className="font-normal text-gray-900">
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = listDetailShoe.find(
                          (i) => i.id === cartItem.id
                        );
                        return (
                          total +
                          (item?.discountValue
                            ? item?.discountValue
                            : item?.price || 0) *
                          cartItem?.quantity
                        );
                      }, 0)
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Phí vận chuyển
                </p>
                <p className="font-normal text-gray-900">
                  {formatCurrency(feeShip ? feeShip : 0)}
                </p>
              </div>
              {!!listDetailShoe && !!percent ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Giảm giá voucher
                  </p>
                  <p className="font-normal text-gray-900">
                    -{" "}
                    {formatCurrency(
                      (percent / 100) *
                      cartItems.reduce((total, cartItem) => {
                        const item = listDetailShoe.find(
                          (i) => i.id === cartItem.id
                        );
                        return (
                          total +
                          (item?.discountValue
                            ? item?.discountValue
                            : item?.price || 0) *
                          cartItem.quantity
                        );
                      }, 0)
                    )}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Giảm giá voucher
                  </p>
                  <p className="font-normal text-gray-900">
                    - {formatCurrency(0)}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Tổng thanh toán
              </p>
              {!!listDetailShoe && feeShip && (
                <p className="text-2xl font-semibold text-red-500">
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = listDetailShoe.find(
                        (i) => i.id === cartItem.id
                      );
                      return (
                        total +
                        (item?.discountValue
                          ? item?.discountValue
                          : item?.price || 0) *
                        cartItem.quantity
                      );
                    }, 0) +
                    feeShip -
                    (percent / 100) *
                    cartItems.reduce((total, cartItem) => {
                      const item = listDetailShoe.find(
                        (i) => i.id === cartItem.id
                      );
                      return (
                        total +
                        (item?.discountValue
                          ? item?.discountValue
                          : item?.price || 0) *
                        cartItem.quantity
                      );
                    }, 0)
                  )}
                </p>
              )}
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white"
            onClick={() => {
              if (cartItems.length === 0) {
                toast.warning("Cần có sản phẩm");
                return;
              } else {
                setShowMoal(true);
              }
            }}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      {showModal && (
        <ModalComponent
          check={true}
          isVisible={showModal}
          onClose={() => {
            setShowMoal(false);
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
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center   ">
              Xác nhận đặt đơn hàng ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2 gap-16">
              <button
                onClick={() => {
                  setShowMoal(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  postBill();
                  setShowMoal(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
      {/* <ShowVoucher isOpen={isModalOpenVoucher} onClose={toggleModal} />  */}
    </div>
  );
};

export default PaymentPage;
