import React, { useState, useEffect } from "react";
import {fetchChildrenInterestData} from "../../../services/oparations/InterestFormAPI"
import { useDispatch } from "react-redux";

function InterestForm() {
  // State for child selection and form data
  const dispatch = useDispatch()
  const [selectedChild, setSelectedChild] = useState("Aryan");
  const [formData, setFormData] = useState({
    personalityTraits: "",
    hobbies: "",
    likes: "",
    dislikes: "",
    strengths: "",
    weaknesses: "",
    freeTimeActivities: "",
    favoriteSubjects: "",
    schoolTimings: "",
    examDates: "",
  });

  // Mock database with pre-filled data for one child
  const childDatabase = {
    Aryan: {
      personalityTraits: "Curious, Creative",
      hobbies: "Reading, Drawing",
      likes: "Music, Puzzles",
      dislikes: "Loud noises",
      strengths: "Problem-solving, Creativity",
      weaknesses: "Impatience",
      freeTimeActivities: "Playing video games, Painting",
      favoriteSubjects: "Math, Science",
      schoolTimings: "9 AM - 3 PM",
      examDates: "March 1 - March 10",
    },
    Anika: {
      personalityTraits: "",
      hobbies: "",
      likes: "",
      dislikes: "",
      strengths: "",
      weaknesses: "",
      freeTimeActivities: "",
      favoriteSubjects: "",
      schoolTimings: "",
      examDates: "",
    },
  };

  // Load existing data when the selected child changes
  useEffect(() => {
    setFormData(childDatabase[selectedChild] || {});
  }, [selectedChild]);

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for saving form data
  const handleSave =async(e) => {
    e.preventDefault()
    console.log("Saved Data:", formData);
    dispatch(fetchChildrenInterestData(formData));
    alert("Form data has been saved successfully!");
  };

  

  return (
    <div className="p-5 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-4">
      {/* Heading and Child Selection */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-richblue-800 text-3xl font-bold">
          Interest Form for {selectedChild}
        </h2>
        <select
          className="p-2 rounded-md bg-blu text-white font-medium"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          <option value="Aryan">Aryan</option>
          <option value="Anika">Anika</option>
        </select>
      </div>

      {/* Form Fields */}
      <form className="space-y-5">
        {[
          { label: "Personality Traits *", name: "personalityTraits" },
          { label: "Hobbies *", name: "hobbies" },
          { label: "Likes *", name: "likes" },
          { label: "Dislikes *", name: "dislikes" },
          { label: "Strengths *", name: "strengths" },
          { label: "Weaknesses *", name: "weaknesses" },
          { label: "Free Time Activities *", name: "freeTimeActivities" },
          { label: "Favorite Subjects *", name: "favoriteSubjects" },
          { label: "School Timings *", name: "schoolTimings" },
          { label: "Exam Dates (From - To)", name: "examDates" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-richblue-800 font-medium mb-1 block">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-llblue text-black"
              required={field.label.includes("*")}
            />
          </div>
        ))}

        <button
          type="submit"
          onClick={handleSave}
          className="w-full p-3 bg-richblue-600 text-white font-semibold rounded-md hover:bg-richblue-800 transition duration-300"
        >
          Save Answers
        </button>
      </form>
    </div>
  );
}

export default InterestForm;
