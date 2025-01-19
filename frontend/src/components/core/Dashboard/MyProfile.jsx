import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parentImage from "../../../assets/Images/profile.jpg";
import IconBtn from "../../Common/IconBtn";
import { useCallback, useEffect, useState } from "react";
import {
  addChildUnderMe,
  getAllChildren,
} from "../../../services/oparations/InterestFormAPI";

export default function ParentProfile() {
  const { user } = useSelector((state) => state.profile);
  const [children, setChildren] = useState(user?.children || []);
  const [newChild, setNewChild] = useState({ name: "", age: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddChild = () => {
    if (newChild.name && newChild.age) {
      // Prepare the child data for the Redux action
      const childData = {
        firstName: newChild.name,
        lastName: user?.lastName,
        age: newChild.age,
        platform: "web",
      };

      // Dispatch the Redux action
      dispatch(addChildUnderMe(childData, navigate));

      // Clear the input fields after dispatch
      setNewChild({ name: "", age: "" });
    } else {
      alert("Please fill in both name and age before saving.");
    }
  };

  useEffect(() => {
    // dispatch(getAllChildren());
  }, [user?.children]);

  return (
    <>
      <h1 className="mb-3 text-3xl font-medium text-black">
        Hello, Super Parent! 👋
      </h1>
      {/* Parent Info Box */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={parentImage}
            alt="Parent Image"
            className="aspect-square w-[68px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-ddblue">
              {user?.firstName || "Parent Name"}
            </p>
            <div className="flex gap-x-5 justify-center items-center">
              <p className="text-md text-richblue-800">
                {user?.email || "parent@example.com"}
              </p>
              <p className="text-md text-richblue-800">
                {user?.phone || "+91 1234567890"}
              </p>
            </div>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Children Info Box */}
      <div className="mt-4 mb-1 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblue-900">
            Registered Children
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {children.length > 0 ? (
            children.map((child, index) => (
              <div
                key={index}
                className="rounded-md bg-lightblue-500 p-2 px-4 text-sm text-ddblue"
              >
                {child.name}, Age: {child.age}
              </div>
            ))
          ) : (
            <p className="text-sm text-richblue-800">
              No children registered yet. Let's add one!
            </p>
          )}
        </div>
      </div>

      {/* Add Child Box */}
      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">Add a Child</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-6 items-center justify-center">
            <input
              type="text"
              placeholder="Child's Name"
              value={newChild.name}
              required
              onChange={(e) =>
                setNewChild({ ...newChild, name: e.target.value })
              }
              className="rounded-md w-full border-[1px] border-richblue-300 p-2"
            />
            <input
              type="number"
              placeholder="Child's Age"
              value={newChild.age}
              required
              onChange={(e) =>
                setNewChild({ ...newChild, age: e.target.value })
              }
              className="rounded-md w-full border-[1px] border-richblue-300 p-2"
            />
          </div>
          <IconBtn
            text="Save Child"
            onclick={handleAddChild}
            className="text-center mx-auto w-40"
          />
        </div>
      </div>
    </>
  );
}
