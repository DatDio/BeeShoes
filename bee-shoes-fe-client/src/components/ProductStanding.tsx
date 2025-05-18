import { IProduct } from "../types/product.type";
import { convertToCurrencyString, renderColor } from "../utils/format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Images from "../static";
import Fade from "react-reveal/Fade";
import QuickViewDetail from "./QuickViewDetail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductStanding = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState<boolean>(false);
  return product.minPrice && product.maxPrice ? (
    <div>
      <Fade top distance="10%" duration={2000}>
        <div
          className="border-[0.2px] py-4  relative h-[300px] group btn4 leading-none overflow-hidden  border-gray-100"
          onClick={() => {
            if (!!product.minPrice && !!product.maxPrice && product?.images) {
              navigate(`/product/${product.id}`);
            } else {
              return;
            }
          }}
        >
          {!!product.discountValue && (
            <p className=" text-xs bg-red-500  font-medium  absolute top-[1%] left-[1%] z-[8] text-white px-3 py-[1px] rounded-r-[15px]">
              Sale
            </p>
          )}

          <button
            className="opacity-0 group-hover:opacity-100 absolute bottom-0 z-10 left-0 right-0 bg-black bg-opacity-50 text-white text-sm font-bold py-2 transition-opacity duration-300 ease-in-out cursor-pointer"
            type="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setShowQuickView(true);
            }}
          >
            Xem nhanh
          </button>
          <div className="hover-translate-up">
            <div className={`h-[170px] flex flex-col gap-2`}>
              <img
                src={product?.images.split(",")[0]}
                className="max-h-[170px] w-full  object-contain mx-auto"
              />
            </div>
            <div className="px-2 flex flex-col justify-between h-[130px]">
              <p className="text-[#282828] font-medium text-xs text-center mt-4  line-clamp-2">
                {product.name}
              </p>
              <div>
                {product.discountValue !== null ? (
                  <div className="flex items-end ">
                    <p className="text-red-500 font-semibold text-base mr-2">
                      {convertToCurrencyString(product.discountValue)}
                    </p>
                    <p className="text-gray-500 font-semibold text-sm  line-through">
                      {convertToCurrencyString(product.minPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-red-500 font-semibold text-base  ">
                    {convertToCurrencyString(product.minPrice)}
                  </p>
                )}
                <p className=" text-gray-400 font-normal text-sm  line-clamp-1">
                  <span className="text-slate-800 ">Màu sắc</span>:{" "}
                  {product.color.replace(/,/g, ", ")}
                </p>
                <p className=" text-gray-400 font-normal text-sm  line-clamp-1 ">
                  <span className="text-slate-800 ">Danh mục:</span>{" "}
                  {product?.category}
                </p>
              </div>
            </div>
          </div>
          <span
            className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `}
          />
        </div>
      </Fade>

      {showQuickView && (
        <QuickViewDetail
          product={product}
          setShowQuickView={setShowQuickView}
        />
      )}
    </div>
  ) : (
    <Fade top distance="10%" duration={2000}>
      <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
        <div className="hover-translate-up">
          <div
            className={`min-h-[110px] max-h-[170px] flex flex-col gap-2
      `}
          >
            <LazyLoadImage
              src={Images.imgNotFound}
              className="max-h-[170px] w-full  object-contain mx-auto"
            />
          </div>
        </div>
        <span className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `} />
      </div>
    </Fade>
  );
};
export default ProductStanding;
