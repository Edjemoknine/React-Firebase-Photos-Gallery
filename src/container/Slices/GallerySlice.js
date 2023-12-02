import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allIMG: [],
  favorite: [],
};

const GalleySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },

    logout: (state, { payload }) => {
      state.user = null;
    },
    GetAllImages: (state, { payload }) => {
      state.allIMG = payload;
    },
  },
});

export default GalleySlice.reducer;
export const { login, logout, GetAllImages } = GalleySlice.actions;
