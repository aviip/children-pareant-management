import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  children: [],
  loading: false,
  interestData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    addChild(state, action) {
      state.children.push(action.payload);
    },
    setInterestData: (state, action) => {
      state.interestData = action.payload;
    },
    getChildren(state, action) {
      state.children = action.payload;
    },
  },
});

export const { setUser, setLoading, addChild, setInterestData, getChildren } =
  profileSlice.actions;

export default profileSlice.reducer;
