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
      setSubmitting(true);
      // call signup request to server
      console.log(signupCredentials);
      console.log(setSubmitting);
      const res = await masterService.signup(signupCredentials);

      console.log(res);

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
  "master/signin",
  async ({ signinCredentials, setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await masterService.signin(signinCredentials);
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

export const checkOtp = createAsyncThunk(
  "master/checkOtp",
  async ({ otpCode, setSubmitting }, { rejectWithValue, dispatch }) => {
    try {
      setSubmitting(true);
      const res = await masterService.checkOtp({ code: otpCode });
      console.log(res);
      dispatch(refreshMasterData());
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

export const generateInvitation = createAsyncThunk(
  "master/generate-invitation",
  async ({ setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await masterService.GenerateInvitation();
      console.log(res);
      return res.data;
    } catch (err) {
      setSubmitting(false);
      console.error("Request failed", err);
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
        state.status = "idle";
        console.log(action);
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
        console.log(action);
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
