import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commonService from "../api/services/commonService";
import { updateMasterData } from "./masterSlice";
import { updateAdminData } from "./adminSlice";

const initialState = {
  data: {
    user: null,
  },
  status: "idle",
  error: false,
  message: null,
  authenticate: false,
};

export const checkRole = createAsyncThunk(
  "common/checkrole",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await commonService.checkRole();
      console.log("🚀 |~~| file: commonSlice.js:21 |~~| res:", res);
      if (res.data.data.user) {
        // do something for user
        sessionStorage.setItem("user", JSON.stringify(res.data.data.user));
      }

      if (res.data.data.error) {
        return rejectWithValue(res.data.data);
      } else {
        if (res.data.data.account.type === "master") {
          dispatch(
            updateMasterData({ ...res.data.data.account, logged: true }),
          );
          sessionStorage.setItem("master_logged", "true");
        } else if (res.data.data.account.type === "admin") {
          dispatch(updateAdminData({ ...res.data.data.account, logged: true }));
          sessionStorage.setItem("admin_logged", "true");
        }
      }
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

const commonSlice = createSlice({
  initialState,
  name: "common",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkRole.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkRole.fulfilled, (state) => {
        state.status = "idle";
        state.error == false;
        state.authenticate = true;
      })
      .addCase(checkRole.rejected, (state, action) => {
        state.status = "idle";
        state.error = true;
        state.message = action.payload.message;
        state.authenticate = true;
      });
  },
});

export const selectCommon = (state) => state.common.data;
export const selectCommonStatus = (state) => state.common.status;
export const selectCommonError = (state) => state.common.error;
export const selectCommonErrorMessage = (state) => state.common.message;
export const selectCommonAuthenticate = (state) => state.common.authenticate;

export default commonSlice.reducer;
