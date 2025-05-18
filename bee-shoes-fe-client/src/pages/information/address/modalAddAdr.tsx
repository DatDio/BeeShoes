import axios from "axios";
import React, { useEffect, useState } from "react";
import { District, Province, Ward } from "../../../types/product.type";
import API from "../../../api";
import { toast } from "react-toastify";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import { regexPhoneNumber } from "../../../utils/format";

const AddAddressModal = ({
  isOpen,
  onClose,
  provinces,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  districts,
  setSelectedProvince,
  setSelectedDistrict,
  setSelectedWard,
  wards,
}: {
  isOpen: boolean;
  onClose: any;
  provinces: Province[];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  districts: District[];
  setSelectedProvince: any;
  setSelectedDistrict: any;
  setSelectedWard: any;
  wards: Ward[];
}) => {
  const { userPrf } = useShoppingCart();
  const [specificAddress, setSpecificAddress] = useState<string>(" ");
  const [textHVT, setTextHVT] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [checkDefault, setCheckDefault] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    textHVT: "",
    phoneNumber: "",
    specificAddress: "",
  });
  const AddAdrForUser = async () => {
    if (textHVT.trim() === "") {
      setErrors((prev) => ({ ...prev, textHVT: "Không được để trống tên." }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, textHVT: "" }));
    }

    if (!regexPhoneNumber.test(phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Sai định dạng số điện thoại",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }

    if (specificAddress.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        specificAddress: "Bạn cần nhập địa chỉ chi tiết",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, specificAddress: "" }));
    }
    try {
      const res = await axios({
        method: "post",
        url: API.addAdrress(),
        data: {
          account: userPrf?.id,
          name: textHVT,
          phoneNumber: phoneNumber,
          specificAddress: specificAddress,
          ward: selectedWard,
          district: selectedDistrict,
          province: selectedProvince,
          defaultAddress: checkDefault,
          status: true,
        },
      });
      if (res.status === 200) {
        toast.success("Thêm địa chỉ mới thành công");
        onClose();
      } else {
      }
    } catch (error) {
    } finally {
      setSpecificAddress("");
      setTextHVT("");
      setPhoneNumber("");
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[100]">
      <div className="relative top-20 mx-auto p-5 border w-[50%] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Thêm Địa Chỉ Mới
          </h3>
          <div className="mt-2 px-7 py-3">
            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập họ và tên</span>
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
                {errors.textHVT && (
                  <p className="text-red-500 text-xs italic">
                    {errors.textHVT}
                  </p>
                )}
              </div>
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập số điện thoại
                </span>
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
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs italic">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between w-full px-4 my-3">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập Tỉnh/Thành Phố
                </span>
                <select
                  value={selectedProvince}
                  onChange={(e: any) => setSelectedProvince(e?.target?.value)}
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  {provinces.map((province) => (
                    <option
                      key={province.ProvinceID}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập Quận/Huyện</span>
                <select
                  value={selectedDistrict}
                  onChange={(e: any) => setSelectedDistrict(e?.target?.value)}
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  {districts.map((district) => (
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID.toString()}
                    >
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập Phường/Xã</span>
                <select
                  value={selectedWard}
                  onChange={(e: any) => setSelectedWard(e?.target?.value)}
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  {wards.map((ward) => (
                    <option
                      key={ward.WardCode}
                      value={ward.WardCode.toString()}
                    >
                      {ward.WardName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập địa chỉ cụ thể
                </span>
                <input
                  value={specificAddress}
                  onChange={(e: any) => setSpecificAddress(e?.target?.value)}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                {errors.specificAddress && (
                  <p className="text-red-500 text-xs italic">
                    {errors.specificAddress}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 flex items-center justify-around">
            <button
              className="px-8 py-1 border-[1px]  border-[#f5f5f5]  text-sm font-medium rounded-md  shadow-sm bg-[#f5f5f5] hover:bg-[#c1bdbd] focus:outline-none "
              onClick={onClose}
            >
              Trở lại
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={AddAdrForUser}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAddressModal;
