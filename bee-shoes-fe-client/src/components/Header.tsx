import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../static";
import path from "../constants/path";
import axios from "axios";
import { IDataNoti, IProduct, Product } from "../types/product.type";
import FormLogin from "../pages/loginAndRegister";
import { toSlug } from "../utils/format";
import { useShoppingCart } from "../context/shoppingCart.context";
import API from "../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCookie } from "../helper/CookiesRequest";
import Fade from "react-reveal/Fade";
const Header = () => {
  const navigate = useNavigate();
  const { cartQuantity, openCart, cartItems, userPrf, listProducts, infoUser } =
    useShoppingCart();
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showModalNoti, setShowModalNoti] = useState(false);
  const [results, setResults] = useState<IProduct[]>([]);
  const [listBrandHeader, setListBrandHeader] = useState<Product[]>();
  const [listCategory, setListCategory] = useState<Product[]>();
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>();
  const [dataNoti, setDataNoti] = useState<IDataNoti[]>();
  const [type, setType] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const token = getCookie("customerToken");
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      const key = event.target.value;
      navigate(`/search/${toSlug(event.target.value)}`, {
        state: {
          key,
        },
      });
      setResults([]);
    }
  };
  const handleHover = (isHovering: boolean) => {
    if (!showModal) {
      setShowTable(isHovering);
    }
  };
  const getDataBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrand(),
    });
    if (res.status) {
      setListBrandHeader(res.data?.data);
    }
  };
  const getDataNoti = async () => {
    if (!!userPrf) {
      const res = await axios({
        method: "get",
        url: API.getNoti(Number(userPrf?.id)),
      });
      if (res.status) {
        const allNotifications = res.data?.data || [];

        const unreadNotificationsCount = allNotifications.filter(
          (notification: any) => notification.type === 0
        ).length;
        setUnreadNotificationsCount(unreadNotificationsCount);
        setDataNoti(res.data?.data);
      }
    }
  };
  const deleteNotiOne = async (id: number) => {
    if (!!userPrf) {
      const res = await axios({
        method: "delete",
        url: API.getNoti(Number(id)),
      });
      if (res.status) {
        getDataNoti();
      }
    }
  };
  useEffect(() => {
    getDataNoti();
  }, [userPrf?.id, type, showModalNoti]);

  const getCategory = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getCategory(),
      });
      if (res.status) {
        setListCategory(res.data?.data);
      }
    } catch (error) {
      console.error("Error fetching shoe details: ", error);
    }
  };
  const fetchDataSearch = (value: string) => {
    fetch(API.getAllShoe(1, 1000000))
      .then((responsive) => responsive.json())
      .then((json) => {
        const results = json?.data.filter((search: IProduct) => {
          return (
            value &&
            search &&
            search.name &&
            search.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };
  const handleChange = (value: string) => {
    setSearchValue(value);
    fetchDataSearch(value);
  };
  useEffect(() => {
    getDataBrand();
    getCategory();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const CategoryTable = () => {
    return (
      <div className="w-screen flex justify-center">
        <Fade top distance="10%" duration={800}>
          <div
            className=" max-w-screen-xl mx-auto w-full bg-[#fff] absolute  z-40 max-h-64  mt-[1px] shadow-sm"
            onMouseEnter={() => {
              handleHover(true);
            }}
            onMouseLeave={() => {
              handleHover(false);
            }}
          >
            <div className="w-full flex  mx-10">
              <div className="w-[20%]">
                <span className="text-sm  font-medium whitespace-nowrap text-black uppercase border-b-[1px] border-b-gray-600 ">
                  Thương hiệu
                </span>
                <ul className="mx-auto   flex flex-col   py-2 ">
                  {!!listBrandHeader &&
                    !!listBrandHeader.length &&
                    listBrandHeader.map((item, index) => (
                      <Link
                        to={`/brand/${item.id}/${toSlug(item.name)}`}
                        key={index}
                        onClick={() => {
                          handleHover(false);
                        }}
                        className="relative tracking-wider btn4 leading-none overflow-hidden py-1  w-fit "
                      >
                        <span
                          className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca] w-full `}
                        />
                        <span
                          className={`cursor-pointer  text-sm font-normal hover:text-[#6756ca] ${"text-gray-900"}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                </ul>
              </div>

              <ul
                className=" w-full "
                onMouseEnter={() => {
                  handleHover(true);
                }}
                onMouseLeave={() => {
                  handleHover(false);
                }}
              >
                <span className="text-sm font-medium whitespace-nowrap text-black uppercase border-b-gray-600  border-b-[1px]">
                  Danh mục
                </span>
                <div className="grid grid-rows-4 grid-flow-col ">
                  {!!listCategory &&
                    !!listCategory.length &&
                    listCategory.map((item, index) => (
                      <Link
                        onClick={() => {
                          handleHover(false);
                        }}
                        to={`/category/${item.id}/${toSlug(item.name)}`}
                        key={index}
                        className="relative tracking-wider btn4 leading-none overflow-hidden py-1  w-fit group "
                      >
                        <span
                          className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca] w-full `}
                        />
                        <span
                          className={`cursor-pointer text-sm group-hover:text-[#6756ca] ${"text-gray-900"}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                </div>
              </ul>
            </div>
          </div>
        </Fade>
      </div>
    );
  };
  return (
    <Fragment>
      <div
        className={`${
          isHeaderSticky ? "sticky top-0 bg-white shadow-md" : "relative"
        } top-0 left-0 w-full z-10  `}
      >
        <header>
          <nav className="bg-white  ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto relative">
              <div className="w-[8%] h-fit">
                <a href="/" className="flex items-center w-fit ">
                  <LazyLoadImage
                    src={Images.logo}
                    className="w-auto object-cover h-[60px]"
                  />
                </a>
              </div>

              <div
                className=" w-full items-center justify-between hidden  md:flex md:flex-[0.95] md:order-1"
                id="navbar-user"
              >
                <ul className="flex flex-col flex-1 list-none font-medium  md:p-0 mt-2 border  md:flex-row md:space-x-6 md:mt-0 md:border-0  items-center justify-around ">
                  <li className="flex-[3.5]">
                    <div className="relative w-full ">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <svg
                          className="w-4 h-4 text-gray-500 "
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        value={searchValue}
                        onChange={(e) => handleChange(e?.target?.value)}
                        className="placeholder:text-gray-600 block w-full p-4 pl-10 text-sm font-normal text-gray-900 border border-gray-100 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500  py-2  "
                        placeholder="Tìm kiếm sản phẩm tại đây....."
                        required
                        onKeyDown={(e) => handleKeyPress(e)}
                      />
                      <div className="w-full absolute bg-white z-[1000] mt-1 rounded px-3 max-h-[200px] overflow-y-scroll shadow-lg drop-shadow-2xl ">
                        {!!results &&
                          !!results.length &&
                          results.map((result, index) => {
                            return (
                              <div
                                className="flex items-end justify-start mb-1 hover:bg-[#f4f4f4] transition-colors"
                                key={index}
                              >
                                <img
                                  src={result.images}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded mr-2  "
                                />
                                <p
                                  className="text-sm font-medium mb-2  cursor-pointer "
                                  onClick={() => {
                                    setSearchValue(result?.name);
                                    setResults([]);
                                    navigate(`/product/${result.id}`);
                                  }}
                                >
                                  {result.name}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </li>

                  <li
                    className=" px-0 cursor-pointer"
                    onClick={() => {
                      navigate(path.lookUpOrders);
                    }}
                  >
                    <div className=" flex justify-center items-center my-auto ">
                      <LazyLoadImage
                        src={Images.iconLookUpOrders}
                        alt=""
                        className="w-auto h-6 object-contain"
                      />
                      <div className="ml-3">
                        <p className="text-xs font-normal">Theo dõi đơn hàng</p>
                        <p className="text-sm font-semibold">
                          Tra cứu đơn hàng
                        </p>
                      </div>
                    </div>
                  </li>
                  <li
                    className="flex-1 px-0 cursor-pointer"
                    onClick={() => {
                      // openCart();
                      navigate(path.cart);
                    }}
                  >
                    <div className=" flex justify-center items-center my-auto ">
                      <div className=" relative">
                        {!userPrf && !!cartQuantity && cartQuantity > 0 ? (
                          <div className=" absolute left-3 -top-[30%]">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                              {cartItems.length}
                            </p>
                          </div>
                        ) : !!userPrf && listProducts.length > 0 ? (
                          <div className=" absolute left-3 -top-[30%]">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                              {listProducts.length}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <img
                          src={Images.iconCart2}
                          className="h-6 w-auto object-contain"
                        />
                      </div>

                      <div className="ml-3">
                        <p className="text-sm font-semibold">Giỏ hàng</p>
                      </div>
                    </div>
                  </li>

                  <li
                    className=" px-0  relative"
                    onMouseEnter={() => [setShowModalNoti(true), getDataNoti()]}
                    onMouseLeave={() => [
                      setShowModalNoti(false),
                      getDataNoti(),
                    ]}
                  >
                    <div className=" flex justify-center items-center my-auto ">
                      <div className="relative">
                        {unreadNotificationsCount === 0 ||
                        !unreadNotificationsCount ? (
                          ""
                        ) : (
                          <div className=" absolute left-4 -top-[5%]">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                              {unreadNotificationsCount}
                            </p>
                          </div>
                        )}

                        <LazyLoadImage
                          src={Images.iconInti}
                          alt=""
                          className="w-auto h-9 object-contain"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold">Thông báo</p>
                      </div>
                    </div>
                    {!!userPrf
                      ? showModalNoti && (
                          <div className="absolute -left-[10%]    w-96 rounded-lg drop-shadow-lg    ">
                            <Fade top distance="20%" duration={300}>
                              {userPrf && (
                                <div className="w-7  inline-block ml-[10%] drop-shadow-lg ">
                                  <div className=" h-4 w-5 bg-white rotate-45 transform origin-bottom-left  z-10 shadow-2xl"></div>
                                </div>
                              )}
                              <div className="w-full bg-white z-10 shadow-xl -mt-[6px] drop-shadow-lg rounded-lg overflow-y-scroll max-h-72">
                                {!!dataNoti &&
                                  dataNoti.length > 0 &&
                                  dataNoti.map((e, i) => {
                                    if (type === false) {
                                      if (i >= 4) {
                                        return;
                                      } else {
                                        return (
                                          <div
                                            onClick={() => {
                                              getDataNoti();
                                              setShowModalNoti(false);
                                              navigate(`/notification/${e.id}`);
                                            }}
                                            className={`group  relative px-2 py-3 ${
                                              e.type === 1 ? "bg-gray-100" : ""
                                            }`}
                                            key={i}
                                          >
                                            <p
                                              className={`text-sm  line-clamp-1 ${
                                                e.type === 1
                                                  ? "font-normal"
                                                  : "font-bold "
                                              }`}
                                            >
                                              {e.title}
                                            </p>
                                            <p
                                              className={`text-xs  line-clamp-2 ${
                                                e.type === 1
                                                  ? "font-normal"
                                                  : "font-medium"
                                              }`}
                                              key={i}
                                            >
                                              {e.content}
                                            </p>
                                            <button
                                              className="absolute top-0 right-0 mt-2 mr-2 p-1 cursor-pointer  text-white rounded-full opacity-0 group-hover:opacity-100  transform transition-transform ease-in-out duration-300 hover:-translate-x-2"
                                              onClick={() => {
                                                deleteNotiOne(e.id);
                                              }}
                                            >
                                              <img
                                                src={Images.iconClose}
                                                className="w-4 h-4 object-contain"
                                              />
                                            </button>
                                          </div>
                                        );
                                      }
                                    } else {
                                      return (
                                        <div
                                          onClick={() => {
                                            setShowModalNoti(false);
                                            navigate(`/notification/${e.id}`);
                                            getDataNoti();
                                          }}
                                          className={`group  relative px-2 py-3 ${
                                            e.type === 1 ? "bg-gray-100" : ""
                                          }`}
                                          key={i}
                                        >
                                          <p
                                            className={`text-sm  line-clamp-1 ${
                                              e.type === 1
                                                ? "font-normal"
                                                : "font-bold "
                                            }`}
                                          >
                                            {e.title}
                                          </p>
                                          <p
                                            className={`text-xs  line-clamp-2 ${
                                              e.type === 1
                                                ? "font-normal"
                                                : "font-medium"
                                            }`}
                                            key={i}
                                          >
                                            {e.content}
                                          </p>
                                          <button
                                            className="absolute top-0 right-0 mt-2 mr-2 p-1 cursor-pointer  text-white rounded-full opacity-0 group-hover:opacity-100  transform transition-transform ease-in-out duration-300 hover:-translate-x-2"
                                            onClick={() => {
                                              deleteNotiOne(e.id);
                                            }}
                                          >
                                            <img
                                              src={Images.iconClose}
                                              className="w-4 h-4 object-contain"
                                            />
                                          </button>
                                        </div>
                                      );
                                    }
                                  })}
                                {type === false &&
                                !!dataNoti &&
                                dataNoti?.length > 4 ? (
                                  <p
                                    className="text-sm font-semibold  line-clamp-1 text-center py-2 bg-slate-100 cursor-pointer"
                                    onClick={() => {
                                      setType(true);
                                    }}
                                  >
                                    Xem tất cả
                                  </p>
                                ) : (
                                  ""
                                )}
                                {dataNoti?.length === 0 && (
                                  <div className="my-5">
                                    <img
                                      src={Images.iconNoti}
                                      alt=""
                                      className="w-20 mx-auto h-auto  "
                                    />
                                    <p className="text-center font-light text-xl my-2">
                                      Thông báo trống
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Fade>
                          </div>
                        )
                      : " "}
                  </li>
                  <li className=" px-0 cursor-pointer">
                    <div
                      className=" flex justify-center items-center my-auto "
                      onClick={() => {
                        if (token) {
                          navigate(path.information);
                        } else {
                          navigate(path.loginScreen);
                        }
                      }}
                    >
                      {!!userPrf ? (
                        <img
                          src={
                            infoUser?.avatar
                              ? infoUser?.avatar
                              : Images.iconAccount3
                          }
                          className={"w-7 h-7 rounded-full object-cover"}
                        />
                      ) : (
                        <img
                          src={Images.iconAccount3}
                          className={"w-7 h-7 rounded-full object-cover"}
                        />
                      )}
                      <div className="ml-3">
                        <p className="text-xs font-normal">Tài khoản</p>
                        <p className="text-sm font-medium">
                          {!!userPrf && !!infoUser?.username
                            ? infoUser?.username
                            : !!userPrf && !infoUser?.username
                            ? "Thiết lập tài khoản "
                            : "Đăng nhập/Đăng ký"}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* title brand */}
          {!!listCategory && !!listCategory.length && (
            <nav className="  bg-[#f5f5f5]">
              <div className="max-w-screen-xl px-4  mx-auto">
                <div className="flex items-center overflow-x-auto no-scrollbar">
                  <ul className="flex flex-row font-medium  mr-6 space-x-8 text-sm ">
                    <li className="relative tracking-wider btn4 leading-none overflow-hidden py-3 group  ">
                      <span
                        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                      />
                      <Link
                        to={`/${toSlug("Tất cả sản phẩm")}`}
                        className={`cursor-pointer whitespace-nowrap group-hover:text-[#6756ca] font-sans }`}
                      >
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li
                      onMouseEnter={() => {
                        handleHover(true);
                      }}
                      onMouseLeave={() => {
                        handleHover(false);
                      }}
                      className="relative tracking-wider btn4 whitespace-nowrap leading-none overflow-hidden py-3   "
                    >
                      <span
                        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                      />

                      <a
                        className={`cursor-default   whitespace-nowrap hover:text-[#6756ca] font-sans}`}
                        aria-current="page"
                      >
                        Thương hiệu
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        handleHover(true);
                      }}
                      onMouseLeave={() => {
                        handleHover(false);
                      }}
                      className="relative tracking-wider btn4 whitespace-nowrap leading-none overflow-hidden py-3 group  "
                    >
                      <span
                        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                      />

                      <a
                        className={`cursor-default  whitespace-nowrap group-hover:text-[#6756ca] font-sans }`}
                        aria-current="page"
                      >
                        Danh mục
                      </a>
                    </li>
                    {listCategory.map((item, index) => {
                      if (index >= 12) {
                        return;
                      }
                      return (
                        <Link
                          to={`/category/${item.id}/${toSlug(item.name)}`}
                          key={index}
                          className="relative tracking-wider whitespace-nowrap btn4 leading-none overflow-hidden py-3  group "
                        >
                          <span
                            className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]  `}
                          />
                          <span
                            className={`cursor-pointer whitespace-nowrap group-hover:text-[#6756ca] ${"text-gray-900"} font-sans`}
                          >
                            {item.name}
                          </span>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </nav>
          )}
        </header>

        {showTable && (
          <CategoryTable />
          // </Fade>
        )}

        <FormLogin
          showModal={showModal}
          setShowModal={setShowModal}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
        />
      </div>
    </Fragment>
  );
};

export default Header;
