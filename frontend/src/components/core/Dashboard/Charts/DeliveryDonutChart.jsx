import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function DeliveryDonutChart() {
  const data = {
    labels: ["Completed", "In Progress", "Delayed"],
    datasets: [
      {
        label: "Delivery Status",
        data: [45, 30, 5], // Delivery status data
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Light blue for Completed
          "rgba(0, 101, 202, 1)", // Lighter blue for In Progress
          "rgba(255, 99, 132, 0.7)", // Red for Delayed
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Dark blue border for consistency
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#032833", // Text color
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full pb-4  h-[260px] mx-auto">
      <h2 className="text-xl font-medium text-center text-richblue-500 mb-2">Delivery Status of Trucks</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DeliveryDonutChart;
