import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import SliderListProduct from "../../components/SliderListProduct";
import axios from "axios";
import API from "../../api";
import { IDetailProduct, IInforShoe, IProduct } from "../../types/product.type";
const ProductPage = () => {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [inforShoe, setInforShoe] = useState<IInforShoe>();
  const [dataDetailProduct, setDataDetailProduct] =
    useState<IDetailProduct[]>();
  const [dataProductSole, setDataProductSole] = useState<IProduct[]>();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const getInfoDetailProduct = async () => {
    if (!!id) {
      const res = await axios({
        method: "get",
        url: API.getShoeDetail(Number(id)),
      });
      if (res.status) {
        setDataDetailProduct(res?.data?.data);
      }
    }
  };
  const getShoeSole = async () => {
    if (!!inforShoe) {
      const res = await axios({
        method: "get",
        url: API.getProuductSame(inforShoe?.brand?.id, inforShoe.category?.id),
      });
      if (res.status) {
        setDataProductSole(res?.data?.data);
      }
    }
  };
  const getProductWithId = async () => {
    if (!!id) {
      const res = await axios({
        method: "get",
        url: API.getShoeWithId(Number(id)),
      });
      if (res.status) {
        setInforShoe(res.data);
      }
    }
  };
  useEffect(() => {
    getProductWithId();
    getInfoDetailProduct();
  }, [id]);
  useEffect(() => {
    getShoeSole();
  }, [inforShoe]);

  const Tab01 = () => {
    return !!inforShoe ? (
      <div className="w-[70%] mx-auto ">
        <p className="font-semibold my-4 cursor-pointer ">
          Mô tả sản phẩm:{" "}
          <span className="underline font-normal ">{inforShoe?.name}</span>{" "}
        </p>
        <span className="font-bold my-4">Thông tin sản phẩm: </span>
        <span className=" my-4 font-normal">{inforShoe?.description}</span>
        <p className="font-semibold my-4">
          Thương hiệu:{" "}
          <span className="font-normal">{inforShoe?.brand.name}</span>
        </p>
        <p className="font-medium my-4">
          Danh mục:{" "}
          <span className="font-normal  ">{inforShoe?.category.name}</span>
        </p>
        <p className="font-medium my-4">
          Size:{" "}
          {!!dataDetailProduct &&
            !!dataDetailProduct.length &&
            dataDetailProduct.map((e, i) => {
              return i + 1 === dataDetailProduct.length ? (
                <span key={i} className="font-normal  ">
                  {e.size}
                </span>
              ) : (
                <span key={i} className="font-normal  ">
                  {e.size},
                </span>
              );
            })}
        </p>
      </div>
    ) : (
      <div> </div>
    );
  };
  const Tab02 = () => {
    return (
      <div className="w-[70%] mx-auto">
        <p className="font-normal">
          Chính sách trao đổi tại <span className="font-bold">BeeShoes</span>
        </p>
        <p className="text-red-600 font-semibold">
          <span className="underline">Lưu ý</span>: Trong thời gian khuyến mãi,
          thời gian giao hàng có thể lâu hơn dự kiến. Chúng tôi xin lỗi vì sự
          bất tiện này.
        </p>
        <p className="font-semibold">
          {" "}
          Sản phẩm áp dụng:{" "}
          <span className="font-normal">
            Tất cả sản phẩm được bán trên Website BeeShoes
          </span>
        </p>
        <span className="font-semibold"> Sản phẩm không áp dụng: </span>
        <p className="font-normal">Các sản phẩm tại cửa hàng BeeShoes,...</p>
        <p className="font-normal">
          Không áp dụng cho sản phẩm mua trực tiếp tại BeeShoes.
        </p>
        <p className="font-semibold">
          {" "}
          Thời gian đổi hàng:{" "}
          <span className="font-normal">
            Trong vòng 30 ngày (với sản phẩm nguyên giá) và 10 ngày (với sản
            phẩm giao ngay) kể từ ngày khách hàng nhận sản phẩm cho đến khi
            BeeShoes nhận lại sản phẩm (tính theo Postmark). Xem thêm thông tin
            tại CHÍNH SÁCH HOÀN TRẢ SẢN PHẨM
          </span>
        </p>
      </div>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-full  px-4">
      {!!inforShoe && !!dataDetailProduct && !!dataDetailProduct.length && (
        <ProductItem
          product={dataDetailProduct}
          shoeId={Number(id)}
          inforShoe={inforShoe}
        />
      )}
      <div className="w-full h-[1px] bg-gray-400" />
      <div className="w-full  mb-32 ">
        <div className="flex space-x-10 w-full justify-around mb-10">
          <button
            onClick={() => handleTabClick(0)}
            className={`px-4 ${
              activeTab === 0 ? " bg-[#f5f5f5] border-b-[1px]" : ""
            } py-2 px-4 relative group btn4 leading-none overflow-hidden w-[50%]`}
          >
            <span className=" rounded-md font-semibold px-9 text-gray-700">
              MÔ TẢ
            </span>
            <span
              className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-700  `}
            />
          </button>
          <button
            onClick={() => handleTabClick(1)}
            className={`px-4 ${
              activeTab === 1 ? " bg-[#f5f5f5] border-b-[1px]" : ""
            } py-2 px-4 relative group btn4 leading-none overflow-hidden w-[50%]`}
          >
            <span className="rounded-md font-semibold px-9 text-gray-700 ">
              CHÍNH SÁCH HOÀN TRẢ
            </span>
            <span
              className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-700  `}
            />
          </button>
        </div>
        <div className="w-full ">
          {activeTab === 0 && <Tab01 />}
          {activeTab === 1 && <Tab02 />}
        </div>
        {!!dataProductSole && !!dataProductSole.length && (
          <>
            <div className="flex items-center mt-2  ">
              <span className="text-base font-medium  uppercase  text-[#000] ">
                Các sản phẩm tương tự
              </span>
              <div className="w-10 h-[1px] bg-[#000]  ml-2 self-end " />
            </div>

            <SliderListProduct products={dataProductSole} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
