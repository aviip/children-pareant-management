import { useState } from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData, onClose }) {
  const [ratings, setRatings] = useState({
    competitiveSpirit: 0,
    enjoyment: 0,
    challengeAcceptance: 0,
    taskCompletion: 0,
  });

  const handleRatingChange = (event) => {
    const { name, value } = event.target;
    setRatings({ ...ratings, [name]: parseInt(value) });
  };

  const saveFeedback = () => {
    // Placeholder function to save feedback to the database
    console.log("Saving feedback:", {
      activityId: modalData.activityId,
      ratings,
    });
    // Implement API call here to save feedback in the database
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-white bg-opacity-20 backdrop-blur-sm">
      <div className="w-11/12 max-w-[400px] rounded-lg border border-richblue-400 bg-blue-5 p-6">
        <p className="text-2xl font-semibold text-richblue-800">{modalData?.text1}</p>
        <p className="mt-2 mb-5 text-richblue-700 opacity-80">{modalData?.text2}</p>

        {/* Feedback Questions */}
        <div className="flex flex-col gap-4">
          <label className="text-md text-richblue-700">
            Competitive Spirit (1-5)
            <input
              type="number"
              name="competitiveSpirit"
              min="1"
              max="5"
              value={ratings.competitiveSpirit}
              onChange={handleRatingChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="text-md text-richblue-700">
            Enjoyment Level (1-5)
            <input
              type="number"
              name="enjoyment"
              min="1"
              max="5"
              value={ratings.enjoyment}
              onChange={handleRatingChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="text-md text-richblue-700">
            Challenge Acceptance (1-5)
            <input
              type="number"
              name="challengeAcceptance"
              min="1"
              max="5"
              value={ratings.challengeAcceptance}
              onChange={handleRatingChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="text-md text-richblue-700">
            Task Completion (1-5)
            <input
              type="number"
              name="taskCompletion"
              min="1"
              max="5"
              value={ratings.taskCompletion}
              onChange={handleRatingChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-x-4 mt-5">
          <IconBtn onclick={onClose} text="Cancel" />
          <button
            className="cursor-pointer rounded-md bg-blu py-[8px] px-[20px] font-semibold text-white"
            onClick={saveFeedback}
          >
            Save Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
