import React, { useState } from "react";

function DeliveryModal({ modalData }) {
  const [deliveryId, setDeliveryId] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{modalData.text1}</h2>
        <p className="text-sm text-gray-600 mb-4">{modalData.text2}</p>
        <input
          type="text"
          placeholder="Enter delivery ID"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-richblue-600 text-white"
            onClick={() => modalData.btn2Handler()}
          >
            {modalData.btn2Text}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blu text-white"
            onClick={() => modalData.onAssignDelivery(deliveryId)}
          >
            {modalData.btn1Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryModal;
