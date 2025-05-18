import React from "react";
import { useState } from "react";
import Images from "../../../../static";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SimpleToast from "../../../../components/Toast";

const DetailReturn = () => {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [radioChoose, setRadioChoose] = React.useState<string>("option1");
  const [showToast, setShowToast] = React.useState<boolean>(false);

  const handleChange = (event: any) => {
    setRadioChoose(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const imagesArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        imagesArray.push(imageUrl);
      }

      setSelectedImages(imagesArray);
    }
  };
  return (
    <div className="w-full h-full  mb-20">
      <p className="uppercase font-bold mt-4 text-[#FFBA00]">Hoàn trả hàng</p>
      <p className="text-base  font-semibold mt-4">
        Phương án: <span className="font-normal">Trả hàng và hoàn tiền</span>
      </p>
      <div className="relative z-0  w-[45%] mt-2">
        <input
          type="text"
          id="floating_standard"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_standard"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Hãy nhập lý do hoàn trả hàng
        </label>
      </div>
      <p className="my-4 font-medium">Thêm hình ảnh sản phẩm</p>
      <div className="flex  ">
        {selectedImages.length > 0 ? (
          <div className="flex flex-wrap mr-2">
            {selectedImages.map((imageSrc, index) => (
              <div key={index} className="mr-2 mb-2">
                <img
                  src={imageSrc}
                  alt={`Selected ${index}`}
                  className="w-32 h-32"
                />
              </div>
            ))}
          </div>
        ) : null}
        <label
          htmlFor="dropzone-file"
          className="flex  flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  w-40 mr-2"
        >
          <div className="flex flex-col items-center justify-center ">
            <svg
              className="w-8 h-8  text-gray-500 "
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 16"
            ></svg>
            <p className="mb-2 text-sm text-gray-500 font-semibold text-center">
              Thêm hình ảnh sản phẩm
            </p>
            <p className="text-xs text-gray-500  text-center">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            className="hidden mt-9"
            multiple
            onChange={handleImageChange}
          />
        </label>
      </div>

      <p className="mt-4 font-medium">Email của bạn</p>
      <span>huybui@gmail.com</span>
      <div>
        <p className="mt-4 font-medium">Mô tả</p>
        <textarea
          id="w3review"
          name="w3review"
          rows={4}
          cols={50}
          defaultValue={"Ghi chú thêm"}
        />
      </div>
      <div>
        <p className="mt-4 font-medium">Chọn hình thức vận chuyển</p>
        <form className="mt-5 flex justify-between">
          <div className="relative w-[48%]">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              defaultChecked
            />
            <span className="peer-checked:border-[#FFBA00] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
            <label
              className="peer-checked:border-2 peer-checked:border-[#FFBA00] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_1"
            >
              <img
                className="w-14 object-contain"
                src={Images.iconDeliveryFash}
              />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Đến lấy tại nhà </span>
                <p className="text-slate-500 text-sm leading-6">free</p>
              </div>
            </label>
          </div>

          <div className="relative w-[48%]">
            <input
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="radio"
              defaultChecked
            />
            <span className="peer-checked:border-[#FFBA00] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
            <label
              className="peer-checked:border-2 peer-checked:border-[#FFBA00] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_2"
            >
              <img className="w-14 object-contain" src={Images.iconDivery} />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Gửi bưu cục</span>
                <p className="text-slate-500 text-sm leading-6">
                  Vận chuyển: 2-4 ngày
                </p>
              </div>
            </label>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className=" bg-[#FFBA00] px-28 py-4 rounded text-base font-semibold "
          onClick={() => {
            toast.success("Gửi yêu  cầu thành công");
          }}
        >
          Gửi yêu cầu
        </button>
      </div>
      {showToast && (
        <SimpleToast typeToast="success" message="Gửi yêu cầu thành công" />
      )}
    </div>
  );
};

export default DetailReturn;
