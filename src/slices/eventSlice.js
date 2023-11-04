import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../api/services/eventService";
import {
  convertArrayToCamelCase,
  convertToCamelCase,
  convertToUnderscoreCase,
} from "../utils/json";

const initialState = {
  data: {
    events: [],
    scheduledEvents: [],
    finishedEvents: [],
    liveEvent: null,
  },
  status: "idle",
  error: false,
  message: "",
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ createEventCredentials, setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await eventService.createEvent(
        convertToUnderscoreCase(createEventCredentials),
      );
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

export const getScheduledEvents = createAsyncThunk(
  "events/getScheduledEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eventService.getScheduledEvents();
      console.log(res);
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ eventId, setSubmitting }, { rejectWithValue }) => {
    try {
      setSubmitting(true);
      const res = await eventService.deleteEvent(
        convertToUnderscoreCase(eventId),
      );
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

export const getFinishedEvents = createAsyncThunk(
  "events/getFinishedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eventService.getFinishedEvents();
      console.log(res);
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const getLiveEvent = createAsyncThunk(
  "events/getLiveEvent",
  async (adminCode, { rejectWithValue }) => {
    try {
      const res = await eventService.getLiveEvent(adminCode);
      console.log(res);
      return res.data;
    } catch (err) {
      // console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

const eventslice = createSlice({
  initialState,
  name: "events",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);
        state.data.scheduledEvents.push(
          convertToCamelCase(action.payload.data),
        );
        state.data.events.push(convertToCamelCase(action.payload.data));
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getScheduledEvents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getScheduledEvents.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);

        state.data.scheduledEvents = convertArrayToCamelCase(
          action.payload.data,
        );
        state.data.events = convertArrayToCamelCase(action.payload.data);
      })
      .addCase(getScheduledEvents.rejected, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getFinishedEvents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getFinishedEvents.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);

        state.data.finishedEvents = convertArrayToCamelCase(
          action.payload.data,
        );
        state.data.events = convertArrayToCamelCase(action.payload.data);
      })
      .addCase(getFinishedEvents.rejected, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getLiveEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getLiveEvent.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);
        state.data.liveEvent = convertToCamelCase(action.payload.data);
      })
      .addCase(getLiveEvent.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = false;
        console.log(action);

        state.data.liveEvent = convertToCamelCase(action.payload.data);
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectEvents = (state) => state.events.data.events;
export const selectScheduledEvents = (state) =>
  state.events.data.scheduledEvents;
export const selectFinishedEvents = (state) => state.events.data.finishedEvents;
export const selectLiveEvent = (state) => state.events.data.liveEvent;
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;
export const selectEventsErrorMessage = (state) => state.events.message;

export default eventslice.reducer;
