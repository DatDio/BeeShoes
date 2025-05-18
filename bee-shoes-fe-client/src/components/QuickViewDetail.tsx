import React, { useEffect, useMemo, useState } from "react";
import { IDetailProduct, IProduct, Product } from "../types/product.type";
import Slider from "react-slick";
import { convertToCurrencyString, findProductIdByName } from "../utils/format";
import { useNavigate } from "react-router-dom";
import API from "../api";
import axios from "axios";
import { useShoppingCart } from "../context/shoppingCart.context";
import { toast } from "react-toastify";
import Images from "../static";

const QuickViewDetail = ({
  product,
  setShowQuickView,
}: {
  product: IProduct;
  setShowQuickView: any;
}) => {
  const navigate = useNavigate();
  console.log(product);
  const {
    getItemQuantity,
    openCart,
    addMultipleToCart,
    userPrf,
    addToCartUser,
  } = useShoppingCart();
  const [chooseSize, setChooseSize] = useState<any>();
  const [chooseColor, setChooseColor] = useState<any>();
  const [dataDetailProduct, setDataDetailProduct] =
    useState<IDetailProduct[]>();
  const [price, setPrice] = useState<number | undefined>(0);
  const [amountShoe, setAmountShoe] = useState<number>(0);
  const [idAddToCart, setIdAddToCart] = useState<number>(0);
  const [code, setCode] = useState<string>();
  const [sale, setSale] = useState<boolean>();
  const [priceSale, setPriceSale] = useState<boolean>();
  const [amount, setAmount] = useState(1);
  const [chooseSizeName, setChooseSizeName] = useState<string | number>();
  const [chooseColorName, setChooseColorName] = useState<string>();
  const [allSizeData, setAllSizeData] = useState<Product[]>([]);
  const [allColorData, setAllColorData] = useState<Product[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const imageArray = product.images ? product.images.split(",") : [];
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowQuickView(false);
  };
  const getInfoDetailProduct = async () => {
    try {
      if (!!product?.id) {
        const res = await axios({
          method: "get",
          url: API.getShoeDetail(Number(product.id)),
        });
        if (res.status) {
          setDataDetailProduct(res?.data?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataSize = async () => {
    if (!!dataDetailProduct) {
      try {
        const response = await axios.get(API.getSizeAll());
        if (response.status) {
          setAllSizeData(response.data.data);
          setChooseSize(
            findProductIdByName(dataDetailProduct[0]?.size, allSizeData)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getDataColor = async () => {
    if (!!dataDetailProduct) {
      try {
        const response = await axios.get(API.getAllColors());
        if (response.status) {
          setAllColorData(response?.data?.data);
          setChooseColor(
            findProductIdByName(dataDetailProduct[0]?.color, allColorData)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getPriceDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getPriceDetailShoe(product?.name, chooseSize, chooseColor),
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

  useEffect(() => {
    if (dataDetailProduct) {
      getDataSize();
      getDataColor();
    }
  }, [dataDetailProduct]);
  useEffect(() => {
    if (!!dataDetailProduct && dataDetailProduct.length > 0) {
      setChooseSize(
        findProductIdByName(dataDetailProduct[0]?.size, allSizeData)
      );
      setChooseSizeName(dataDetailProduct[0]?.size);
      setChooseColor(
        findProductIdByName(dataDetailProduct[0]?.color, allColorData)
      );
      setChooseColorName(dataDetailProduct[0]?.color);
    }
  }, [product, allSizeData, allColorData]);
  useEffect(() => {
    if (chooseColor && chooseSize) {
      getPriceDetailShoe();
    }
  }, [product.name, chooseSize, chooseColor]);
  const amountItemInCart = getItemQuantity(idAddToCart);
  const uniqueSizes = useMemo(() => {
    if (!!dataDetailProduct && dataDetailProduct.length > 0) {
      const sizes: any[] = [];
      for (let i = 0; i < dataDetailProduct.length; i++) {
        const size = dataDetailProduct[i].size;
        if (!sizes.includes(size)) {
          sizes.push(size);
        }
      }
      return sizes;
    }
  }, [dataDetailProduct]);
  const uniqueColors = useMemo(() => {
    if (!!dataDetailProduct && dataDetailProduct.length > 0) {
      const colors: any[] = [];
      for (let i = 0; i < dataDetailProduct.length; i++) {
        const color = dataDetailProduct[i].color;
        if (!colors.includes(color)) {
          colors.push(color);
        }
      }
      return colors;
    }
  }, [dataDetailProduct]);
  const imgArr = useMemo(() => {
    if (!!dataDetailProduct && dataDetailProduct.length > 0) {
      const arr = [];
      for (let i = 0; i < dataDetailProduct.length; i++) {
        arr.push(
          dataDetailProduct[i].images
            ? dataDetailProduct[i].images.split(",")
            : []
        );
      }

      return arr.flat();
    }
    return [];
  }, [dataDetailProduct]);
  useEffect(() => {
    getInfoDetailProduct();
  }, [product.id]);
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-10    ">
        <div className="w-full h-full" onClick={handleCloseClick as any}></div>
        <div className="bg-white  shadow-lg h-screen w-[25%]  transform  transition-transform ease-in-out   ">
          <div className="flex justify-between items-center px-4 pt-4 mb-2  top-0 bg-white  w-full ">
            <h2 className="text-lg font-semibold  uppercase   ">XEM NHANH</h2>
            <div onClick={handleCloseClick as any} className="cursor-pointer">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
            </div>
          </div>
          <div className="w-full bg-gray-500 h-[1px]  " />

          <div className="w-full overflow-y-auto max-h-[550px] mt-2">
            <div className="flex mx-2 ">
              <div className="w-[30%]">
                <Slider {...settings}>
                  {imgArr?.map((item, index) => {
                    return (
                      <img
                        src={!!item ? item : Images.imgNotFound}
                        className="h-auto w-[170px]  "
                        key={index}
                      />
                    );
                  })}
                </Slider>
              </div>

              <div className="ml-[10%] w-full flex flex-col justify-start relative">
                <div className="flex justify-center ">
                  <p className="text-base font-medium line-clamp-2 w-full">
                    {product.name}
                  </p>
                  {sale && dataDetailProduct && amountShoe > 0 && (
                    <div className="bg-red-500 px-3 h-fit  flex relative rounded-sm ">
                      <span className="text-white font-sm">-{sale}%</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-normal line-clamp-2">
                    {product.brand}-{product.category}
                  </p>
                </div>
                {!!!!price && (
                  <span className="font-normal text-[11px]">
                    Số lượng còn: {amountShoe}
                  </span>
                )}
                {status === true ? (
                  <span className="text-red-500 font-semibold text-lg  ">
                    Sản phẩm ngừng kinh doanh
                  </span>
                ) : !!price && !!priceSale && amountShoe > 0 ? (
                  <>
                    <span className="text-red-500 font-semibold text-sm  ">
                      {convertToCurrencyString(Number(priceSale))}
                    </span>
                    <span className="text-gray-500 font-semibold text-base   line-through ">
                      {convertToCurrencyString(Number(price))}
                    </span>
                  </>
                ) : !!price && !priceSale && amountShoe > 0 ? (
                  <span className="text-red-500 font-semibold text-sm  ">
                    {convertToCurrencyString(Number(price))}
                  </span>
                ) : (
                  "Sản phẩm hiện hết hàng"
                )}
              </div>
            </div>
            <div className="w-full  px-5">
              <span className="text-sm font-semibold ">Chọn kích thước</span>
              <div className="flex items-center w-full flex-wrap mt-2">
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
                            setChooseColor(
                              findProductIdByName(e, allColorData)
                            );
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
              <span className="text-sm font-semibold ">Chọn số lượng :</span>

              <div className="flex flex-row  w-full ">
                <div className="w-[10%] border-l-[1px] border-t-[1px] border-b-[1px] border-[#e9e9e9]  flex items-center justify-center">
                  <span className=" px-3 rounded-lg w-8">{amount}</span>
                </div>
                <div className="flex flex-col">
                  <button
                    className="w-8  h-[50%]  border-[1px] border-[#e9e9e9] "
                    onClick={() => {
                      if (
                        (amountShoe <= amountItemInCart + amount &&
                          !!price &&
                          amount <= 10) ||
                        amount > 10
                      ) {
                        toast("Số lượng thêm đã đạt tối đa");
                        return;
                      } else if (!price) {
                        toast(
                          "Sản phẩm hiện hết hàng, vui lòng bạn chọn sản phẩm khác"
                        );
                        return;
                      } else {
                        setAmount((prev) => prev + 1);
                      }
                    }}
                  >
                    <span className="leading-[5px]">+</span>
                  </button>
                  <button
                    className="w-8 h-[50%] border-[1px] border-[#e9e9e9] "
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
          </div>
          <div className=" flex justify-around items-center my-5 ">
            <button
              className="border-gray-300 border-[1px] px-3 py-2 rounded font-medium w-[45%] hover:border-gray-500"
              onClick={() => {
                if (
                  !!product.minPrice &&
                  !!product.maxPrice &&
                  product.images &&
                  !!product.quantity &&
                  product.images.length > 0
                ) {
                  navigate(`/product/${product.id}`);
                } else {
                  return;
                }
              }}
            >
              Xem chi tiết
            </button>
            <button
              className={`cursor-pointer  text-white   flex  items-center justify-center  rounded font-medium  px-3 py-2 w-[45%]
                ${!!price ? "bg-[#0161e7]" : "bg-[#5ae0d7]"}
                `}
              onClick={() => {
                if (userPrf) {
                  addToCartUser(idAddToCart, amount);
                  setShowQuickView(false);
                  openCart();
                } else {
                  if (
                    !!idAddToCart &&
                    !!price &&
                    amountShoe >= amountItemInCart + amount &&
                    amountItemInCart <= 10
                  ) {
                    setShowQuickView(false);
                    addMultipleToCart(idAddToCart, amount);
                    // openCart();
                    setAmount(1);
                    toast.success("Thêm thành công ");
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
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDetail;
