import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import masterService from "../api/services/masterService";

const initialState = {
  data: {
    logged: false,
  },
  status: "idle",
  error: false,
  message: "",
  signin: false,
  signup: false,
};

export const signup = createAsyncThunk(
  "master/signup",
  async ({ signupCredentials, setSubmitting }, { rejectWithValue }) => {
    try {
      console.log(
        "🚀 |~~| file: masterSlice.js:21 |~~| signupCredentials:",
        signupCredentials,
      );
      setSubmitting(true);
      // call signup request to server
      const res = await masterService.signup(signupCredentials);
      console.log("🚀 |~~| file: masterSlice.js:24 |~~| res:", res);

      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error(
        "Request failed",
        "🚀 |~~| file: masterSlice.js:28 |~~| err:",
        err,
      );
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

export const signin = createAsyncThunk(
  "master/signin",
  async ({ signinCredentials, setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await masterService.signin(signinCredentials);
      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error(
        "Request failed",
        "🚀 |~~| file: masterSlice.js:46 |~~| err:",
        err,
      );
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

export const checkOtp = createAsyncThunk(
  "master/checkOtp",
  async ({ otpCode, setSubmitting }, { rejectWithValue, dispatch }) => {
    try {
      setSubmitting(true);
      const res = await masterService.checkOtp({ code: otpCode });
      dispatch(refreshMasterData());
      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error(
        "Request failed",
        "🚀 |~~| file: masterSlice.js:64 |~~| err:",
        err,
      );
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

export const generateInvitation = createAsyncThunk(
  "master/generate-invitation",
  async ({ setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await masterService.GenerateInvitation();
      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error(
        "Request failed",
        "🚀 |~~| file: masterSlice.js:81 |~~| err:",
        err,
      );
      if (err.response.status === 401) {
        window.location.href = "/";
        return;
      }
      return rejectWithValue(err.response.data);
    } finally {
      setSubmitting(false);
    }
  },
);

const masterSlice = createSlice({
  initialState,
  name: "master",
  reducers: {
    refreshMasterData(state) {
      state.status = "idle";
      state.error = false;
      state.message = "";
      state.signin = false;
      state.signup = false;
    },
    updateMasterData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: masterSlice.js:115 |~~| action:", action);
        state.status = "idle";
        state.error = false;
        state.signup = true;
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("🚀 |~~| file: masterSlice.js:121 |~~| action:", action);
        state.status = "idle";
        // error message from backend
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(signin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signin.fulfilled, (state) => {
        state.status = "idle";
        state.error = false;
        state.signin = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(checkOtp.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkOtp.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: masterSlice.js:145 |~~| action:", action);
        state.status = "idle";
        state.data = { logged: true, ...action.payload.data };
        state.error = false;
        sessionStorage.setItem("master_logged", "true");
      })
      .addCase(checkOtp.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(generateInvitation.pending, (state) => {
        state.status = "pending";
      })
      .addCase(generateInvitation.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: masterSlice.js:162 |~~| action:", action);
        state.data.invitationCode = action.payload.data.code;
      })
      .addCase(generateInvitation.rejected, (state, action) => {
        state.status = "idle";
        // error message from backend
        state.error = action.payload.error;
        state.message = action.payload.message;
      });
  },
});

export const selectMaster = (state) => state.master.data;
export const selectMasterStatus = (state) => state.master.status;
export const selectMasterError = (state) => state.master.error;
export const selectMasterErrorMessage = (state) => state.master.message;
export const selectMasterLoggged = (state) => state.master.data.logged;
export const selectMasterSignup = (state) => state.master.signup;
export const selectMasterSignin = (state) => state.master.signin;

export const { refreshMasterData, updateMasterData } = masterSlice.actions;

export default masterSlice.reducer;
