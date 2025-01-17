import React from "react";

const RestockTable = () => {
  const restockAlerts = [
    { productName: "Laptops", currentStock: 15, reorderThreshold: 50, daysLeft: 5, supplierTime: 3 },
    { productName: "T-Shirts", currentStock: 25, reorderThreshold: 100, daysLeft: 3, supplierTime: 2 },
    { productName: "Toothpaste", currentStock: 40, reorderThreshold: 150, daysLeft: 4, supplierTime: 4 },
    { productName: "Shirts", currentStock: 20, reorderThreshold: 80, daysLeft: 6, supplierTime: 2 },
    { productName: "Refrigerators", currentStock: 5, reorderThreshold: 20, daysLeft: 2, supplierTime: 7 },
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto p-[10px] border-[1px] border-blue-800 rounded-lg shadow-sm shadow-llblue ">
      <h2 className="text-xl font-medium text-center text-richblue-500 mb-2">Restock Alerts</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blu text-white text-xs font-medium">
            <th className="py-1 px-4 border-b-2 border-blue-500">Product Name</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Current Stock (Units)</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Reorder Threshold (Units)</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Days Left to Depletion</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Supplier Response Time (Days)</th>
          </tr>
        </thead>
        <tbody>
          {restockAlerts.map((alert, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-[#dcecff]" : "bg-white"} text-richblue-600 text-xs font-inter `}
            >
              <td className="py-2 px-2 border-b text-center border-blue-300">{alert.productName}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{alert.currentStock}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{alert.reorderThreshold}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{alert.daysLeft}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{alert.supplierTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestockTable;
