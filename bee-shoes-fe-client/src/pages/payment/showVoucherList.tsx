import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Images from "../../static";
import axios from "axios";
import API from "../../api";
import { IVoucher } from "../../types/product.type";
import { formartDate } from "../../utils/formatCurrency";
import { convertToCurrencyString } from "../../utils/format";
import { toast } from "react-toastify";
const ShowVoucherList = ({
  valueCheck,
  setPrecent,
  setCodeVoucher,
  setVoucher,
}: {
  valueCheck: number;
  setPrecent: any;
  setCodeVoucher: any;
  setVoucher: any;
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [dataVoucher, setDataVoucher] = useState<IVoucher[]>();
  const [inputVoucher, setInputVoucher] = useState<string>();
  const sliderRef = React.useRef<Slider>(null);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const getVoucherSearch = async () => {
    const res = await axios({
      method: "get",
      url: API.getVoucherSearchPub(inputVoucher ? inputVoucher : ""),
    });
    if (res.status) {
      if (res?.data?.data.length === 1) {
        if (valueCheck >= res?.data?.data[0].minBillValue) {
          setPrecent(res?.data?.data[0]?.percentReduce);
          setVoucher(res?.data?.data[0]?.id);
          toast.success("Áp dụng voucher thành công");
        } else {
          toast.warning("Voucher không được áp dụng");
        }
      } else {
        toast.warning("Không tìm thấy mã");
      }
    }
  };
  const getAllVoucher = async () => {
    const res = await axios({
      method: "get",
      url: API.getVoucherPublic(),
    });
    if (res.status) {
      setDataVoucher(res?.data?.data);
    }
  };
  const handleChangeInput = (event: any) => {
    setInputVoucher(event?.target?.value);
  };
  useEffect(() => {
    getAllVoucher();
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-5 mx-4 mb-4">
        <input
          onChange={handleChangeInput}
          value={inputVoucher}
          type="text"
          placeholder="Nhập mã voucher tại đây"
          className="text-sm font-semibold py-2 border-gray-300 rounded-[5px] w-[75%]"
        />
        <div
          className="border-[1px] border-gray-400 px-4 py-1 rounded-[5px] cursor-pointer"
          onClick={() => {
            getVoucherSearch();
          }}
        >
          <span className="font-medium">Áp dụng</span>
        </div>
      </div>
      <div className="flex items-center  mr-4">
        {!!dataVoucher && dataVoucher.length <= 2 ? (
          !!dataVoucher &&
          dataVoucher.length > 0 &&
          dataVoucher.map((item, index) => {
            return (
              <div
                key={index}
                className=" cursor-pointer"
                onClick={() => {
                  if (valueCheck >= item?.minBillValue) {
                    setPrecent(item?.percentReduce);
                    setCodeVoucher(item?.code);
                    setVoucher(item?.id);
                    toast.success("Áp dụng voucher thành công");
                  } else {
                    toast.warning("Voucher không được áp dụng");
                  }
                }}
              >
                <div className="w-[250px] h-[88px] absolute flex items-center ">
                  <img src={Images.iconGift} alt="" className="w-6 ml-4 mr-2" />
                  <div className="border-l-2 border-dashed  h-[92%] p-1">
                    <p className="text-[10px] font-semibold text-blue-600">
                      Nhập mã{" "}
                      <span className="bg-blue-600 px-1 rounded text-white">
                        {item?.code}
                      </span>
                    </p>
                    <p className="font-semibold">Giảm {item?.percentReduce}%</p>
                    <p className="text-[10px] font-normal">
                      Cho đơn hàng từ:{" "}
                      {convertToCurrencyString(item?.minBillValue)}
                    </p>
                    <p className="text-[8px] text-blue-600">
                      Thời gian áp dụng từ: {formartDate(item?.startDate)}
                    </p>
                  </div>
                </div>
                <img
                  src={Images.bgItemVoucher}
                  className="w-[250px] h-[88px]  "
                />
              </div>
            );
          })
        ) : !!dataVoucher && dataVoucher.length >= 2 ? (
          <>
            <button onClick={() => prev()}>
              <a className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative   ">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB40lEQVR4nO3V30tTcRjH8f0VhihhaCKKmLZYk1FZIQ3x1gvxRrrwUi8CC8Ux03S45q+lTvztWjK9rFXObWc7++XOZv4BoUgXiiskw2xs8JEdd9HF9/mewts9f8DrDc95vhyVKj//M47mLyFH8w7eNiWwqo9j5UkcS40SFh/HMP9oG3MN25i9H4XtXgQzujCm6sN4ow1hUhPExB0RY2oRllq/yAlcDR+tC8Byyw8y8C/4tC6I8bsCrFqRiZtrOAFlPIT3hl2kztJwdkpMfKRaoANKa7G3h5FOZZCdjS6JiZuqfHSAh9v0Ik6Pfst47N0eXt8WmPhwpZcOUPikzo+DRFLGv+3+gEXjI/FXFZwAE9eKSDj3ZfxX8hzWRoGLD5Z76ADrFDe6JBnP7n6xLaiID9zcogOsO3d25gJ/MlhoFRXx/lI3HWA9olG1gNjanhw5PT7H+EMvFzfe4ASoF2pWe7AvHcuRg53vGKpxk7ihZJMO8J7/2AMvfh5enmnU/hUvK9xMvO/6ZzpA4ebczmdbAvK3yM5qR4SJ9xZ/ogM83FTlw1ClB+vPJJydpLD8NMzEe4o4AR4+nNv5QPkWDGUuGEs3mfiLwo90QAkfJHb+N/78mosOZH8WV8W7Cz4EyEB+VIy5AMnrU4emsRhoAAAAAElFTkSuQmCC" />
              </a>
            </button>
            <Slider {...settings} className="w-[90%] mx-auto" ref={sliderRef}>
              {!!dataVoucher &&
                dataVoucher.length > 0 &&
                dataVoucher.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" cursor-pointer"
                      onClick={() => {
                        if (valueCheck >= item?.minBillValue) {
                          setPrecent(item?.percentReduce);
                          setCodeVoucher(item?.code);
                          setVoucher(item?.id);
                          toast.success("Áp dụng voucher thành công");
                        } else {
                          toast.warning("Voucher không được áp dụng");
                        }
                      }}
                    >
                      <div className="w-[250px] h-[88px] absolute flex items-center ">
                        <img
                          src={Images.iconGift}
                          alt=""
                          className="w-6 ml-4 mr-2"
                        />
                        <div className="border-l-2 border-dashed  h-[92%] p-1">
                          <p className="text-[10px] font-semibold text-blue-600">
                            Nhập mã{" "}
                            <span className="bg-blue-600 px-1 rounded text-white">
                              {item?.code}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Giảm {item?.percentReduce}%
                          </p>
                          <p className="text-[10px] font-normal">
                            Cho đơn hàng từ:{" "}
                            {convertToCurrencyString(item?.minBillValue)}
                          </p>
                          <p className="text-[8px] text-blue-600">
                            Thời gian áp dụng từ: {formartDate(item?.startDate)}
                          </p>
                        </div>
                      </div>
                      <img
                        src={Images.bgItemVoucher}
                        className="w-[250px] h-[88px]  "
                      />
                    </div>
                  );
                })}
            </Slider>
            <button
              onClick={() => {
                next();
              }}
            >
              <a className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative  ">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB30lEQVR4nO3T309ScRjHcf6KWqs1G+kczZTCCkel5ZqOedtF66ati+60ra2aTkcZ1VQQpVCm2Q9iQVwmGcjpHA4gcUjXvcNWN05sLZk/SLeP4zC9ged7cNzy/AGv99lzvo9KVZmDzP1D09EHh/14eOQzuo/OoOfYDHqPf0FfVQCmE0E8UgfRXz2LJzUhmGs5PNNweH7qKwbqeAzWC7A0CLBoBZEMlItbz4QxrBNBBijcpA6g76Qf/TWzivhIIyNAffmb2zGs/83i4z0JTzUhJj56PkIHqLW47sSRm+2tHTivh5n4C32UDlA7f1wbRNy1KEfWVjZhu8KR+MumGB1g/VDz6QCWEity5NfCKoYauaL4mIERUHotw80c/i1vyJHEhxSsOr4AH780RwdKeYqvbojyv8iNt1MqwJ2X43SglHc+dTOC7Ww+4OuSCvCJlm90QAm3t/L7K0p6UhjViwX45FVGgIUPnePwM5mW8d8//sB+USiKT7Um6ACJn+UheVIynklvwmkMk/jraxIdoC7Ud1fKH1p2B65bMSb+ti1JB6gL9XZK2Mr8x6feBTgMUSb+rp0RoM7frhdhu8DDYYgo4u+N3+kA6/zHFNayh7s75hkBrSCWi7s75sNkoDKqIrML85NThOciw8QAAAAASUVORK5CYII=" />{" "}
              </a>
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ShowVoucherList;
