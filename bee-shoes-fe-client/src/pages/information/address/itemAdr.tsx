import React, { useState, useEffect, useRef } from "react";
import {
  District,
  IAddress,
  Province,
  Ward,
} from "../../../types/product.type";
import axios from "axios";
import UpdateAdr from "./updateAdr";
import { configApi } from "../../../utils/config";
import API from "../../../api";
import { toast } from "react-toastify";
import { getTokenCustomer } from "../../../helper/useCookie";
import ModalComponent from "../../../components/Modal";
import LoadingScreen from "../../../components/Loading";

const ItemAdr = ({
  item,
  check,
  setCheck,
  checkUp,
  setCheckUp,
}: {
  item: IAddress;
  check: boolean;
  setCheck: any;
  checkUp: boolean;
  setCheckUp: any;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<boolean>(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<boolean>(false);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const itemRef = useRef<IAddress | null>(null);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );
      if (response.status) {
        setProvinces(response?.data?.data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setSelectedProvince(true);
    }
  };
  const fetchDistrictsByProvince = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        configApi
      );
      if (response.status) {
        setDistricts(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setSelectedDistrict(true);
    }
  };
  const fetchWardsByDistrict = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        configApi
      );
      if (response.status) {
        setWards(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setSelectedWard(true);
    }
  };
  useEffect(() => {
    if (!!item) {
      fetchProvinces();
    }
  }, [item]);
  useEffect(() => {
    if (selectedProvince === true && !!item?.province) {
      fetchDistrictsByProvince(Number(item?.province));
    }
  }, [selectedProvince, item?.province]);
  useEffect(() => {
    if (selectedDistrict === true && !!item?.district) {
      fetchWardsByDistrict(Number(item?.district));
    }
  }, [selectedDistrict, item?.district]);
  const nameProvince =
    selectedProvince === true
      ? provinces.find((d) => d?.ProvinceID === Number(item?.province))
      : null;
  const nameDistrict =
    selectedDistrict === true
      ? districts.find((d) => d?.DistrictID === Number(item?.district))
      : null;
  const nameWard =
    selectedWard === true
      ? wards.find((d) => Number(d?.WardCode) === Number(item?.ward))
      : null;
  const deleteAdrID = async (id: number | string) => {
    try {
      const res = await axios({
        method: "delete",
        url: API.deleteAdr(Number(id)),
      });
      if (res.data) {
        toast.success("Đã xóa thành công");
        setCheck(!check);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (item: IAddress) => {
    try {
      const res = await axios({
        method: "put",
        url: API.putAdr(item?.id),
        data: {
          name: item?.name,
          phoneNumber: item?.phoneNumber,
          specificAddress: item?.specificAddress,
          ward: item?.ward,
          district: item?.district,
          province: item?.province,
          defaultAddress: true,
        },
      });
      if (res.data) {
        toast.success("Đã sửa thành công");
        setCheck(!check);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemProp = (newItemProp: IAddress) => {
    itemRef.current = newItemProp;
    setShowUpdate(true);
  };
  return (
    <>
      {!!nameWard || !!nameDistrict || nameProvince ? (
        <div className="border-b-[1px] border-gray-200 flex p-2 ">
          <div className="w-[80%] flex flex-col justify-between">
            <div className="flex items-center">
              <span className="text-[#000000de]  text-sm font-semibold">
                {item?.name ? item?.name : ""}
              </span>
              <div className="h-[80%] w-[0.5px] ml-2 bg-[#0000008a]" />
              <span className="text-gray-400 ml-2 text-sm font-normal">
                {item?.phoneNumber ? item?.phoneNumber : ""}
              </span>
            </div>
            <p className="text-gray-500  text-lg font-normal">
              {" "}
              {item?.specificAddress}, {nameWard ? nameWard?.WardName : " "}
              {nameDistrict ? nameDistrict?.DistrictName : ""},{" "}
              {nameProvince ? nameProvince?.ProvinceName : ""}
            </p>

            {item?.defaultAddress && (
              <button className="px-2  mt-2 border-red-400 border-[1px] w-fit text-red-500 text-xs">
                Mặc định
              </button>
            )}
          </div>
          <div className="w-[20%] flex flex-col h-full justify-between items-center">
            <div className="flex items-center justify-around w-full">
              <button
                className="text-sm text-blue-400"
                onClick={() => {
                  updateItemProp(item);
                }}
              >
                Cập nhật
              </button>
              {item?.defaultAddress === true ? (
                <></>
              ) : (
                <button
                  className="text-sm text-blue-400"
                  onClick={() => {
                    setShowModalDelete(true);
                  }}
                >
                  Xóa
                </button>
              )}
            </div>
            {item?.defaultAddress === true ? (
              <></>
            ) : (
              <button className="border-[#d8d8d8] border-[1px] h-fit px-2 rounded mt-2 ">
                <span
                  className="text-[#000000de] text-sm"
                  onClick={() => {
                    updateStatus(item);
                  }}
                >
                  Thiết lập mặc định
                </span>
              </button>
            )}
          </div>
          <UpdateAdr
            checkUp={checkUp}
            setCheckUp={setCheckUp}
            item={itemRef.current}
            isOpen={showUpdate}
            onClose={() => setShowUpdate(false)}
          />
          {showModalDelete && (
            <ModalComponent
              check={true}
              isVisible={showModalDelete}
              onClose={() => {
                setShowModalDelete(false);
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
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                  Xác nhận xóa địa chỉ mà bạn đã lựa chọn ?
                </h3>

                <div className="w-full flex justify-around items-center mb-2">
                  <button
                    onClick={() => {
                      setShowModalDelete(false);
                    }}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      deleteAdrID(item?.id);
                      setShowModalDelete(false);
                    }}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </ModalComponent>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ItemAdr;
