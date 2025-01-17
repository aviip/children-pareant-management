import { useState } from "react";
import { HiSparkles } from "react-icons/hi";

export default function RewardsPage() {
  // Initial rewards data (available for adding to collection)
  const initialRewardsData = {
    Aryan: [
      { id: 1, description: "75 coins - Chocolate on Sunday" },
      { id: 2, description: "100 coins - Extra 15 mins screen time on Sunday" },
      { id: 3, description: "50 coins - Choose a family movie" },
      { id: 4, description: "150 coins - Trip to the zoo" },
      { id: 5, description: "80 coins - Special bedtime story" },
      { id: 6, description: "120 coins - Visit to the toy store" },
      { id: 7, description: "200 coins - Game night with family" },
      { id: 8, description: "90 coins - Ice cream treat on Saturday" },
    ],
    Anika: [
      { id: 1, description: "70 coins - Extra playtime on Friday" },
      { id: 2, description: "110 coins - Choose a special dessert" },
      { id: 3, description: "55 coins - Art and craft session" },
      { id: 4, description: "140 coins - Outing to a favorite park" },
      { id: 5, description: "85 coins - Family picnic" },
      { id: 6, description: "95 coins - Watch a favorite show" },
      { id: 7, description: "160 coins - Choose dinner menu on Saturday" },
    ],
  };

  const [selectedChild, setSelectedChild] = useState("Aryan");
  const [availableRewards, setAvailableRewards] = useState([]);
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  // Function to handle child selection
  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
    setAvailableRewards([]);
    setRedeemedRewards([]);
  };

  // Function to add reward to "Available Rewards"
  const handleAddToCollection = (reward) => {
    setAvailableRewards((prev) => [...prev, reward]);
  };

  // Function to move a reward to "Redeemed Rewards"
  const handleRedeemReward = (rewardId) => {
    const rewardToRedeem = availableRewards.find((reward) => reward.id === rewardId);
    setAvailableRewards((prev) => prev.filter((reward) => reward.id !== rewardId));
    setRedeemedRewards((prev) => [...prev, rewardToRedeem]);
  };

  // Function to mark a reward as "Completed" (remove from "Redeemed Rewards")
  const handleMarkAsCompleted = (rewardId) => {
    setRedeemedRewards((prev) => prev.filter((reward) => reward.id !== rewardId));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-richblue-700">Reward Suggestions</h2>
        <select
          value={selectedChild}
          onChange={handleChildChange}
          className="px-3 py-2 bg-llblue text-richblue-700 border border-gray-300 rounded-md"
        >
          <option value="Aryan">Aryan</option>
          <option value="Anika">Anika</option>
        </select>
      </div>

      {/* Reward Collection Section */}
      <h3 className="text-xl font-semibold text-richblue-700">New Rewards to add to collection</h3>
      <div className="space-y-4">
        {initialRewardsData[selectedChild].map((reward) => (
          <div key={reward.id} className="bg-llblue border border-gray-200 shadow-lg rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <HiSparkles className="text-richblue-600" />
              <p className="text-lg font-semibold text-richblue-700">{reward.description}</p>
            </div>
            <button
              onClick={() => handleAddToCollection(reward)}
              className="px-3 py-2 bg-caribbeangreen-100 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Add to Reward Collection
            </button>
          </div>
        ))}
      </div>

      {/* Available Rewards Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-richblue-700 mb-4">Available Rewards for the Child</h2>
        <div className="space-y-4">
          {availableRewards.length === 0 ? (
            <p className="text-gray-500">No rewards added to the collection yet.</p>
          ) : (
            availableRewards.map((reward) => (
              <div key={reward.id} className="bg-llblue border border-gray-200 shadow-lg rounded-lg p-4 flex items-center">
                <HiSparkles className="text-richblue-600 mr-2" />
                <p className="text-lg font-semibold text-richblue-700">{reward.description}</p>
              </div>
            ))
          )}
        </div>

        {/* Redeemed Rewards Section */}
        <h2 className="text-2xl font-semibold text-richblue-700 mt-8 mb-4">Redeemed Rewards</h2>
        <div className="space-y-4">
          {redeemedRewards.length === 0 ? (
            <p className="text-gray-500">No rewards redeemed yet.</p>
          ) : (
            redeemedRewards.map((reward) => (
              <div key={reward.id} className="bg-llblue border border-gray-200 shadow-lg rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <HiSparkles className="text-richblue-600" />
                  <p className="text-lg font-semibold text-richblue-700">{reward.description}</p>
                </div>
                <button
                  onClick={() => handleMarkAsCompleted(reward.id)}
                  className="px-3 py-2 bg-blu text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Mark as Completed
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
