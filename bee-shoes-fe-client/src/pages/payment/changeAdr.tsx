import React, { useState, useEffect } from "react";
import { District, IAddress, Province, Ward } from "../../types/product.type";
import ModalComponent from "../../components/Modal";
import { configApi } from "../../utils/config";
import axios from "axios";
import DetailAddress from "../information/address/detailAddress";

const ChangeAdr = ({
  item,
  indexArr,
  setIndexArr,
  chooseRadio,
  setChooseRadio,
}: {
  item: IAddress;
  indexArr: any;
  setIndexArr: any;
  chooseRadio: any;
  setChooseRadio: any;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
    setIndexArr(indexArr);
    setChooseRadio(indexArr);
  };
  useEffect(() => {
    if (!!item) {
      setIndexArr(0);
      setIsChecked(item.defaultAddress);
    }
  }, [item]);
  return (
    <label
      className={`flex items-center  py-5 px-5 
      min-h-[100px]
      border-b-[1px] border-solid border-gray-400 `}
    >
      <input
        onChange={handleRadioChange}
        checked={chooseRadio === indexArr ? true : false}
        id={`default-radio-${item?.id}`}
        type="radio"
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-white border-gray-300 checked:bg-gray-600  focus:ring-0"
      />
      <div className="flex w-full justify-between ml-2">
        <div className="flex flex-col w-full  ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {" "}
              <span className="text-sm font-medium ">{item.name}</span>
              <div className="border-l-[1px] border-l-gray-400 ml-2 pl-2 text-xs text-gray-500">
                {item.phoneNumber}
              </div>
            </div>
          </div>
          <DetailAddress
            distr={item?.district}
            prov={item?.province}
            war={item?.ward}
            spec={item?.specificAddress}
          />
          {!!item.defaultAddress && (
            <button className="border-red-500 px-1 text-xs  border-[1px] text-red-500 w-fit">
              Mặc định
            </button>
          )}
        </div>
      </div>
    </label>
  );
};

export default ChangeAdr;
