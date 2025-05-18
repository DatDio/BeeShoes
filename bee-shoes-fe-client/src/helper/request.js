import axios from "axios";
import { AppConfig, AppConfigAddress } from "../AppConfig";
import { toast } from "react-toastify";
import { deleteToken, getTokenCustomer, getTokenEmpoloyee } from "./useCookie";
import { useShoppingCart } from "../context/shoppingCart.context";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
const { loading, setLoading } = useShoppingCart();
const navigate = useNavigate();
export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

export const requestCustomer = axios.create({
  baseURL: AppConfig.apiUrl,
});

export const requestAdress = axios.create({
  baseURL: AppConfigAddress.apiUrl,
});

request.interceptors.request.use((config) => {
  const token = getTokenEmpoloyee();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

requestCustomer.interceptors.request.use((config) => {
  //   store.dispatch(SetLoadingTrue());
  setLoading(true);
  const token = getTokenCustomer();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    // store.dispatch(SetLoadingFalse());
    setLoading(false);
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      navigate;
      deleteToken();
      return;
    }
    if (error.response != null && error.response.status === 400) {
      toast.error(error.response.data.message);
    }
    if (error.response && error.response.status === 404) {
      navigate("*");
      return;
    }
    // store.dispatch(SetLoadingFalse());
    setLoading(false);
    throw error;
  }
);

requestCustomer.interceptors.response.use(
  (response) => {
    // store.dispatch(SetLoadingFalse());
    setLoading(false);
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      navigate("*");
      deleteToken();
      return;
    }
    if (error.response != null && error.response.status === 400) {
      toast.error(error.response.data.message);
    }
    if (error.response && error.response.status === 404) {
      navigate("*");
      return;
    }
    // store.dispatch(SetLoadingFalse());
    setLoading(false);
    throw error;
  }
);
