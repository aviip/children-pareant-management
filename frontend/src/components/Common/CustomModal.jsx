import React from "react";

function CustomModal({ modalData, inputValue, setInputValue, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-lg font-semibold mb-2">{modalData.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{modalData.description}</p>
        <input
          type="number"
          placeholder="Enter new value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-richblue-600 text-white"
            onClick={modalData.onCancel}
          >
            {modalData.cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blu text-white"
            onClick={onSave}
          >
            {modalData.saveText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
