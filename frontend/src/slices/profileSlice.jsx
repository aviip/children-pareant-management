import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  children: [],
  loading: false,
  interestData: [],
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
      const existingIndex = state.interestData.findIndex(
        (user) => user.childId === action.payload.childId
      );

      if (existingIndex !== -1) {
        state.interestData[existingIndex] = action.payload;
      } else {
        state.interestData.push(action.payload);
      }
    },
    getChildren(state, action) {
      state.children = action.payload;
    },
  },
});

export const { setUser, setLoading, addChild, setInterestData, getChildren } =
  profileSlice.actions;

export default profileSlice.reducer;
