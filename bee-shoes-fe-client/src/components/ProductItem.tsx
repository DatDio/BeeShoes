import React, { useEffect, useState, useMemo } from "react";
import { IDetailProduct, IInforShoe, Product } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
import axios from "axios";
import API from "../api";
import { convertToCurrencyString, findProductIdByName } from "../utils/format";
import { useShoppingCart } from "../context/shoppingCart.context";
import ModalComponent from "./Modal";
import Images from "../static";
import MyReactImageMagnify from "./ReactImageMagnify";
import { toast } from "react-toastify";
import { getTokenCustomer } from "../helper/useCookie";

const ProductItem = ({
  product,
  shoeId,
  inforShoe,
}: {
  inforShoe: IInforShoe;
  product: IDetailProduct[];
  shoeId: number;
}) => {
  const navigate = useNavigate();
  const {
    getItemQuantity,
    openCart,
    addMultipleToCart,
    userPrf,
    addToCartUser,
    getItemQuantityUser,
  } = useShoppingCart();
  const [chooseSize, setChooseSize] = useState<any>();
  const [chooseColor, setChooseColor] = useState<any>();
  const [chooseSizeName, setChooseSizeName] = useState<string | number>();
  const [chooseColorName, setChooseColorName] = useState<string>();
  const [amount, setAmount] = useState(1);
  const [allSizeData, setAllSizeData] = useState<Product[]>([]);
  const [allColorData, setAllColorData] = useState<Product[]>([]);
  const [price, setPrice] = useState<number | undefined>(0);
  const [amountShoe, setAmountShoe] = useState<number>(0);
  const [priceSale, setPriceSale] = useState<boolean>();
  const [sale, setSale] = useState<boolean>();
  const [idAddToCart, setIdAddToCart] = useState<number>(0);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [code, setCode] = useState<string>();
  const [status, setStatus] = useState<boolean>(false);
  const getDataSize = async () => {
    try {
      const response = await axios.get(API.getSizeAll());
      if (response.status) {
        setAllSizeData(response.data.data);
        setChooseSize(findProductIdByName(product[0]?.size, allSizeData));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getDataColor = async () => {
    let currentPage = 1;
    try {
      const response = await axios.get(API.getAllColors());
      if (response.status) {
        setAllColorData(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
    setChooseColor(findProductIdByName(product[0]?.color, allColorData));
  };
  const getPriceDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getPriceDetailShoe(inforShoe?.name, chooseSize, chooseColor),
    });
    if (res.status) {
      if (res?.data?.totalPages === 0) {
        setPrice(0);
      }
      if (res?.data?.data[0]?.price) {
        setPrice(res?.data?.data[0].price);
        setAmountShoe(res?.data?.data[0].quantity);
        setIdAddToCart(res?.data?.data[0].id);
        setCode(res?.data.data[0].code);
        setSale(res?.data?.data[0].discountPercent);
        setPriceSale(res?.data?.data[0].discountValue);
        setStatus(res?.data?.data[0].status);
      }
    }
  };
  const imgArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < product.length; i++) {
      arr.push(product[i].images ? product[i].images.split(",") : []);
    }

    return arr;
  }, [product]);
  const uniqueColors = useMemo(() => {
    const colors: any[] = [];
    for (let i = 0; i < product.length; i++) {
      const color = product[i].color;
      if (!colors.includes(color)) {
        colors.push(color);
      }
    }
    return colors;
  }, [product]);
  const uniqueSizes = useMemo(() => {
    const sizes: any[] = [];
    for (let i = 0; i < product.length; i++) {
      const size = product[i].size;
      if (!sizes.includes(size)) {
        sizes.push(size);
      }
    }
    return sizes;
  }, [product]);
  useEffect(() => {
    getDataSize();
    getDataColor();
  }, []);
  useEffect(() => {
    setChooseSize(findProductIdByName(product[0]?.size, allSizeData));
    setChooseSizeName(product[0]?.size);
    setChooseColor(findProductIdByName(product[0]?.color, allColorData));
    setChooseColorName(product[0]?.color);
  }, [product, allSizeData, allColorData]);
  useEffect(() => {
    if (chooseColor && chooseSize) {
      getPriceDetailShoe();
    }
  }, [inforShoe.name, chooseSize, chooseColor]);
  const amountItemInCart = getItemQuantity(idAddToCart);
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex   justify-between lg:flex-row gap-16   infoShoe">
        <div className="flex flex-row gap-3 lg:w-[50%] slideImg">
          <MyReactImageMagnify img={imgArr} />
        </div>
        {/* Thong tin */}
        <div className="flex flex-col gap-2 lg:w-[50%] infoShoe2  ">
          <div className="font-medium">
            <span
              className="cursor-pointer  text-xs  text-[#909097] "
              onClick={() => {
                navigate(path.home);
              }}
            >
              Trang chủ
            </span>{" "}
            /
            <span className="text-xs  text-[#909097]">
              {inforShoe?.brand.name}
            </span>
            / <span className="text-[#000] text-xs ">{inforShoe?.name}</span>
          </div>
          <span className="text-3xl font-medium text-black  ">
            {inforShoe?.name}
          </span>
          <div className="flex items-center">
            {status === true ? (
              <span className="text-red-500 font-semibold text-lg  ">
                Sản phẩm ngừng kinh doanh
              </span>
            ) : !!price && !!priceSale && amountShoe > 0 ? (
              <>
                <span className="text-red-500 font-semibold text-lg  ">
                  {convertToCurrencyString(Number(priceSale))}
                </span>
                <span className="text-gray-500 font-semibold text-base   line-through ml-2 ">
                  {convertToCurrencyString(Number(price))}
                </span>
                <span className="bg-[#ee4d2d] text-white font-medium ml-10 px-1 rounded">
                  Giảm {sale}%
                </span>
              </>
            ) : !!price && !priceSale && amountShoe > 0 ? (
              <span className="text-red-500 font-semibold text-lg  ">
                {convertToCurrencyString(Number(price))}
              </span>
            ) : (
              <span className="font-semibold"> Sản phẩm hiện hết hàng</span>
            )}
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-semibold ">Chọn kích thước</span>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nO2Uy0rDUBCGTxfudCcFBcUZQUFw5QuIC8G9guuCM6EvYEEUQUF3PoRvIF7eQRdeXqLYzARb3Gpk0qSm2JpEGgRx4CyS+fm/MxeOc38y0GtWkfQYWe6R5bz3nzW0k/d7YADpFrB2EjGy3o4MACybSPLWFcrFPPurKxSO5TX4Nh+1heUlElHQKGzgMvLAepTcPK8BFmkRkjxY0tpSDoD11ZJL9edxV0ZAvDmLNX+iFACSPBpgjmQ9WxssA0sLOKjnB7CcxEO+zNICyVWsPcgNmKn500Da7q6p7DsXVr6qwkrqIrpAncncgKgKT7eR5d0MgOUGd3TDhm4HPX8NWK6TTQGWvULmaUivEh50RK3CT5AeFobMUmsqfuyekCSwFQbWu8jYa1aji6SgP4JkVkq62w+R03/I0LAZ9C3CkNd4ZBAgbbsyAilomDmwnpUC+JX4AHXtSTRt48bdAAAAAElFTkSuQmCC" />
              <span className="underline text-[#2267ed] text-sm font-semibold">
                Hướng dẫn chọn size
              </span>
            </div>
          </div>
          <div className="flex items-center w-full flex-wrap ">
            {!!uniqueSizes &&
              uniqueSizes.map((e, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setAmount(1);
                      setChooseSize(findProductIdByName(e, allSizeData));
                      setChooseSizeName(e);
                    }}
                    className={`min-w-[50px] text-center cursor-pointer px-1 py-[4px] mx-2 border-solid border-[1px] border-gray-400 rounded mb-1 ${
                      chooseSizeName === e ? "bg-gray-600  text-[#fff]" : ""
                    }`}
                  >
                    {e}
                  </div>
                );
              })}
          </div>
          <span className="text-sm font-semibold ">Chọn màu sắc :</span>
          <div className="flex w-full items-center">
            <div className="flex items-center  flex-wrap">
              {!!uniqueColors &&
                uniqueColors.map((e, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setAmount(1);
                        setChooseColor(findProductIdByName(e, allColorData));
                        setChooseColorName(e);
                      }}
                      className={` min-w-[50px] text-center cursor-pointer px-1 py-[4px] mx-2 border-solid border-[1px] border-gray-400  mb-1 rounded
            
            ${chooseColorName === e ? "bg-gray-600  text-[#fff]" : ""}`}
                    >
                      {e}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-row items-center gap-10 mr-10">
              <div className="flex flex-row  ">
                <div className=" border-l-[1px] border-t-[1px] border-b-[1px] border-[#e9e9e9] w-full flex items-center justify-center">
                  <span className=" px-3 rounded-lg w-8">{amount}</span>
                </div>
                <div className="flex flex-col">
                  <button
                    className="w-8   h-[50%]  border-[1px] border-[#e9e9e9] cursor-pointer"
                    onClick={() => {
                      if (!!userPrf) {
                        if (
                          amount >= 10 ||
                          (amountShoe <=
                            getItemQuantityUser(idAddToCart) + amount &&
                            amount < 10) ||
                          getItemQuantityUser(idAddToCart) + amount >= 10
                        ) {
                          toast.warning("số lượng thêm đã đạt tối đa");
                          return;
                        } else {
                          setAmount((prev) => prev + 1);
                        }
                      } else if (!userPrf) {
                        if (
                          amount >= 10 ||
                          (amountShoe <= amountItemInCart + amount &&
                            amount < 10) ||
                          amountItemInCart + amount >= 10
                        ) {
                          toast.warning("số lượng thêm đã đạt tối đa ");
                          return;
                        } else {
                          setAmount((prev) => prev + 1);
                        }
                      }
                    }}
                  >
                    <span className="leading-[5px]">+</span>
                  </button>
                  <button
                    className="w-8 h-[50%] border-[1px] border-[#e9e9e9]  cursor-pointer"
                    onClick={() => {
                      setAmount((prev) => {
                        if (prev > 1) {
                          return prev - 1;
                        } else {
                          return 1;
                        }
                      });
                    }}
                  >
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div
                className={`cursor-pointer  text-white font-semibold  flex  items-center justify-center  w-[49%] 
                ${
                  !!amountShoe && amountShoe > 0
                    ? "bg-[#0161e7]"
                    : "bg-[#0161e767]"
                }
                `}
                onClick={() => {
                  if (!!userPrf && amountShoe) {
                    if (idAddToCart) addToCartUser(idAddToCart, amount);
                    setAmount(1);
                    // openCart();
                  } else if (!userPrf) {
                    if (
                      !!idAddToCart &&
                      !!price &&
                      price > 0 &&
                      amountShoe >= amountItemInCart + amount &&
                      amountItemInCart <= 10 &&
                      amountItemInCart + amount <= 10
                    ) {
                      addMultipleToCart(idAddToCart, amount);
                      setAmount(1);
                      toast.success("Thêm thành công ");
                      // openCart();
                    } else if (
                      (!!price &&
                        price > 0 &&
                        amount < amountShoe - amountItemInCart) ||
                      amount >= 10
                    ) {
                      toast.warning("Số lượng thêm đã đạt tối đa ");
                      return;
                    } else {
                      toast.warning("Bạn cần chọn sản phẩm khác");
                    }
                  } else {
                    toast.warning("Bạn cần chọn sản phẩm khác");
                  }
                }}
              >
                <span>Thêm vào giỏ hàng</span>
              </div>

              <button
                className={`bg-[#fe662b] text-white font-semibold  w-[49%] 
                ${!!price && amountShoe > 0 ? "bg-[#fe662b]" : "bg-[#fe672b58]"}
              `}
                onClick={() => {
                  if (!!userPrf && amountShoe) {
                    if (idAddToCart) addToCartUser(idAddToCart, amount);
                    setAmount(1);
                    navigate(path.payMentWithUser);
                  } else {
                    if (
                      !!idAddToCart &&
                      !!price &&
                      amountShoe >= amountItemInCart + amount &&
                      amountItemInCart <= 10
                    ) {
                      addMultipleToCart(idAddToCart, amount);
                      toast.success("Thêm thành công ");
                      setAmount(1);
                      navigate(path.payment);
                    } else if (
                      (!!price && amount < amountShoe - amountItemInCart) ||
                      amount >= 10
                    ) {
                      toast.warning("Sản phẩm đã tối đa trong giỏ hàng");
                      return;
                    } else {
                      toast.warning("Bạn cần chọn sản phẩm khác");
                    }
                  }
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300" />
          <div className="flex justify-between">
            <span className="font-semibold text-sm">
              Mã <br />
              <span className="font-normal text-sm">{!!price ? code : ""}</span>
            </span>
            <span className="font-semibold text-sm">
              Danh mục <br />
              <span className="font-normal ">
                {!!price ? inforShoe?.category?.name : ""}
              </span>{" "}
            </span>
            <span className="font-semibold text-sm">
              Thương hiệu <br />
              <span className="font-normal ">
                {!!price ? inforShoe?.brand?.name : ""}
              </span>{" "}
            </span>
          </div>
          <div className="h-8">
            {!!amountShoe && amountShoe > 0 && !!price && (
              <span className="font-semibold text-sm">
                Số lượng hàng có sẵn :{" "}
                <span className="font-normal ">{amountShoe}</span>{" "}
              </span>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalComponent
          check={false}
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <section className="bg-gray-50 ">
            <img
              src={Images.tableSize}
              alt=""
              className="w-full h-auto object-contain"
            />
          </section>
        </ModalComponent>
      )}
    </div>
  );
};

export default ProductItem;
