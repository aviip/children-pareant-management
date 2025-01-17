import React from "react";
import GoogleMapReact from 'google-map-react';
import IconBtn from "./IconBtn";

const MapMarker = ({ text }) => (
  <div className="text-red-500 font-bold">
    <i className="fas fa-map-marker-alt"></i> {text}
  </div>
);

export default function ConfirmationModal({ modalData,mapImage  }) {


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-20 backdrop-blur-sm">
      <div className="w-11/12 max-w-[560px] rounded-lg border border-richblue-400 bg-blue-5 p-6">
        <img src={mapImage} alt="QR Code" className="w-full h-auto mb-4" />
    
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
