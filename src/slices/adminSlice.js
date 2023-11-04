import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "../api/services/adminService";
import { convertToCamelCase } from "../utils/json";

const initialState = {
  data: {
    logged: false,
  },
  status: "idle",
  error: false,
  message: "",
  signup: false,
  signin: false,
};

export const signup = createAsyncThunk(
  "admin/signup",
  async (
    { signupCredentials, setSubmitting },
    { rejectWithValue, dispatch },
  ) => {
    try {
      setSubmitting(true);
      // call signup request to server
      const res = await adminService.signup(signupCredentials);

      console.log(res);

      // auto signin
      await dispatch(
        signin({
          signinCredentials: {
            email: signupCredentials.email,
            password: signupCredentials.password,
          },
          setSubmitting,
        }),
      );

      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

export const signin = createAsyncThunk(
  "admin/signin",
  async ({ signinCredentials, setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await adminService.signin(signinCredentials);
      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

export const logout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminService.logout();
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

const adminSlice = createSlice({
  initialState,
  name: "master",
  reducers: {
    refreshAdminData(state) {
      state.status = "idle";
      state.error = false;
      state.message = "";
      state.signin = false;
      state.signup = false;
    },
    updateAdminData: (state, action) => {
      state.data = convertToCamelCase(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);
        state.signup = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        console.log(action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(signin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        state.signin = true;
        const camelCaseNamingData = convertToCamelCase(action.payload.data);
        state.data = { logged: true, ...camelCaseNamingData };
        sessionStorage.setItem("admin_logged", "true");
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = {
          logged: false,
        };
        state.status = "idle";
        state.error = false;
        state.message = "";
        state.signup = false;
        state.signin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        console.log(action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      });
  },
});

export const selectAdmin = (state) => state.admin.data;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;
export const selectAdminErrorMessage = (state) => state.admin.message;
export const selectAdminLoggged = (state) => state.admin.data.logged;
export const selectAdminSignup = (state) => state.admin.signup;
export const selectAdminSignin = (state) => state.admin.signin;

export const { refreshAdminData, updateAdminData } = adminSlice.actions;

export default adminSlice.reducer;
