import { Spinner } from "flowbite-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className=" w-full my-2 mx-auto">
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-blue-400 rounded-full" />
        <div className="w-8 h-8 bg-blue-400 rounded-full" />
        <div className="w-8 h-8 bg-blue-400 rounded-full" />
      </div>
    </div>
  );
}
