import React, { useEffect, useState } from "react";
import InvoiceAll from "./invoiceAll";
import { useShoppingCart } from "../../context/shoppingCart.context";
interface StatusCounts {
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
}
const Invoice = () => {
  const { userPrf } = useShoppingCart();
  const [activeTab, setActiveTab] = React.useState(0);
  const _invoiceAll = React.useMemo(() => <InvoiceAll status={null} />, []);
  const _waitForPay = React.useMemo(() => <InvoiceAll status={2} />, []);
  const _transport = React.useMemo(() => <InvoiceAll status={4} />, []);
  const _delivering = React.useMemo(() => <InvoiceAll status={5} />, []);
  const _complete = React.useMemo(() => <InvoiceAll status={6} />, []);
  const _cancelled = React.useMemo(() => <InvoiceAll status={7} />, []);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-between shadow-lg w-[80%] mx-auto">
        {/* Tab buttons */}
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 0
              ? "text-red-400  font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm  "
          }`}
          onClick={() => handleTabClick(0)}
        >
          Tất cả
        </button>
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 1
              ? "text-red-400  font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm    "
          }`}
          onClick={() => handleTabClick(1)}
        >
          Chờ xác nhận
        </button>
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 2
              ? "text-red-400  relative font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm    "
          }`}
          onClick={() => handleTabClick(2)}
        >
          Chờ giao
        </button>
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 3
              ? "text-red-400  font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm    "
          }`}
          onClick={() => handleTabClick(3)}
        >
          Đang giao
        </button>
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 4
              ? "text-red-400  font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm    "
          }`}
          onClick={() => handleTabClick(4)}
        >
          Hoàn thành
        </button>
        <button
          className={`px-3 py-2 h-fit w-fit  ${
            activeTab === 5
              ? "text-red-400  font-semibold text-sm   border-b-2  border-red-400 border-solid"
              : "text-[#333]  font-semibold text-sm    "
          }`}
          onClick={() => handleTabClick(5)}
        >
          Đã hủy
        </button>
      </div>
      <div className="w-full mt-2">
        {activeTab === 0 && _invoiceAll}
        {activeTab === 1 && _waitForPay}
        {activeTab === 2 && _transport}
        {activeTab === 3 && _delivering}
        {activeTab === 4 && _complete}
        {activeTab === 5 && _cancelled}
      </div>
    </div>
  );
};

export default Invoice;
