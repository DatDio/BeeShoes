import slugify from "slugify";
import { IDetailProductCart, IProduct, Product } from "../types/product.type";

export const convertToCurrencyString = (number: number | string): string => {
  // Kiểm tra xem giá trị đầu vào có phải là kiểu number không
  if (typeof number === "number") {
    if (number === undefined || number === null) {
      const currencyString = 0;
      return "0";
    } else {
      const currencyString = number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return currencyString;
    }
  } else {
    return "";
  }
};

export const renderColor = (item: IProduct) => {
  const namesArray = [];
  const jsonArrayString = `[${item.color}]`;

  try {
    const jsonArray = JSON.parse(jsonArrayString);

    namesArray.push(jsonArray.map((item: any) => item.name));
  } catch (error) {
    console.error("Lỗi phân tích chuỗi JSON:", error);
  }
  return namesArray.join(", ");
};
export const toSlug = (text: string) => {
  return slugify(text, {
    lower: true,
  });
};
export function findProductIdByName(
  nameToCheck: string | number,
  productList: Product[]
): number | null {
  const product = productList.find((item) => item?.name === nameToCheck);
  if (product) {
    return product?.id;
  } else {
    return null;
  }
}
export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/; // Regex đơn giản cho định dạng email
  return re.test(email);
};
export const validatePassword = (password: string) => {
  const re = /^.{8,}$/;
  return re.test(password);
};
export const regexPhoneNumber = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
export const calculateTotal = (items: IDetailProductCart[]): number => {
  const total = items.reduce((accumulator, currentItem) => {
    const itemTotal = currentItem.quantity * currentItem.price;
    return accumulator + itemTotal;
  }, 0);

  return total;
};
export const calculateSale = (items: IDetailProductCart[]): number => {
  const total = items.reduce((accumulator, currentItem) => {
    const itemTotal =
      (currentItem?.discountValue
        ? currentItem?.price - currentItem?.discountValue
        : 0) * currentItem.quantity;
    return accumulator + itemTotal;
  }, 0);

  return total;
};
export const calculateTotalDone = (items: IDetailProductCart[]): number => {
  const total = items.reduce((accumulator, currentItem) => {
    const itemTotal = !!currentItem.discountValue
      ? currentItem.quantity * currentItem.discountValue
      : currentItem.quantity * currentItem.price;
    return accumulator + itemTotal;
  }, 0);

  return total;
};
