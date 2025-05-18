import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { IDataNoti } from "../../types/product.type";
import { formartDate } from "../../utils/formatCurrency";
import Images from "../../static";
import path from "../../constants/path";

const Notification = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<IDataNoti>();
  console.log("params", params);
  const checkNotification = async () => {
    const res = await axios({
      method: "put",
      url: API.getNoti(Number(params?.id)),
    });
    if (res.status) {
      setData(res.data.data);
    }
  };
  useEffect(() => {
    if (params) {
      checkNotification();
    }
  }, [params]);

  return (
    <div className="w-full h-full ">
      <div className="w-[80%] h-screen mx-auto shadow-lg  my-5 drop-shadow-2xl p-4">
        <div className="flex items-center justify-start gap-4">
          <img
            src={Images.iconBack}
            alt=""
            className="w-7"
            onClick={() => {
              navigate(path.home);
            }}
          />
          <p className="text-base font-normal"> Chi tiết thông báo</p>
        </div>
        <div>
          <p className="font-semibold text-xl">{data?.title}</p>
          <div className="flex items-center border-b-[1px] py-5">
            <span className="text-gray-400 text-sm ">Thông báo | </span>
            <span className="text-gray-400 text-sm ml-1">
              {" "}
              {formartDate(data?.createAt ? data?.createAt : "")}
            </span>
          </div>
          <p className="mt-5">{data?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
