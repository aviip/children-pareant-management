import React, { useState } from "react";
import WeeklyReportLineChart from "./Charts/WeeklyReportLineChart";
import { RiCoinsFill } from "react-icons/ri";
import CustomModal from "../../Common/CustomModal";
import { FaUserClock } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

function ChildDashboard() {
  // State to hold the selected child
  const [selectedChild, setSelectedChild] = useState("Aryan");

  // Sample data for two children (this can be fetched from a backend)
  const childrenData = {
    Aryan: {
      weeklyUsage: [2, 3.5, 4, 5, 3, 2.5, 1.5],
      coinsGenerated: 150,
      continuousUsageLimit: "60",
      dailyAverageLimit: "4 hours",
      modelPrediction: "3.5 hours",
    },
    Anika: {
      weeklyUsage: [1, 2.5, 3, 4, 2.5, 2, 1],
      coinsGenerated: 200,
      continuousUsageLimit: "45 ",
      dailyAverageLimit: "3 hours",
      modelPrediction: "2.8 hours",
    },
  };

  // Handle child selection change
  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  // Get data for the selected child
  const childData = childrenData[selectedChild];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsageLimit, setNewUsageLimit] = useState("");

  // Handler to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handler to save the new value and update the state
  const handleSave = () => {
    //updateChildData({ ...childData, continuousUsageLimit: newUsageLimit });
    setIsModalOpen(false);
  };
  return (
    <div className="w-full h-full px-6 pt-1 bg-lightblue-100">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-richblue-700">
          Dashboard for {selectedChild}
        </h1>
        <div>
          <select
            value={selectedChild}
            onChange={handleChildChange}
            className="border border-blue-600 py-2 px-4 rounded-lg text-sm text-blue-700"
          >
            <option value="Aryan">Aryan</option>
            <option value="Anika">Anika</option>
          </select>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex gap-6">
        {/* Left side: Line Chart */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          <WeeklyReportLineChart data={childData.weeklyUsage} />
        </div>

        {/* Right side: KPIs/Statistics */}
        <div className="w-2/5 grid grid-cols-2 gap-4">
          {/* KPI Cards */}
          <div className="bg-blu w-full  p-4 border border-lblue shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start justify-items-end gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">Reward Coins of child </p>
                        <h3 className="text-white font-semibold text-xl">{childData.coinsGenerated}</h3>
                        </div>  
                        <div>
                            <RiCoinsFill className="text-richblue-600 w-[40px] h-[40px]"/>
                        </div>
                    </div>
                </div>
                <div
        className="bg-richblue-500 w-full p-4 border border-l-blue-25 shadow-md rounded-lg shadow-dblue cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex flex-row items-start gap-x-3">
          <div className="flex flex-col justify-center gap-y-1">
            <p className="text-white font-medium opacity-80 text-lg">Continuous Usage Limit</p>
            <h3 className="text-white font-semibold text-xl">{childData.continuousUsageLimit} mins</h3>
          </div>
          <div>
            <FaClock className="text-lblue w-[30px] h-[30px]" />
          </div>
        </div>
      </div>
                <div className="bg-richblue-500 w-full p-4 border border-l-blue-25 shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">Daily Average Limit</p>
                        <h3 className="text-white font-semibold text-xl">{childData.dailyAverageLimit}</h3>
                        </div>  
                        <div>
                            <FaUserClock className="text-lblue w-[37px] h-[37px]"/>
                        </div>
                    </div>
                </div>
                <div className="bg-blu w-full  p-4 border border-lblue shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start justify-items-end gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">Model Predicted Value</p>
                        <h3 className="text-white font-semibold text-xl">{childData.modelPrediction}</h3>
                        </div>  
                        <div>
                            <FaUserClock className="text-richblue-600 w-[36px] h-[36px]"/>
                        </div>
                    </div>
                </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-6 p-4 bg-lightblue-200 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-richblue-600 mb-2">Insights</h2>
        <ul className="list-disc pl-6 gap-y-3">
        <div className="flex items-center bg-blu text-white rounded-lg p-[5px] w-full shadow-lg mr-4">
          <HiSparkles className="text-white"/>
          <span className="text-md pl-3 font-semibold">
          The child's continuous phone usage time is {childData.continuousUsageLimit}. For better health, it should be reduced by 30%.
          </span>
        </div>
        <div className="flex items-center bg-richblue-700 text-white rounded-lg mt-4 p-[7px] w-full shadow-lg mr-4">
          <HiSparkles className="text-white"/>
          <span className="text-md pl-3 font-semibold">
          The average daily usage time is {childData.dailyAverageLimit}, but it could be reduced to {childData.modelPrediction} by selecting more activities.
          </span>
        </div>
        </ul>
      </div>
       {/* Modal for Updating Continuous Usage Limit */}
       {isModalOpen && (
        <CustomModal
          modalData={{
            title: "Update Continuous Usage Limit",
            description: "Set a new value for Continuous Usage Limit:",
            cancelText: "Cancel",
            saveText: "Save",
            onCancel: () => setIsModalOpen(false),
          }}
          inputValue={newUsageLimit}
          setInputValue={setNewUsageLimit}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ChildDashboard;
