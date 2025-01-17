import { useState } from "react";

export default function GoalsPage() {
  const [selectedChild, setSelectedChild] = useState("Aryan");
  const [isEditing, setIsEditing] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [timetable, setTimetable] = useState({
    Aryan: [
      { time: "3:30 PM", activity: "Snack Time" },
      { time: "4:00 PM", activity: "Homework" },
      { time: "5:00 PM", activity: "Reading Time" },
      { time: "5:30 PM", activity: "Outdoor Play" },
      { time: "6:30 PM", activity: "Screen Time (limited to 30 mins)" },
      { time: "7:00 PM", activity: "Dinner with Family" },
      { time: "8:00 PM", activity: "Story Time and Relaxation" },
    ],
    Anika: [
      { time: "3:30 PM", activity: "Snack Time" },
      { time: "4:00 PM", activity: "Craft and Creativity" },
      { time: "5:00 PM", activity: "Homework" },
      { time: "5:30 PM", activity: "Outdoor Play" },
      { time: "6:30 PM", activity: "Screen Time (limited to 30 mins)" },
      { time: "7:00 PM", activity: "Dinner with Family" },
      { time: "8:00 PM", activity: "Relaxing Music and Bedtime" },
    ],
  });

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
    setIsEditing(false);
    setSuggestion("");
  };

  const handleApprove = () => {
    alert(`Timetable for ${selectedChild} approved!`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSuggestionChange = (event) => {
    setSuggestion(event.target.value);
  };

  const handleSaveSuggestion = () => {
    // Placeholder for AI-generated new timetable based on suggestion
    alert(`Suggestion saved! New timetable for ${selectedChild} will be generated.`);
    setIsEditing(false);
    setSuggestion("");
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-richblue-700">Daily Goals and Activities Tracking Page</h2>
        <select
          value={selectedChild}
          onChange={handleChildChange}
          className="px-3 py-2 bg-llblue text-richblue-700 border border-gray-300 rounded-md"
        >
          <option value="Aryan">Aryan</option>
          <option value="Anika">Anika</option>
        </select>
      </div>

      {/* Timetable Section */}
      <h3 className="text-xl font-semibold text-richblue-700">
        Scheduled Timetable for {selectedChild}
      </h3>
      <div className="space-y-2">
        {timetable[selectedChild].map((entry, index) => (
          <div key={index} className="flex justify-between items-center bg-llblue border border-gray-200 shadow-lg rounded-lg p-4">
            <span className="text-lg font-semibold text-richblue-700">{entry.time}</span>
            <span className="text-lg text-richblue-600">{entry.activity}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-caribbeangreen-100 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Approve Timetable
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blu text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Make Changes
        </button>
      </div>

      {/* Suggestion Input Box */}
      {isEditing && (
        <div className="mt-4">
          <textarea
            value={suggestion}
            onChange={handleSuggestionChange}
            placeholder="Enter your suggestions for changes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
          <button
            onClick={handleSaveSuggestion}
            className="mt-2 px-4 py-2 bg-blu text-white font-semibold rounded-lg hover:bg-purple-600"
          >
            Save Suggestion
          </button>
        </div>
      )}
    </div>
  );
}
