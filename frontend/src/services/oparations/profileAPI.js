import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector, apiConnectorFormData } from "../apiConnector";
import { profileEndpoints } from "../api";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  UPDATE_USER_PROFILE_IMAGE_API,
  USER_DELETE_ACCOUNT_API,
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null);
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function updateUserProfileImage(token, navigate, imageFile) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await apiConnectorFormData(
        "POST",
        UPDATE_USER_PROFILE_IMAGE_API,
        formData
      );

      if (response.data) {
        dispatch(getUserDetails(token, navigate));
      }
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function deleteProfile(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        USER_DELETE_ACCOUNT_API,
        null
      );

      if (response.data) {
        dispatch(logout(navigate));
      }
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
