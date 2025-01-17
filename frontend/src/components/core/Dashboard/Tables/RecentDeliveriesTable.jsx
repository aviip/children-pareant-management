import React from "react";

const RecentDeliveriesTable = () => {
  const recentDeliveries = [
    {
      deliveryId: "DLV001",
      supplierName: "Saksham Pvt",
      productsDelivered: "Laptops",
      quantity: 50,
      deliveryDate: "15-Oct-2024",
      status: "Completed",
    },
    {
      deliveryId: "DLV002",
      supplierName: "Hera Ltd",
      productsDelivered: "T-Shirts",
      quantity: 200,
      deliveryDate: "16-Oct-2024",
      status: "Completed",
    },
    {
      deliveryId: "DLV003",
      supplierName: "Adhya FMCG",
      productsDelivered: "Toothpaste, Soap",
      quantity: 500,
      deliveryDate: "16-Oct-2024",
      status: "Delayed",
    },
    {
      deliveryId: "DLV005",
      supplierName: "Nice FMCG",
      productsDelivered: "Shampoo",
      quantity: 10,
      deliveryDate: "17-Oct-2024",
      status: "In Progress",
    },
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto p-[10px] border-[1px] border-blue-800 rounded-lg shadow-sm shadow-llblue">
      <h2 className="text-xl font-medium text-center text-richblue-500 mb-2">Recent Deliveries</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blu text-white text-xs font-medium">
            <th className="py-1 px-4 border-b-2 border-blue-500">Delivery ID</th>
            <th className="py-1 px-4 border-b-2 border-blue-500">Supplier Name</th>
            <th className="py-1 px-4 border-b-2 border-blue-500">Products Delivered</th>
            <th className="py-1 px-4 border-b-2 border-blue-500">Quantity (Units)</th>
            <th className="py-1 px-4 border-b-2 border-blue-500">Delivery Date</th>
            <th className="py-1 px-4 border-b-2 border-blue-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentDeliveries.map((delivery, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#dcecff]" : "bg-white"
              } text-richblue-600 text-xs font-inter`}
            >
              <td className="py-2 px-2 border-b text-center border-blue-300">{delivery.deliveryId}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{delivery.supplierName}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{delivery.productsDelivered}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{delivery.quantity}</td>
              <td className="py-2 px-2 border-b text-center border-blue-300">{delivery.deliveryDate}</td>
              <td className={`py-2 px-2 border-b text-center border-blue-300 ${delivery.status === 'Delayed' ? 'text-red-500' : delivery.status === 'In Progress' ? 'text-orange-500' : 'text-green-500'}`}>
                {delivery.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDeliveriesTable;
