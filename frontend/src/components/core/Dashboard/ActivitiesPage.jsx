import React, { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi";
import ConfirmationModal from "../../Common/ConfirmationModal";

function ActivitiesPage() {
  const [selectedChild, setSelectedChild] = useState("Aryan");
  const [scheduledActivities, setScheduledActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openFeedbackModal = (activity) => {
    setModalData({
      text1: `Provide feedback for ${activity.name}`,
      text2: "Please rate the activity on various parameters.",
      activityId: activity.id,
    });
    setIsModalOpen(true);
  };

  // Mock database for child activities
  const childActivities = {
    Aryan: [
      { id: 1, name: "Reading", description: "Improve comprehension skills", duration: "1 hr", coins: 10, benefit: "Enhances vocabulary" },
      { id: 2, name: "Math Puzzles", description: "Solve fun math problems", duration: "1.5 hrs", coins: 15, benefit: "Boosts problem-solving skills" },
      { id: 3, name: "Art & Craft", description: "Create beautiful crafts", duration: "2 hrs", coins: 20, benefit: "Enhances creativity" },
    ],
    Anika: [],
  };

  const dailyActivities = [
    { id: 1, name: "Drawing", description: "Sketch and draw", duration: "1 hr", coins: 5, benefit: "Improves creativity" },
    { id: 2, name: "Exercise", description: "Morning workout", duration: "1 hr", coins: 10, benefit: "Boosts physical health" },
    { id: 3, name: "Music Practice", description: "Practice musical instrument", duration: "2 hrs", coins: 20, benefit: "Enhances musical skills" },
    { id: 4, name: "Story Writing", description: "Write a short story", duration: "1 hr", coins: 10, benefit: "Improves writing skills" },
    { id: 5, name: "Science Experiment", description: "Fun DIY experiment", duration: "2 hrs", coins: 25, benefit: "Enhances scientific thinking" },
    { id: 6, name: "Language Practice", description: "Learn a new language", duration: "1.5 hrs", coins: 15, benefit: "Improves language skills" },
    { id: 7, name: "Gardening", description: "Plant and water plants", duration: "1 hr", coins: 10, benefit: "Teaches responsibility" },
    { id: 8, name: "Meditation", description: "Mindfulness session", duration: "30 mins", coins: 5, benefit: "Reduces stress" },
    { id: 9, name: "Cooking", description: "Learn to cook a new dish", duration: "2 hrs", coins: 20, benefit: "Builds life skills" },
  ];

  // Load ongoing activities for the selected child
  useEffect(() => {
    setScheduledActivities(childActivities[selectedChild] || []);
    setSelectedActivities([]);
  }, [selectedChild]);

  // Handle activity selection
  const handleActivitySelect = (activityId) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter((id) => id !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  // Save selected activities
  const handleSave = () => {
    console.log("Selected Activities:", selectedActivities);
    alert("Selected activities have been saved!");
  };

  return (
    <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-8">
      {/* Heading and Child Selection */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-richblue-900 text-3xl font-bold">Activities for {selectedChild}</h2>
        <select
          className="p-2 rounded-md bg-blu text-white font-medium"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          <option value="Aryan">Aryan</option>
          <option value="Anika">Anika</option>
        </select>
      </div>

      {/* Ongoing/Scheduled Activities */}
      <h3 className="text-richblue-900 text-2xl font-semibold mb-4">Ongoing/Scheduled Activities</h3>
      <div className="flex flex-col gap-y-4">
        {scheduledActivities.length > 0 ? (
          scheduledActivities.map((activity) => (
            <div key={activity.id} className="bg-llblue border border-gray-200 shadow-lg rounded-lg p-4 flex justify-evenly">
              <div className="flex gap-x-1 px-6 w-full">
                <div className="flex flex-col gap-y-3 justify-center items-start">
                <h3 className="text-xl font-bold text-richblue-700">{activity.name}</h3>
                <p className="text-md text-richblue-600"><strong>Description:</strong> {activity.description}</p>
                <p className="text-md text-richblue-800"><HiSparkles className="inline-block"/> {activity.benefit}</p>
                </div>
                <div className="flex flex-col w-full gap-y-3 justify-center items-end">
                <p className="text-md text-richblue-600"><strong>Duration:</strong> {activity.duration}</p>
                <p className="text-md text-richblue-600"><strong>Coins:</strong> {activity.coins}</p>
                <button
                className="px-4 py-2 bg-blu text-white font-semibold rounded-lg mt-2"
                onClick={() => openFeedbackModal(activity)}
              >
                Verify and provide feedback
              </button>
                </div>
             </div>
            </div>
          ))
        ) : (
          <p className="text-richblue-900">No scheduled activities for {selectedChild}.</p>
        )}
      </div>

      {/* Daily Activities Selection Chart */}
      <h3 className="text-richblue-800 text-2xl font-semibold my-6">Daily Activities Selection Chart</h3>
      <div className="grid grid-cols-3 gap-4">
        {dailyActivities.map((activity) => (
          <div
            key={activity.id}
            className={`border rounded-lg shadow-lg p-4 cursor-pointer ${
              selectedActivities.includes(activity.id) ? "bg-blue-5" : "bg-white"
            }`}
            onClick={() => handleActivitySelect(activity.id)}
          >
            <h4 className="text-lg font-semibold mb-2">{activity.name}</h4>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-sm text-gray-800"><strong>Timing:</strong> {activity.duration}</p>
            <p className="text-sm text-gray-800"><strong>Coins:</strong> {activity.coins}</p>
            <div className="text-sm mt-4 p-2 rounded-lg bg-caribbeangreen-50 flex items-center">
              <HiSparkles className="text-richblue-800 mr-2"/>
              <p className="font-semibold">{activity.benefit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        className="w-42 p-3 bg-richblue-600 text-white font-semibold rounded-md hover:bg-richblue-800 transition duration-300 mt-6"
      >
        Save Changes
      </button>
      {isModalOpen && <ConfirmationModal modalData={modalData} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default ActivitiesPage;
