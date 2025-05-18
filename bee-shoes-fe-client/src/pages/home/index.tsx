import React, { useEffect, useState } from "react";
import SliderHome from "../../components/sliderHome/SliderHome";
import Images from "../../static";
import "./styles.css";
import TitleBrand from "../../components/TitleBrand";
import { useNavigate } from "react-router-dom";
import SliderListBrand from "../../components/SliderListBrand";
import axios from "axios";
import API from "../../api";
import { IProduct } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";
import { toSlug } from "../../utils/format";
import NavPage from "../../components/NavPage";
import SekeletonItemShoe from "../../components/SekeletonItemShoe";
import Fade from "react-reveal/Fade";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider, { Settings } from "react-slick";
import ProductStandingTop from "../../components/ProductStadingWithTop";
const Line = () => {
  return (
    <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-3 " />
  );
};
const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>();
  const [productsAll, setProductsAll] = useState<IProduct[]>();
  const [productsTop, setProductsTop] = useState<IProduct[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
  const [sekeletonItemShoeAll, setSekeletonItemShoeAll] =
    useState<boolean>(true);
  const [sekeletonItemShoeTop, setSekeletonItemShoeTop] =
    useState<boolean>(true);
  console.log("productsTop", productsTop);
  const settings: Settings = {
    dots: false,
    arrows: false,
    className: "center",
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    slidesToScroll: 1,
  };
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
  // Lấy danh sách sản phẩm
  const getDataShoes = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoe(page, 20),
    });
    setSekeletonItemShoe(true);
    if (res.status) {
      setProducts(res?.data?.data);
      setTotalPages(res?.data?.totalPages);
      setSekeletonItemShoe(false);
    }
  };
  const getAllShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoe(1, 10000),
    });
    setSekeletonItemShoeAll(true);
    if (res.status) {
      setProductsAll(res?.data?.data);
      setSekeletonItemShoeAll(false);
    }
  };
  const getDataTopSale = async () => {
    const res = await axios({
      method: "get",
      url: API.getTopSale(15),
    });
    setSekeletonItemShoeTop(true);
    if (res.status) {
      setProductsTop(res?.data);
      setSekeletonItemShoeTop(false);
    }
  };
  useEffect(() => {
    getDataShoes();
  }, [page]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getDataTopSale();
    getAllShoe();
  }, []);
  return (
    <div className=" w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden ">
      <SliderHome />
      {/* Thông tin ưu đãi */}
      <Line />
      <Fade top distance="10%" duration={3000}>
        <div className="w-full px-5 flex justify-between  ">
          <div className="flex items-center">
            <LazyLoadImage
              src="https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg"
              alt=""
              className="w-10 h-10"
            />
            <span className="text-base text-gray-600 ml-2 font-semibold ">
              Đổi mẫu, đổi size miễn phí
            </span>
          </div>
          <div className="flex items-center">
            <LazyLoadImage
              src="https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg"
              alt=""
              className="w-10 h-10"
            />
            <span className="text-base text-gray-600 ml-2 font-semibold ">
              Mua trước, trả sau miễn lãi
            </span>
          </div>
          <div className="flex items-center">
            <LazyLoadImage
              src="https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg"
              alt=""
              className="w-10 h-10"
            />
            <span className="text-base text-gray-600 ml-2 font-semibold ">
              Giao hàng, đổi trả tận nhà
            </span>
          </div>
          <div className="flex items-center">
            <LazyLoadImage
              src="https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg"
              alt=""
              className="w-10 h-10"
            />

            <span className="text-base text-gray-600 ml-2 font-semibold ">
              Hàng giả, đền tiền gấp đôi
            </span>
          </div>
        </div>
      </Fade>
      <Line />
      {!!productsTop && !!productsTop.length && (
        <>
          <div className="flex flex-col items-center">
            <p className=" text-2xl font-semibold text-center uppercase   ">
              TOP NHỮNG SẢN PHẨM BÁN CHẠY
            </p>
            <span className="text-[#999] italic  text-sm font-semibold   uppercase mb-5 "></span>
          </div>
          {productsTop?.length >= 6 ? (
            <div className="w-full flex mx-auto ">
              <button onClick={() => prev()}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdUlEQVR4nO2ay2sTURTGf8XaRBRrU6PiSpdSUf8KbfFV3al1p9SNtVS3PtbVlVDo36EUUVEpqFgftQGxvrrysRDrzrRFJXLwGzhokiaTmcm09IOBtPfOdx/n3HPP/e7ACpYvckAvcBUYA94A34EFPfZ7WmVW5zDQQUqQBU4Cd4DfQKnO5xdwG+gDMs0YwBrgPPDFdWoeuA9clGV2aMZX6+nQ/6zsEvBA7wTvfwaGNDmJYD8w4zrwDDgFtIfg2gCcBp47vg9ADzHCZmrUNfgC2Bshfzfw0vGPxGGdLeq4NfADOAusiroR/nKeA4rO2pujIt8uc5cUdXYSP3YBb9Xme/WhIeQd4VNgI8mhA3iotmfkFaGQde70GFhL8lgLPHFuFmrNjDp3ss2uWeh0XmEBoO4QGyzsJNZELWumqD5ZdKt5swv2CYtOacGgW/w1udgFt09EGWJtsRbE2xLi/VZgSn2zQVVF1qUdeyMexLR4bTBh0SOOT4vlZn0uQsQxiOlGwih/LRlE0uPVKt5VJcudooDtyq/EaWn91gg4+8V3q1KFnNLq+ZAJYJyW+HejtPPNz0r9PKJG75FOS3iMi/sgZXBNhXaeSKMlPK6If5gyGFPhIdJriX+95wZl8E6FdopLqyUCdLnJ+g+zKsyl2BIBNqqtr5TBggrbqB+FhCwRION0guU7kNkGXGuTc623CbhWvpprLZvFPqZCUwDDIinLHK0WfoMN0cSzJb0h9qrQ1MJGEbdlxsV9oFIyFiSNpgCSUsvkXNK4vlKl22rYZExSapkz4rM1XREnVMm02LQerCbFdWyxo+5nVdxHPIOxc3dY7BfHx1quIYZUeTIG8WFKghshxYeC+jZQywtZp/WaoJwWDLm1lqlXrShKHGs29gBzYdWdETcDJls2C3mJctaX62EIspKFSvLrZojY64AJ9WGikXvGvBKz4FrB/k4KOeCRu45r+MJnuzOtudluklkT79WmZeXboiLe7NysKO3VwmHUaFV0mnPuZNlBpMi6ABBsbFHdvrZosys4/utx3713O7MHqn1/yK8YcsqdgrSjJFeKUkBf1DqDUsWDDiwovb4s3alLYbtNT6cujY6qzrjTCYK0Y6BZX0BkpIrf0hGg3k84fiqLPdasAZRDu7RYO7XdVJL4zX1UY79f63g6rLoVzxMrYInjDz+3Tj/tKuNyAAAAAElFTkSuQmCC" />
              </button>
              <div className="w-[95%] mx-auto ">
                <Slider {...settings} ref={sliderRef}>
                  {!!productsTop && !!productsTop.length
                    ? productsTop.map((item, index) => {
                        if (item.status === true) {
                          return;
                        }
                        return (
                          <div key={index}>
                            <ProductStandingTop
                              product={item}
                              key={index}
                              checkTop={true}
                            />
                          </div>
                        );
                      })
                    : !!sekeletonItemShoeTop &&
                      sekeletonItemShoeTop === true &&
                      Array(10)
                        .fill({})
                        .map((item, index) => {
                          return (
                            <div key={index}>
                              <SekeletonItemShoe />
                            </div>
                          );
                        })}
                  {/* </div> */}
                </Slider>
              </div>
              <button
                onClick={() => {
                  next();
                }}
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeElEQVR4nO2ay08UQRDGf0Rk12hUFhDiSY9Go/4VisEnNxVvGryIBr36OKMnExP+Dg0haNSQqBEfCMb45uTjYMSbCEGzpuI3SUV3YXe2Z3YgfskkC9Vd3T1VXV319cB/LF8UgIPAZWAIeA18A+b02O9XklmbA0AzGUEeOAbcBH4BxSqfn8AI0APk6rGAVcBZ4LOb1CxwBzgvy2zRG1+pp1n/M9kF4K76RP0/Af16OamgC5hyE3gMHAfWxdC1HjgBPHH63gN7SBD2pgbdgE+BXQH1dwLPnP5rSVinQxO3Ab4Dp4AVoQfhj87TwIyzdnso5Ztl7qKizjaSx3bgjcZ8pznUhDan8BHQSnpoBu5p7Cl5RSzknTs9AFaTPlYDD52bxdozg86d7LCrF1qcV1gAqDrERhs7jT1RyZ6Z0ZwsulV82EXnhEWnrOCM2/wVudg5d07EDbHmzxO1bNASaJTOoha1IPIu7ajlsJtw+yvkYvZI78fFcrMeFyFqQYcWEXoxDS6SHlmo4S01stypVmwAXkifRZ2NhEGvdA6Xa1BQWj0bMwFMyzLNqm/my83zkAa8TVgkYZlR6dtXSnhFQqsnQiO0ZS5J10Ap4ZCE+0kGIS1zSHqulxK+ldCquKQQyjJbpcN4gX8wLWHSeVUIy7Sq/5dSwjkJm0ge3jKTMfrnHE+QmYVYFhB0IdMpuVa7c63XMV2rbSHXWjabfUhCYwCzaokI3QuF3+hANPJsSR+IByU0tjCrlvg7RdlLmWQsShqNAcxq0lhwSePaco1GNKjRmFm0hOGkdNqeLoujamRcbFYLq3HpPbxYqftJDXfXMODzhErdLun9UMk1RL8aj8ckH6JyNAnyYVJz66ukQ95xvUYoZwX9LtHMVctWzIgcqzd2Aj/isjvX3Bsw2rJeaBMpZ3O5GkdBXrRQUURyPUjsNcCY5jBWyz1jm86A6FrB/k4LBeC+u46r+cJnszOtudkO0tkT7zSmZeWbQilud242I+7VwmFoNCo6/XDuZKVxUORdAIgqu1C3rw067Cad/qtJ3713OrNHrH1vzK8YCsqdorSjKFcKeVu8qHXOiBWPJjCn9PqieKetCttNelp0adStNqOOJ4jSjr56fQGREys+rBKg2k845pXFHq7XAkphnbhYq9puKGH86j6qsd8vVZ4OqG3ZeuI/WOL4DcGhTkEx2L2DAAAAAElFTkSuQmCC" />{" "}
              </button>
            </div>
          ) : (
            <div className="w-full flex mx-auto ">
              <div className="grid grid-cols-5 gap-0 ">
                {!!productsTop && !!productsTop.length
                  ? productsTop.map((item, index) => {
                      if (item.status === true) {
                        return;
                      }
                      return (
                        <div key={index}>
                          <ProductStandingTop
                            product={item}
                            key={index}
                            checkTop={true}
                          />
                        </div>
                      );
                    })
                  : !!sekeletonItemShoeTop &&
                    sekeletonItemShoeTop === true &&
                    Array(10)
                      .fill({})
                      .map((item, index) => {
                        return (
                          <div key={index}>
                            <SekeletonItemShoe />
                          </div>
                        );
                      })}
              </div>
            </div>
          )}
        </>
      )}

      <Line />
      {!!productsAll && !!productsAll.length && (
        <div className="flex flex-col items-center">
          <p className=" text-2xl font-semibold text-center uppercase   ">
            Sản phẩm đang sale
          </p>
        </div>
      )}
      <div className="w-full p-4 ">
        <div className="grid grid-cols-5 gap-0 ">
          {!!productsAll &&
          !!productsAll.length &&
          sekeletonItemShoeAll === false
            ? productsAll.map((item, index) => {
                if (item?.status === true) {
                  return;
                } else {
                  return !!item.discountValue ? (
                    <div key={index}>
                      <ProductStanding product={item} key={index} />
                    </div>
                  ) : (
                    <></>
                  );
                }
              })
            : !!sekeletonItemShoeAll &&
              sekeletonItemShoeAll === true &&
              Array(10)
                .fill({})
                .map((item, index) => {
                  return (
                    <div key={index}>
                      <SekeletonItemShoe />
                    </div>
                  );
                })}
        </div>
      </div>
      <Line />
      {!!products && !!products.length && (
        <div className="flex flex-col items-center">
          <p className=" text-2xl font-semibold  text-center uppercase   ">
            SẢN PHẨM NỔI BẬT
          </p>
        </div>
      )}
      <div className="w-full p-4 ">
        <div className="grid grid-cols-5 gap-0 ">
          {!!products && !!products.length && sekeletonItemShoe === false
            ? products.map((item, index) => {
                if (!item.quantity || item.status === true) {
                  return;
                } else {
                  return (
                    <div key={index}>
                      <ProductStanding product={item} key={index} />
                    </div>
                  );
                }
              })
            : !!sekeletonItemShoe &&
              sekeletonItemShoe === true &&
              Array(10)
                .fill({})
                .map((item, index) => {
                  return (
                    <div key={index}>
                      <SekeletonItemShoe />
                    </div>
                  );
                })}
        </div>
        {totalPages === 1 ? (
          ""
        ) : (
          <NavPage page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>

      {/* Tin tức nổi bật */}
      <div className=" w-full pt-5 mt-3">
        <p className=" text-3xl font-semibold text-center uppercase mt-5 ">
          ------- Tin tức nổi bật -------
        </p>
        <p className="text-[#999] italic  text-sm font-semibold  text-center uppercase ">
          Tin tức mới nhất và thú vị nhất
        </p>
        <Fade top distance="10%" duration={3000}>
          <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
              <div className="lg:flex items-stretch ">
                <div className="lg:w-1/2">
                  <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                    <div className="sm:w-1/2 relative  group ">
                      <div>
                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                          12 April 2021
                        </p>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h2 className="text-xl font-semibold  5 text-white line-clamp-2">
                            NIKE ADAPT BB – ĐÔI GIÀY CÔNG NGHỆ ĐẾN TỪ TƯƠNG LAI
                          </h2>
                          <p className="text-base leading-4 text-white mt-2 line-clamp-2">
                            Nike luôn khẳng định được vị thế của mình trong làng
                            thời trang giày khi liên tục đưa ra những mẫu giày
                            thời trang độc đáo cũng như những mẫu giày công nghệ
                            cực đỉnh. Mới đây nhất chính là mẫu Nike Adapt BB
                            với công nghệ tự thắt dây mới.
                          </p>
                          <a
                            href="#"
                            className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                          >
                            <p className="pr-2 text-sm font-medium leading-none">
                              Read More
                            </p>
                            <svg
                              className="fill-stroke"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.75 12.5L10.25 8L5.75 3.5"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <LazyLoadImage
                        src={Images.banner05}
                        className="w-full h-[257px] group-hover:scale-110 transition-transform duration-300  object-cover"
                        alt="chair"
                      />
                    </div>
                    <div className="sm:w-1/2 sm:mt-0 mt-4 relative group">
                      <div>
                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                          12 April 2021
                        </p>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h2 className="text-xl font-semibold  5 text-white  line-clamp-2">
                            GIẢI MÃ SỨC HÚT CỦA ĐÔI GIÀY CỔ ĐIỂN ADIDAS
                          </h2>
                          <p className="text-base leading-4 text-white mt-2  line-clamp-2">
                            Dạo gần đây, Adidas cho ra mắt mẫu giày Adidas
                            Supercourt kết hợp với
                          </p>
                          <a
                            href="#"
                            className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                          >
                            <p className="pr-2 text-sm font-medium leading-none">
                              Read More
                            </p>
                            <svg
                              className="fill-stroke"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.75 12.5L10.25 8L5.75 3.5"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <LazyLoadImage
                        src={Images.banner03}
                        className="w-full object-cover h-[257px] group-hover:scale-110 transition-transform duration-300"
                        alt="wall design"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <div>
                      <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 md:p-10 p-6">
                        <h2 className="text-xl font-semibold  5 text-white ">
                          NHỮNG LẦM TƯỞNG MÀ HẦU HẾT NGƯỜI VIỆT
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          Dive into minimalism
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <LazyLoadImage
                      src={Images.banner04}
                      alt="sitting place"
                      className="w-full mt-8 md:mt-6 hidden sm:block  h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
                  <div className="relative group">
                    <div>
                      <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 md:p-10 p-6">
                        <h2 className="text-xl font-semibold  5 text-white">
                          The Decorated Ways
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          Dive into minimalism
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <LazyLoadImage
                      src={Images.bannerAdidas}
                      alt="sitting place"
                      className="w-full sm:block hidden h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                    <div className="relative w-full group">
                      <div>
                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                          12 April 2021
                        </p>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h2 className="text-xl font-semibold  5 text-white">
                            The Decorated Ways
                          </h2>
                          <p className="text-base leading-4 text-white mt-2">
                            Dive into minimalism
                          </p>
                          <a
                            href="#"
                            className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                          >
                            <p className="pr-2 text-sm font-medium leading-none">
                              Read More
                            </p>
                            <svg
                              className="fill-stroke"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.75 12.5L10.25 8L5.75 3.5"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <LazyLoadImage
                        src="https://i.ibb.co/3yvZBpm/img-5.png"
                        className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
                        alt="chair"
                      />
                    </div>
                    <div className="relative w-full sm:mt-0 mt-4 group">
                      <div>
                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                          12 April 2021
                        </p>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h2 className="text-xl font-semibold  5 text-white">
                            The Decorated Ways
                          </h2>
                          <p className="text-base leading-4 text-white mt-2">
                            Dive into minimalism
                          </p>
                          <a
                            href="#"
                            className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                          >
                            <p className="pr-2 text-sm font-medium leading-none">
                              Read More
                            </p>
                            <svg
                              className="fill-stroke"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.75 12.5L10.25 8L5.75 3.5"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <LazyLoadImage
                        src="https://i.ibb.co/gDdnJb5/img-6.png"
                        className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
                        alt="wall design"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default HomePage;
