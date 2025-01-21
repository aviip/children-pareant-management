import { toast } from "react-hot-toast";

import { setLoading } from "../../slices/authSlice";
import {
  addChild,
  getChildren,
  setInterestData,
} from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { parentEndpoints } from "../api";

const {
  ADD_CHILD_UNDER_ME,
  GET_MOBILE_USAGE,
  FETCH_CHILDREN_INTEREST_DATA,
  INSERT_CHILDREN_INTEREST,
  GET_ALL_CHILDREN_DATA,
} = parentEndpoints;

export function fetchChildrenInterestData(fromData, childrenId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log("interest api calling.....");
      //   const platform = "web";
      const payload = {
        ...fromData,
        childrenId,
        platform: "web",
      };
      // fromData = { ...fromData, "childrenId": "672df6b26045c53f2271c587", platform: platform }
      const response = await apiConnector(
        "POST",
        INSERT_CHILDREN_INTEREST,
        payload
      );

      console.log("FORM INTEREST INSERT RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response?.data?.message);
      //   dispatch(addChild(response.data.data.child));
      //   navigate("/dashboard/success");
    } catch (error) {
      console.log("FORM INTEREST INSERT ERROR............", error);
      toast.error("Interest Insert updation failed!");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function addChildUnderMe(childData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Adding child...");
    dispatch(setLoading(true));

    try {
      // Call the API to add the child
      const response = await apiConnector(
        "POST",
        ADD_CHILD_UNDER_ME,
        childData
      );

      console.log("ADD_CHILD_UNDER_ME API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message); // Handle unsuccessful response
      }

      // Dispatch the addChild action to update the children in Redux state
      dispatch(addChild(response.data.data));
      toast.success("Child added successfully!");

      // Optionally navigate to another page after success
      navigate("/dashboard/interest-form");
    } catch (error) {
      console.error("ADD_CHILD_UNDER_ME API ERROR:", error);
      toast.error(error.message || "Failed to add child. Please try again.");
    } finally {
      // Dismiss the toast and update the loading state
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function getAllChildren() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading children data...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_CHILDREN_DATA);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(getChildren(response?.data?.data));

      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        dispatch(getInterestDataForChild(element._id));
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to fetch children. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function getInterestDataForChild(childrenId) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching interest data...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        `${FETCH_CHILDREN_INTEREST_DATA}?childrenId=${childrenId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const newInterestData = { childId: childrenId, ...response.data.data };
      dispatch(setInterestData(newInterestData));

      toast.success("Interest data retrieved successfully!");
    } catch (error) {
      toast.error(
        error.message || "Failed to fetch interest data. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// export function fetchChildrenInterestData() {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {

//             const params = {
//                 childrenId: "672df6b26045c53f2271c587",
//             };

//             const response = await apiConnector("GET", INSERT_CHILDREN_INTEREST, null, null,params);

//             console.log("FETCH CHILDREN INTEREST RESPONSE............", response)

//             if (!response.data.success) {
//                 throw new Error(response.data.message)
//             }

//             toast.success(response?.data?.message)

//         } catch (error) {
//             console.log("FORM INTEREST INSERT ERROR............", error)
//             toast.error("Fetching Interest Response Error")
//         }
//         dispatch(setLoading(false))
//         toast.dismiss(toastId)
//     }
// }
