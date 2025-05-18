import React from "react";

const LogoutScreen = ({ setShowMoal }: { setShowMoal: any }) => {
  return (
    <div className="w-full h-full  ">
      <div className="p-2 px-3 bg-slate-500 w-fit  text-white mx-auto mt-20">
        <button
          onClick={() => {
            setShowMoal(true);
          }}
        >
          Xác nhận đăng xuất ngay
        </button>
      </div>
    </div>
  );
};

export default LogoutScreen;
