export interface Product {
  id: number;
  name: string;
}
export interface Color {
  id: number;
  name: string;
  hexColor: string;
}
export interface IOrderType {
  customers: string;
  amount: number;
  status: number;
  totalMoney: number;
  date: string;
  id: string;
}
export interface IDataAside {
  id: number;
  name: string;
  img: string;
}
export interface IDataBrand {
  img: string;
  name: string;
}

export interface IProduct {
  brand: string;
  category: string;
  color: string;
  description: string;
  id: number;
  images: string;
  index: number;
  maxPrice: number;
  minPrice: number;
  name: string;
  quantity: number;
  size: any;
  discountValue: null | number;
  quantitySold: null | number;
  status: boolean;
}
export interface IDetailProduct {
  code: string;
  color: string;
  id: number;
  images: any;
  index: number;
  name: string;
  price: number;
  quantity: number;
  size: string | number;
  sole: string;
  status: boolean;
  weight: number;
  discountPercent: number | null | string;
}
export interface IInforShoe {
  createAt: string;
  updateAt: string;
  createBy: string;
  updateBy: string;
  deleted: boolean;
  id: number;
  name: string;
  brand: Product;
  category: Product;
  description: any;
}
export interface IIForDetailShoe {
  id: number;
  shoe: {
    id: number;
    name: string;
    brand: Product;
    category: Product;
    description: string;
  };
  size: Product;
  sole: Product;
  color: Product;
  code: string;
  price: number;
  quantity: number;
  weight: number;
  images: Product[];
}
export interface IListDeatilShoe {
  code: string;
  color: string;
  id: number;
  images: string;
  index: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  sole: string;
  status: boolean;
  weight: number;
  discountPercent: number;
  discountValue: number;
}
export interface IVoucher {
  code: string;
  id: number;
  index: number;
  minBillValue: number;
  name: string;
  percentReduce: number;
  quantity: number;
  status: number;
  type: boolean;
  startDate: string;
  endDate: string;
  customer: null | string;
}
export interface Token {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avata: string;
  exp: number;
}
export interface CustomError {
  message: string;
  response?: {
    data?: string;
    status?: number;
  };
}
export interface IAddress {
  defaultAddress: boolean;
  district: string;
  id: number;
  index: number;
  name: string;
  phoneNumber: string;
  province: string;
  specificAddress: string;
  status: boolean;
  ward: string;
}
export interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

export interface District {
  DistrictID: number;
  DistrictName: string;
}

export interface Ward {
  WardCode: number;
  WardName: string;
}
export interface Iinfo {
  avatar: string;
  addresses: any[];
  birthday: string;
  cccd: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  username: string;
  phoneNumber: string;
}
export interface IDetailProductCart {
  discountPercent: number;
  discountValue: number;
  id: number;
  image: string;
  index: number;
  name: string;
  price: number;
  quantity: number;
  sole: string;
  idProductDetail: number;
}
export interface IDetailProductCart2 {
  discountPercent: number;
  discountValue: number;
  id: number;
  images: string;
  index: number;
  name: string;
  price: number;
  quantity: number;
  sole: string;
  idProductDetail: number;
}
export interface IBill {
  id: number;
  type: number;
  address: string;
  index: number;
  status: number;
  phoneNumber: string;
  voucher: any;
  customer: any;
  moneyShip: number;
  code: string;
  note: string;
  moneyReduce: number;
  totalMoney: number;
  employee: any;
  payDate: any;
  shipDate: any;
  desiredDate: any;
  receiveDate: any;
  createAt: string;
  customerName: string;
}
export interface IInfoAccount {
  addresses: any;
  authorities: any;
  avatar: string;
  birthday: string;
  cccd: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  password: string;
  phoneNumber: string;
  role: {
    id: number;
    name: string;
  };
  username: string;
}
export interface IOrder {
  id: number;
  type: number;
  address: string;
  index: number;
  status: number;
  phoneNumber: null;
  voucher: null;
  customer: string;
  code: string;
  note: string | null;
  totalMoney: number;
  moneyShip: number;
  moneyReduce: number;
  employee: any;
  createAt: string;
  desiredDate: any;
  payDate: any;
  receiveDate: any;
  shipDate: any;
}
export interface IDetailOrder {
  name: string;
  id: number;
  size: string;
  index: number;
  images: string;
  quantity: number;
  price: number;
  sole: string;
  color: string;
  discountValue: number;
  shoeCode: string;
  discountPercent: number;
}
export interface IDataNoti {
  action: any;
  content: string;
  createAt: string;
  id: number;
  index: number;
  title: string;
  type: 0 | 1;
  updateAt: string;
  createBy: string;
  updateBy: string;
  deleted: boolean;
}
