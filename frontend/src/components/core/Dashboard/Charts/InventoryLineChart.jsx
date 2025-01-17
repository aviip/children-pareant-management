import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function InventoryLineChart() {
  // State to hold the selected category
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  // Data for each category (based on previous inventory data provided)
  const categoryData = {
    Electronics: {
      labels: ["July", "Aug", "Sept", "Oct", "Nov"],
      datasets: [
        {
          label: "Electronics Inventory",
          data: [1500, 1350, 1430, 1600, 1500],
          borderColor: "#98c3ec", 
          backgroundColor: "rgba(202, 233, 255, 1)", // Consistent blue fill
          fill: true,
          tension: 0.4,
          pointBorderColor: "#032833",
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 3,
          pointRadius: 1,
          pointHoverRadius: 2,
        },
      ],
    },
    FMCG: {
      labels: ["July", "Aug", "Sept", "Oct", "Nov"],
      datasets: [
        {
          label: "FMCG Inventory",
          data: [2800, 3450, 3200, 3000, 3400],
          borderColor: "#98c3ec", // Same color for border consistency
          backgroundColor: "rgba(202, 233, 255, 1)", // Consistent blue fill
          fill: true,
          tension: 0.4,
          pointBorderColor: "#032833",
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 3,
          pointRadius: 1,
          pointHoverRadius: 2,
        },
      ],
    },
    Apparel: {
      labels: ["July", "Aug", "Sept", "Oct", "Nov"],
      datasets: [
        {
          label: "Apparel Inventory",
          data: [800, 920, 1000, 1200, 780],
          borderColor: "#98c3ec", // Same color for border consistency
          backgroundColor: "rgba(202, 233, 255, 1)", // Consistent blue fill
          fill: true,
          tension: 0.4,
          pointBorderColor: "#032833",
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 3,
          pointRadius: 1,
          pointHoverRadius: 2,
        },
      ],
    },
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
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
          text: "Inventory (Units)",
          color: "#333333",
          font: {
            size: 14,
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
        // Start y-axis from slightly below the lowest data point
        min: (ctx) => Math.min(...categoryData[selectedCategory].datasets[0].data) - 100,
      },
    },
    layout: {
      padding: {
        top: 2,
        bottom: 2,
        left: 2,
        right: 2,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
    },
  };

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full h-auto">
      {/* Select dropdown for categories */}
      <h2 className="text-[18px] font-medium text-center text-bold text-richblue-600">Inventory across various categories</h2>
      <div className="w-full flex justify-evenly items-center p-2">
      <h2 className="text-[14px] font-medium text-center text-richblue-400 ">Select a Category :</h2>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-blue-600 py-2 px-4 rounded-lg text-sm text-blue-700"
        >
          <option value="Electronics">Electronics</option>
          <option value="FMCG">FMCG</option>
          <option value="Apparel">Apparel</option>
        </select>
      </div>

      {/* Line chart */}
      <div className="w-full h-[200px]">
        <Line data={categoryData[selectedCategory]} options={options} />
      </div>
    </div>
  );
}

export default InventoryLineChart;
