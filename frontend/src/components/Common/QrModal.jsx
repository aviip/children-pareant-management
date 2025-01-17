import React from "react";
import IconBtn from "./IconBtn";

export default function QRModal({ modalData, qrImage }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-20 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblue-400 bg-blue-5 p-6">
        <img src={qrImage} alt="QR Code" className="w-full h-auto mb-4" />
        <p className="text-xl text-center font-semibold text-richblue-800">
          {modalData?.text1}
        </p>
        <div className="flex items-center gap-x-4 mt-2">
          <button
            className="cursor-pointer rounded-md mx-auto bg-richblue-400 py-[6px] px-[24px] font-semibold text-white"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
