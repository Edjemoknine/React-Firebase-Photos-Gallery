import { configureStore } from "@reduxjs/toolkit";
import GallerySlice from "./Slices/GallerySlice";
export const store = configureStore({
  reducer: { gallery: GallerySlice },
});
