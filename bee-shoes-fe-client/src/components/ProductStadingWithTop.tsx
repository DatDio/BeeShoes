import { IProduct } from "../types/product.type";
import { convertToCurrencyString, renderColor } from "../utils/format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Images from "../static";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";

const ProductStandingTop = ({
  product,
  checkTop,
}: {
  product: IProduct;
  checkTop: boolean;
}) => {
  const navigate = useNavigate();
  const soldPercentage =
    product.quantitySold !== null
      ? (product?.quantitySold / product?.quantity) * 100
      : 0;
  return product.minPrice && product.maxPrice ? (
    <div>
      <Fade top distance="10%" duration={2000}>
        <div
          className="border-[0.2px] py-4    h-[300px]  leading-none overflow-hidden  border-gray-100"
          onClick={() => {
            if (!!product.minPrice && !!product.maxPrice && product.images) {
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

          <div className="">
            <div className={`h-[170px] flex flex-col gap-2`}>
              <img
                src={product?.images ? product?.images : Images.imgNotFound}
                className="max-h-[170px] w-full  object-contain mx-auto"
              />
            </div>
            <p className="text-[#282828] font-medium text-xs text-center mt-4  line-clamp-2">
              {product.name}
            </p>
            <div className="px-2">
              {checkTop === true ? (
                <>
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
                    <span className="text-slate-800 ">Đã bán</span>:{" "}
                    {product.quantitySold}
                  </p>
                  <p className=" text-gray-400 font-thin text-sm  line-clamp-1 ">
                    <span className="text-slate-800 font-normal">
                      Danh mục:{" "}
                    </span>
                    {product?.category}
                  </p>
                </>
              ) : (
                <>
                  {product.discountValue !== null ? (
                    <div className="flex items-end  justify-center">
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
                  )}{" "}
                  {product.quantitySold ? (
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                      <div
                        className="bg-red-500    rounded-l-full min-w-min text-center "
                        style={{ width: `${soldPercentage}%` }}
                      >
                        <span className="text-[10px] font-medium text-blue-100  text-center leading-none mb-1">
                          ĐÃ BÁN {soldPercentage}{" "}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-2 relative">
                      <div className="bg-red-500 rounded-l-full w-[10%] h-4"></div>
                      <span className="text-[10px] font-semibold text-red-600 leading-none absolute inset-x-0 bottom-[13px] transform translate-y-full text-center">
                        Đang bán chạy
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Fade>
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
export default ProductStandingTop;
