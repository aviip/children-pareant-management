import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  signupData: null,
  loading: false,
  token: Cookies.get("token") ? Cookies.get("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    clearToken(state) {
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setSignupData, setLoading, setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
