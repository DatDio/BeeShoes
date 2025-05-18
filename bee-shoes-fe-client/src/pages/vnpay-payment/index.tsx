import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import path from "../../constants/path";
import { useShoppingCart } from "../../context/shoppingCart.context";
import { CustomError } from "../../types/product.type";

export default function Payment() {
  const navigate = useNavigate();
  const { removeAllCart, userPrf, removeAllCartKH } = useShoppingCart();
  useEffect(() => {
    let isMounted = true;

    async function check() {
      const paymentReturn = JSON.parse(
        localStorage.getItem("checkout") || "{}"
      ) as Record<string, any>;

      const requestData: Record<string, string> = {};
      for (const [key, value] of new URLSearchParams(window.location.search)) {
        requestData[key] = value;
      }
      requestData.vnp_TxnRef = paymentReturn.id ? paymentReturn.id : null;

      try {
        const response = await axios.get(
          baseUrl + `api/vn-pay/payment-return`,
          { params: requestData }
        );

        if (isMounted) {
          if (response.data) {
            const response = await axios.post(
              baseUrl +
                "api/bill/create-bill-client-vn-pay/" +
                requestData.vnp_BankTranNo,
              paymentReturn
            );
            if (response.status) {
              console.log("response.data", response.data);
              if (!!userPrf) {
                toast.success("Đặt hàng thành công");
                removeAllCart();
                navigate(
                  `/showBillCheck/${response?.data?.data?.data?.id}/${response?.data?.data?.data?.code}`
                );
              } else {
                removeAllCartKH();
                toast.success("Đặt hàng thành công");
                navigate(
                  `/showBillCheck/${response?.data?.data?.data?.id}/${response?.data?.data?.data?.code}`
                );
              }
            }
          } else {
            localStorage.removeItem("checkout");
            toast.error("Thanh toán thất bại, vui lòng thử lại!");
            navigate(path.cart);
          }
        }
      } catch (error) {
        if (typeof error === "string") {
          toast.error(error);
        } else if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response && customError.response.data) {
            toast.error(customError.response.data);
          } else {
            toast.error(customError.message);
          }
        } else {
          toast.error("Hãy thử lại.");
        }
      }
    }

    check();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return <></>;
}
