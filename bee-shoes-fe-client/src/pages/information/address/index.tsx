import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import Images from "../../../static";
import axios from "axios";
import API from "../../../api";
import {
  District,
  IAddress,
  Province,
  Ward,
} from "../../../types/product.type";
import AddAddressModal from "./modalAddAdr";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import ItemAdr from "./itemAdr";
import { configApi } from "../../../utils/config";
import { toast } from "react-toastify";

const Address = () => {
  const { userPrf } = useShoppingCart();
  const [check, setCheck] = useState<boolean>(false);
  const [checkUp, setCheckUp] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataAddress, setDataAddress] = useState<IAddress[]>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
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

  const updateStatus = async (item: IAddress) => {
    console.log("sẽ update ", item);
    try {
      const res = await axios({
        method: "put",
        url: API.putAdr(item.id),
        data: {
          name: item.name,
          phoneNumber: item.phoneNumber,
          specificAddress: item.specificAddress,
          ward: item.ward,
          district: item.district,
          province: item.province,
          defaultAddress: true,
        },
      });
      if (res.data) {
        loadAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadAddress = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getAddress(Number(userPrf?.id)),
      });
      if (res.data) {
        setDataAddress(res?.data?.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataAddress?.length === 1 && dataAddress[0].defaultAddress === false) {
      updateStatus(dataAddress[0]);
    }
  }, [dataAddress, isModalOpen]);
  useEffect(() => {
    // if (userPrf) {
    loadAddress();
    // }
  }, [userPrf?.id, isModalOpen, check, checkUp]);

  useEffect(() => {
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

  return (
    <div className="w-full h-full  ">
      <div className="w-[80%] mx-auto min-h-screen shadow-lg mb-10">
        <div className="flex justify-between items-center py-4  px-2 border-b-[1px] border-gray-200">
          <p className="font-semibold text-gray-800  text-lg">
            Địa chỉ của tôi
          </p>
          <button className="bg-red-500 flex items-center px-2 py-1 rounded-sm">
            <img
              src={Images.iconPlus}
              className="w-[15px] h-auto object-contain"
            />

            <button
              className="text-white text-sm "
              onClick={() => setModalOpen(true)}
            >
              Thêm địa chỉ mới
            </button>
          </button>
        </div>

        {!!dataAddress ? (
          dataAddress.map((item, index) => {
            return (
              <ItemAdr
                item={item}
                key={index}
                check={check}
                checkUp={checkUp}
                setCheck={setCheck}
                setCheckUp={setCheckUp}
              />
            );
          })
        ) : (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <AddAddressModal
        selectedProvince={selectedProvince}
        selectedDistrict={selectedDistrict}
        selectedWard={selectedWard}
        setSelectedProvince={setSelectedProvince}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedWard={setSelectedWard}
        provinces={provinces || []}
        districts={districts || []}
        wards={wards || []}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Address;
