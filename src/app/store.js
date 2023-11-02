import { configureStore } from "@reduxjs/toolkit";
import masterReducer from "../slices/masterSlice";
import commonReducer from "../slices/commonSlice";
import adminReducer from "../slices/adminSlice";

export const store = configureStore({
  reducer: {
    master: masterReducer,
    admin: adminReducer,
    common: commonReducer,
  },
});
