import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  StoreData: null,
  loading: false,
  token: Cookies.get("storeToken") ? Cookies.get("storeToken") : null,
};

const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    setStoreData(state, value) {
      state.StoreData = value.payload;
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

export const { setStoreData: setSignupData, setLoading, setToken, clearToken } = storeSlice.actions;

export default storeSlice.reducer;
