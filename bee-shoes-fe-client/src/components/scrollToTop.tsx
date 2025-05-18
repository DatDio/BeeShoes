import React, { useState, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="fixed bottom-2 right-2 ">
      {isVisible && (
        <button
          type="button"
          onClick={() => {
            scrollToTop();
          }}
          className="bg-[#F5f5f5] hover:bg-white focus:ring-[#FFBA00] inline-flex items-center rounded-full p-3  text-[#000] shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
