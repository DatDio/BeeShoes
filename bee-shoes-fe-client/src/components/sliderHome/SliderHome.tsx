import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Images from "../../static";

const SliderHome = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const listBanner = [
    Images.banner01,
    Images.banner02,
    Images.banner03,
    Images.banner04,
    Images.banner05,
    Images.banner06,
  ];
  return (
    <div className="w-full flex">
      <div className=" w-[80%]  ">
        <Slider {...settings}>
          {listBanner.map((item, index) => {
            return (
              <div
                className="flex flex-col w-full items-center justify-center "
                key={index}
              >
                <img
                  src={item}
                  className="w-full h-[450px] object-cover mx-auto"
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="h-[450px]  ml-1 flex flex-col justify-between">
        <img
          src={Images.banner06}
          alt=""
          className="w-full h-[33%] object-cover"
        />
        <img
          src={Images.banner07}
          alt=""
          className="w-full h-[33%]  object-cover "
        />
        <img
          src={Images.banner08}
          alt=""
          className="w-full h-[33%]   object-cover"
        />
      </div>
    </div>
  );
};
export default SliderHome;
