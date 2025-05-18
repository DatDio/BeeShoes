import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import "rc-slider/assets/index.css"; // Import CSS cho slider
import axios from "axios";
import API from "../../api";
import { IProduct, Product } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";
import NavPage from "../../components/NavPage";
import SekeletonItemShoe from "../../components/SekeletonItemShoe";
import Fade from "react-reveal/Fade";
import { toSlug } from "../../utils/format";
interface ShoeSize {
  id: number;
  size: string;
  selected: boolean;
}
interface ShoeMaterial {
  id: number;

  material: string;
  selected: boolean;
}
interface ShoseBrand {
  id: number;
  brand: string;
  selected: boolean;
}
interface ShoseColor {
  id: number;
  color: string;
  selected: boolean;
}
interface PriceRange {
  id: number;
  minPrice: number;
  maxPrice: any;
  priceRange: string;
}
const ListProductsByBrandWithSearch = () => {
  const location = useLocation();
  const param = location.state;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState<boolean>(true);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState<boolean>(true);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState<boolean>(true);
  const [priceRange2, setPriceRange2] = useState([
    {
      id: 1,
      minPrice: 0,
      maxPrice: 1000000,
      priceRange: "0₫ - 1.000.000₫",
    },
    {
      id: 2,
      minPrice: 1000000,
      maxPrice: 3000000,
      priceRange: "1.000.000₫ - 3.000.000₫",
    },
    {
      id: 3,
      minPrice: 3000000,
      maxPrice: 5000000,
      priceRange: "3.000.000₫ - 5.000.000₫",
    },
    {
      id: 4,
      minPrice: 5000000,
      maxPrice: 7000000,
      priceRange: "5.000.000₫ - 7.000.000₫",
    },
    {
      id: 5,
      minPrice: 7000000,
      maxPrice: 10000000,
      priceRange: "7.000.000₫ - 10.000.000₫",
    },
    {
      id: 6,
      minPrice: 10000000,
      maxPrice: "",
      priceRange: "lớn hơn 10.000.000₫ ",
    },
  ]);
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<ShoseColor[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<ShoeMaterial[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({
    id: 0,
    minPrice: 0,
    maxPrice: "",
    priceRange: "",
  });
  const [shoeSizes, setShoesSize] = useState<Product[]>();
  const [colors, setColors] = useState<Product[]>();
  const [materials, setMaterials] = useState<Product[]>();
  const [listShoes, setListShoes] = useState<IProduct[]>();
  // ----------------------------------------------------------------
  const handleSizeSelect = (size: Product) => {
    setSelectedSizes((prevSizes) => {
      const existingSize = prevSizes.find((s) => s.size === size.name);

      if (existingSize) {
        return prevSizes.filter((s) => s.size !== size.name);
      } else {
        return [...prevSizes, { id: size.id, size: size.name, selected: true }];
      }
    });
  };
  const handleMaterialsSelect = (material: Product) => {
    setSelectedMaterials((prevMaterial) => {
      const existingSize = prevMaterial.find(
        (s) => s.material === material.name
      );
      if (existingSize) {
        return prevMaterial.filter((s) => s.material !== material.name);
      } else {
        return [
          ...prevMaterial,
          { id: material.id, material: material.name, selected: true },
        ];
      }
    });
  };
  const handleColorsSelect = (color: Product) => {
    setSelectedColors((prevColor) => {
      const existingColor = prevColor.find((s) => s.color === color.name);
      if (existingColor) {
        return prevColor.filter((s) => s.color !== color.name);
      } else {
        return [
          ...prevColor,
          { id: color.id, color: color.name, selected: true },
        ];
      }
    });
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    const selectedRange = priceRange2.find((item) => item.id === selectedId);

    if (selectedRange) {
      setSelectedPriceRange({
        ...selectedRange,
      });
    }
  };

  const getFilter = async () => {
    const myColor = selectedColors.map((i) => i.id);
    const idColors = myColor.join(",");
    const mySize = selectedSizes.map((i) => i.id);
    const idSizes = mySize.join(",");
    const myMaterials = selectedMaterials.map((i) => i.id);
    const idMaterials = myMaterials.join(",");
    try {
      const res = await axios({
        method: "get",
        url: API.getFilterWithSearch(
          idColors,
          idSizes,
          idMaterials,
          "",
          "",
          selectedPriceRange?.minPrice,
          selectedPriceRange?.maxPrice,
          param?.key,
          page
        ),
      });

      if (res.status) {
        setTotalPage(res?.data?.totalPages);
        setListShoes(res?.data?.data);
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownTogglePrice = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const handleDropdownToggleMaterial = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  const handleDropdownToggleColor = () => {
    setIsDropdownOpen5(!isDropdownOpen5);
  };
  const getDataSize = async () => {
    const res = await axios({
      method: "get",
      url: API.getSizeAll(),
    });
    if (res.status) {
      setShoesSize(res?.data?.data);
    }
  };
  const getDataColor = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllColors(),
    });
    if (res.status) {
      setColors(res?.data?.data);
    }
  };
  const getDataSole = async () => {
    const res = await axios({
      method: "get",
      url: API.getSole(),
    });
    if (res.status) {
      setMaterials(res.data?.data);
    }
  };

  const getShoeWithKeyParams = async (key: string) => {
    try {
      const res = await axios({
        method: "get",
        url: API.getShoeSearch(key, page),
      });
      if (res.status) {
        setListShoes(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getDataSize();
    getDataSole();
    getDataColor();
  }, []);
  useEffect(() => {
    getFilter();
  }, [
    selectedColors,
    selectedSizes,
    selectedMaterials,
    page,
    param?.key,
    selectedPriceRange,
  ]);
  useEffect(() => {
    getShoeWithKeyParams(param?.key);
  }, [param]);
  return (
    <div className="w-full h-full min-h-screen ">
      <div className="flex w-full relative h-full">
        <aside
          id="logo-sidebar"
          className="  w-64 h-auto transition-transform -translate-x-full sm:translate-x-0 mt-[68px] "
          aria-label="Sidebar"
        >
          <span className="text-xl font-semibold text-gray-700">Bộ lọc</span>
          <div className=" mx-2 my-5 h-fit border-[1px] border-solid border-[#EDEDED]">
            <div className="flex flex-col items-center justify-center  w-full ">
              <button
                onClick={handleDropdownToggleColor}
                className="flex relative btn4 self-start bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center justify-between items-center border border-white  uppercase  tracking-wider  overflow-hidden w-full"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">màu sắc</p>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen5 && (
                <div className="  w-full  rounded-lg px-2 py-2">
                  <div
                    className="grid grid-cols-2 gap-2 "
                    aria-labelledby="dropdownDefault"
                  >
                    {!!colors?.length &&
                      colors.map((color, index) => {
                        const isSelected = selectedColors.some(
                          (s) => s.color === color.name && s.selected
                        );
                        return (
                          <div
                            key={color.id}
                            className={` cursor-pointer flex items-center justify-center rounded py-1 w-full hover:bg-gray-600 ${
                              isSelected
                                ? "bg-gray-600 text-white"
                                : "bg-[#EDEDED] "
                            }   `}
                            onClick={() => handleColorsSelect(color)}
                          >
                            <span
                              className={` text-sm font-medium line-clamp-1 px-1
                ${isSelected ? " text-white" : " text-gray-900"}    `}
                            >
                              {color.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              <button
                onClick={handleDropdownToggle}
                className="flex relative btn4 self-start bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center justify-between items-center border border-white  uppercase  tracking-wider  overflow-hidden w-full"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">kích thước size</p>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="  w-full  rounded-lg mt-1  px-2 py-2">
                  <div
                    className="grid grid-cols-2 gap-2 "
                    aria-labelledby="dropdownDefault"
                  >
                    {!!shoeSizes?.length &&
                      shoeSizes.map((size, index) => {
                        const isSelected = selectedSizes.some(
                          (s) => s.size === String(size.name) && s.selected
                        );
                        return (
                          <div
                            key={size.id}
                            className={` cursor-pointer flex items-center justify-center rounded py-1 w-full hover:bg-gray-600 ${
                              isSelected
                                ? "bg-gray-600 text-white"
                                : "bg-[#EDEDED] "
                            }   `}
                            onClick={() => handleSizeSelect(size)}
                          >
                            <span
                              className={` text-sm font-medium 
                ${isSelected ? " text-white" : " text-gray-900"}    `}
                            >
                              {size.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              <button
                onClick={handleDropdownToggleMaterial}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  "
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">Loại đế</p>

                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen3 && (
                <div className="  w-full  rounded-lg p-2">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!materials &&
                      !!materials.length &&
                      materials.map((material, index) => {
                        const isSelected = selectedMaterials.some(
                          (s) => s.material === material.name && s.selected
                        );
                        return (
                          <li
                            key={index}
                            className="flex items-center cursor-pointer"
                            onClick={() => handleMaterialsSelect(material)}
                          >
                            <input
                              id={`material-${material.id}`}
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                return;
                              }}
                              className="w-4 h-4 bg-white border-gray-300 rounded text-primary-600 checked:bg-gray-600  focus:ring-0"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {material.name}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              <div className=" w-full">
                <button
                  onClick={handleDropdownTogglePrice}
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  "
                  type="button"
                >
                  <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                  <p className="font-medium text-xs">khoảng giá</p>
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen2 && (
                  <Fragment>
                    <div>
                      {priceRange2.map((item, index) => {
                        return (
                          <div
                            className="flex items-center mb-4 cursor-pointer p-2"
                            key={item.id}
                          >
                            <input
                              id={`default-radio-${item.id}`}
                              type="radio"
                              value={item.id}
                              name="default-radio"
                              onChange={(value) => {
                                handleRadioChange(value);
                              }}
                              className="w-4 h-4 text-blue-600 bg-white border-gray-300 checked:bg-gray-600  focus:ring-0"
                            />
                            <label
                              className="ml-2 text-xs font-medium text-gray-900 "
                              htmlFor={`default-radio-${item.id}`}
                            >
                              {item.priceRange}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </aside>
        <div className="w-full mb-10">
          <div className="mx-auto  flex flex-col  my-4 items-center ">
            {!!param ? (
              <span className=" text-3xl font-medium">
                Kết quả tìm kiếm: “{param?.key}"
              </span>
            ) : (
              <span className=" text-3xl font-medium">{param?.name}</span>
            )}
          </div>
          <div className="w-full  mx-auto ">
            <div className="w-full flex justify-between items-center ">
              <div className="px-2">
                <span
                  className="cursor-pointer  text-sm  text-[#909097]"
                  onClick={() => {
                    navigate(path.home);
                  }}
                >
                  Trang chủ
                </span>
                /
                {param?.key ? (
                  <span className=" text-sm font-medium">
                    Kết quả tìm kiếm cho “{param?.key}”
                  </span>
                ) : (
                  <span className="text-sm font-medium uppercase ">
                    {" "}
                    Tất cả sản phẩm
                  </span>
                )}
              </div>
              {/* Lọc sản phẩm */}
            </div>
            <div className="grid grid-cols-5 gap-2 mx-auto mt-4 px-2">
              {!!listShoes && listShoes.length > 0 ? (
                listShoes.map((e: IProduct, i: number) => {
                  if (e.quantity === 0 || !e.quantity || e.status === true) {
                    return;
                  }
                  return (
                    <div key={i}>
                      <ProductStanding product={e} />
                    </div>
                  );
                })
              ) : listShoes?.length === 0 ? (
                <span className="text-center font-medium text-base text-ted">
                  Không tìm thấy sản phẩm
                </span>
              ) : (
                Array(10)
                  .fill({})
                  .map((item, index) => {
                    return (
                      <Fragment>
                        <div key={index}>
                          <SekeletonItemShoe />
                        </div>
                      </Fragment>
                    );
                  })
              )}
              {/* </Fade> */}
            </div>
            {listShoes?.length === 0 ? (
              ""
            ) : (
              <div className="my-10">
                <NavPage totalPages={totalPage} page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsByBrandWithSearch;
