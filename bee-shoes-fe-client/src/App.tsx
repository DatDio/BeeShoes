import React, { useState } from "react";
import "./App.css";
import { RouteObject, useRoutes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/index";
import ProductPage from "./pages/product/index";
import path from "./constants/path";
import Header from "./components/Header";
import ListProductsByBrand from "./pages/listProductsByBrand";
import ScrollToTopButton from "./components/scrollToTop";
import CartPage from "./pages/cart";
import PaymentPage from "./pages/payment";
import VnPayPayment from "./pages/vnpay-payment";
import Invoice from "./pages/invoice";
import Footer from "./components/Footer";
import Information from "./pages/information";
import DetailOrder from "./pages/information/detailOrder";
import AddAddress from "./pages/information/addAddress";
import ReturnProduct from "./pages/information/returnProduct";
import DetailReturn from "./pages/information/returnProduct/detailReturn";
import { ShoppingCartProvider } from "./context/shoppingCart.context";
import "react-toastify/dist/ReactToastify.css";
import ListProductsByBrandWithSearch from "./pages/listProductsByBrandWithSearch";
import PageNotFound from "./pages/pageNotFound404";
import LookUpOrders from "./pages/lookUpOrders";
import FormLogin from "./pages/loginAndRegister";
import LoginScreen from "./pages/loginAndRegister/login";
import ChangePassword from "./pages/information/changePassword";
import withAuth from "./pages/auth";
import PayMentWithUser from "./pages/payment/payMentWithUser";
import TimeLineOrder from "./pages/invoice/timeLineOrder";
import ShowBillCheck from "./pages/showBillCheck";
import Notification from "./pages/notification";

function App() {
  const location = useLocation();
  let routes: RouteObject[] = [
    {
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/tat-ca-san-pham",
          element: <ListProductsByBrand key={location.key} />,
          children: [{ index: true, element: <ProductPage /> }],
        },
        {
          path: path.listProductsByCategory,
          element: <ListProductsByBrand key={location.key} />,
          children: [{ index: true, element: <ProductPage /> }],
        },
        {
          path: path.listProductsByBrand,
          element: <ListProductsByBrand key={location.key} />,
          children: [{ index: true, element: <ProductPage /> }],
        },
        {
          path: path.listProductsByBrandWithSearch,
          element: <ListProductsByBrandWithSearch key={location.key} />,
          children: [{ index: true, element: <ProductPage /> }],
        },

        { path: path.product, element: <ProductPage /> },
        { path: path.cart, element: <CartPage /> },
        { path: path.payment, element: <PaymentPage /> },
        { path: path.payMentWithUser, element: withAuth(PayMentWithUser)() },
        { path: path.invoice, element: withAuth(Invoice)() },
        { path: path.information, element: withAuth(Information)() },
        { path: path.detailOrder, element: <DetailOrder /> },
        // { path: path.addAddress, element: withAuth(AddAddress)() },
        // { path: path.addAddress, element: <ReturnProduct /> },
        { path: path.detailReturn, element: <DetailReturn /> },
        { path: path.lookUpOrders, element: <LookUpOrders /> },
        { path: path.loginScreen, element: <LoginScreen /> },
        { path: path.changePassword, element: <ChangePassword /> },
        { path: path.vnpayment, element: <VnPayPayment /> },
        { path: path.timeLineOrder, element: <TimeLineOrder /> },
        { path: path.showBillCheck, element: <ShowBillCheck /> },
        { path: path.notification, element: <Notification /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ];
  let element = useRoutes(routes);
  return (
    <ShoppingCartProvider>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="w-full max-w-7xl mx-auto  min-w-[6xl]">
          <div className="w-full  flex flex-col flex-1 ">{element}</div>
          <ScrollToTopButton />
        </div>
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
