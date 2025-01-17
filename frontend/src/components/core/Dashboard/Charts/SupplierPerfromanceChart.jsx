import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SupplierPerfromanceChart() {
  // Data for the bar chart (on-time vs delayed deliveries)
  const data = {
    labels: ["Saksham Pvt", "Adhya FMCG", "Nice FMCG", "Hera Ltd"],
    datasets: [
      {
        label: "On-Time Deliveries (Units)",
        data: [45, 35, 40, 25], // Data for on-time deliveries
        backgroundColor: "#98c3ec", // Light blue for on-time
        borderColor: "#032833",
        borderWidth: 1,
      },
      {
        label: "Delayed Deliveries (Units)",
        data: [5, 10, 5, 5], // Data for delayed deliveries
        backgroundColor: "#1866b4", // Dark blue for delayed
        borderColor: "#032833",
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Supplier Delivery Performance: On-Time vs Delayed",
        font: {
          size: 15,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#032833",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "No of Deliveries(Units)",
          color: "#333333",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          color: "#032833",
        },
        grid: {
          borderDash: [5, 5],
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="pb-2">
      <Bar data={data} options={options} height={250} width={390} />
    </div>
  );
}

export default SupplierPerfromanceChart;
