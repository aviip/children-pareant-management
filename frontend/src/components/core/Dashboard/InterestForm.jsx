import React, { useState, useEffect } from "react";
import {
  fetchChildrenInterestData,
  getAllChildren,
} from "../../../services/oparations/InterestFormAPI";
import { useDispatch, useSelector } from "react-redux";
import { setInterestData } from "../../../slices/profileSlice";

function InterestForm() {
  const dispatch = useDispatch();
  const { children, currentlySelectedChild, interestData } = useSelector(
    (state) => state.profile
  );
  const [selectedChildId, setSelectedChildId] = useState("");

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
  console.log("formData:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch(fetchChildrenInterestData(formData, selectedChildId));
    const newInterestData = { childId: selectedChildId, ...formData };
    dispatch(setInterestData(newInterestData));
    alert("Form data has been saved successfully!");
  };

  useEffect(() => {
    if (children.length === 0) {
      dispatch(getAllChildren());
    }
  }, [dispatch, children.length]);

  // ------------ THIS NEEDS TO BE FIXED ------------

  // useEffect(() => {
  //   if (children.length > 0) {
  //     setSelectedChildId(interestData[0]?.childId);
  //     setFormData(interestData[0] || formData);
  //   }
  // }, [selectedChildId, children.length]);

  // ------------ ------------

  const handleChildChange = (e) => {
    const selectedId = e.target.value;
    setSelectedChildId(selectedId);
    const selectedChild = interestData.find(
      (child) => child.childId === selectedId
    );
    setFormData(selectedChild);
  };

  return (
    <div className="p-5 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-richblue-800 text-3xl font-bold">
          Interest Form for {currentlySelectedChild?.firstName || "Child"}
        </h2>
        <select
          className="p-2 rounded-md bg-blu text-white font-medium"
          value={selectedChildId}
          onChange={handleChildChange}
        >
          {children.map((child) => (
            <option key={child._id} value={child._id}>
              {child.firstName} {child.lastName}
            </option>
          ))}
        </select>
      </div>

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
