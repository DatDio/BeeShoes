import React from "react";
interface TitleBrandType {
  title: string;
  subtitle: string;
}
const Line = () => {
  return (
    <div className="border-t-2 border-[#f1f1f1] border-solid w-full h-[2px] my-3" />
  );
};
const TitleBrand = ({ title, subtitle }: TitleBrandType) => {
  return (
    <div className="w-full mt-10">
      <Line />
      <p className=" text-2xl font-mono text-center uppercase   ">{title}</p>
      <p className="text-[#999] italic  text-sm font-semibold text-center uppercase mb-5 ">
        {subtitle}
      </p>
    </div>
  );
};

export default TitleBrand;
