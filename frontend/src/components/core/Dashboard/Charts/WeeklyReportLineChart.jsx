import React from "react";
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

function WeeklyReportLineChart({ data }) {
  // Data for the weekly mobile usage report
  const weeklyData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Mobile Usage (Hours)",
        data: data, 
        borderColor: "#98c3ec", // Light blue color for the line
        backgroundColor: "rgba(202, 233, 255, 0.5)", // Light blue fill for the area under the line
        fill: true,
        tension: 0.4,
        pointBorderColor: "#032833", // Darker color for points
        pointBackgroundColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Options for the line chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#032833",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
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
          text: "Hours Spent",
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
        min: 0, // Start y-axis from 0
        suggestedMax: 6, // Maximum value for the y-axis
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
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

  return (
    <div className="flex flex-col items-center w-full h-auto">
      <h2 className="text-[20px] font-bold text-center text-richblue-600 mb-4">
        Weekly Mobile Usage Report
      </h2>
      {/* Line chart for weekly report */}
      <div className="w-full h-[320px] p-4 bg-white rounded-lg border border-richblue-500 shadow-lg">
        <Line data={weeklyData} options={options} />
      </div>
    </div>
  );
}

export default WeeklyReportLineChart;
