import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../api/services/eventService";
import { createSelector } from "reselect";
import {
  convertArrayToCamelCase,
  convertToCamelCase,
  convertObjToUnderscoreCase,
} from "../utils/json";

const initialState = {
  data: {
    events: [],
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
        convertObjToUnderscoreCase(createEventCredentials),
      );
      console.log("🚀 |~~| file: eventsSlice.js:27 |~~| res:", res);
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

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ eventId, toggle }, { rejectWithValue }) => {
    try {
      const res = await eventService.deleteEvent(eventId);
      console.log("🚀 |~~| file: adminSlice.js:48 |~~| res:", res);

      console.log("eventsSlice.js:50 |~| ", typeof toggle);
      toggle();
      return { data: res.data.data, eventId };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const getScheduledEvents = createAsyncThunk(
  "events/getScheduledEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eventService.getScheduledEvents();
      console.log("🚀 |~~| file: adminSlice.js:62 |~~| res:", res);
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const getFinishedEvents = createAsyncThunk(
  "events/getFinishedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await eventService.getFinishedEvents();
      console.log("🚀 |~~| file: adminSlice.js:76 |~~| res:", res);
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
      console.log("🚀 |~~| file: adminSlice.js:90 |~~| res:", res);
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const getEvent = createAsyncThunk(
  "events/getEvent",
  async (eventCode, { rejectWithValue }) => {
    try {
      setTimeout(() => {}, 3000);

      const res = await eventService.getEvent(eventCode);
      console.log("🚀 |~~| file: adminSlice.js:106 |~~| res:", res);
      return res.data;
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const startEvent = createAsyncThunk(
  "events/startEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const res = await eventService.startEvent(eventId);
      console.log("🚀 |~~| file: adminSlice.js:120 |~~| res:", res);
      return { data: res.data.data, eventId, status: "live" };
    } catch (err) {
      // console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const finishEvent = createAsyncThunk(
  "events/finishEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const res = await eventService.finishEvent(eventId);
      console.log("🚀 |~~| file: adminSlice.js:134 |~~| res:", res);
      return { data: res.data.data, eventId, status: "finished" };
    } catch (err) {
      // console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateEventName = createAsyncThunk(
  "events/updateEventName",
  async ({ eventId, eventName, toggle }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateEventName(eventId, eventName);
      toggle();
      console.log("🚀 |~~| file: adminSlice.js:149 |~~| res:", res);
      return { data: res.data.data, eventId, eventName };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateEventDate = createAsyncThunk(
  "events/updateEventDate",
  async ({ eventId, startDate, toggle }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateEventDate(eventId, startDate);
      console.log("🚀 |~~| file: adminSlice.js:162 |~~| res:", res);
      toggle();
      return { data: res.data.data, eventId, startDate };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateEventModeration = createAsyncThunk(
  "events/updateEventModeration",
  async ({ eventId, moderation }, { rejectWithValue }) => {
    try {
      console.log(
        "🚀 |~~| file: eventsSlice.js:177 |~~| moderation:",
        moderation,
      );
      const res = await eventService.updateModeration(eventId, moderation);
      console.log("🚀 |~~| file: adminSlice.js:179 |~~| res:", res);
      return { data: res.data.data, eventId, moderation };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateEventMaxQuestionLength = createAsyncThunk(
  "events/updateEventMaxQuestionLength",
  async ({ eventId, maxQuestionLength }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateMaxQuestionLength(
        eventId,
        maxQuestionLength,
      );
      console.log("🚀 |~~| file: adminSlice.js:196 |~~| res:", res);
      return { data: res.data.data, eventId, maxQuestionLength };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateMaxQuestions = createAsyncThunk(
  "events/updateMaxQuestions",
  async ({ eventId, maxQuestions }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateMaxQuestions(eventId, maxQuestions);
      console.log("🚀 |~~| file: adminSlice.js:211 |~~| res:", res);
      return { data: res.data.data, eventId, maxQuestions };
    } catch (err) {
      console.error("Request failed", err);
      return rejectWithValue(err.response.data);
    }
  },
);

const eventsSlice = createSlice({
  initialState,
  name: "events",
  reducers: {
    resetEvents(state) {
      state.data.events = [];
    },
    resetError(state) {
      state.status = "idle";
      state.error = false;
      state.message = "";
    },
    resetErrorStatus(state) {
      state.error = false;
    },
    resetErrorMessage(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "success";
        console.log("🚀 |~~| file: eventsSlice.js:245 |~~| action:", action);
        state.error = false;
        state.data.events.unshift(convertToCamelCase(action.payload.data));
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:251 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getScheduledEvents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getScheduledEvents.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:259 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events.push(...convertArrayToCamelCase(action.payload.data));
      })
      .addCase(getScheduledEvents.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:265 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getFinishedEvents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getFinishedEvents.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:275 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events.push(...convertArrayToCamelCase(action.payload.data));
      })
      .addCase(getFinishedEvents.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:280 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getLiveEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getLiveEvent.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:289 |~~| action:", action);
        state.status = "success";
        state.error = false;
        if (action.payload.data.length > 0) {
          if (
            state.data.events.every(
              (e) => e.eventId !== action.payload.data[0].event_id,
            )
          ) {
            state.data.events.push(
              ...convertArrayToCamelCase(action.payload.data),
            );
          }
        }
      })
      .addCase(getLiveEvent.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:306 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:314 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events = state.data.events.filter((e) => {
          console.log(e.eventId);
          return e.eventId !== action.payload.eventId;
        });
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:323 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(startEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(startEvent.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:332 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return { ...e, status: action.payload.status };
          } else {
            return e;
          }
        });
      })
      .addCase(startEvent.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:344 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(finishEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(finishEvent.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:245 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return { ...e, status: action.payload.status };
          } else {
            return e;
          }
        });
      })
      .addCase(finishEvent.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:365 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(getEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:374 |~~| action:", action);
        state.status = "success";
        state.error = false;
        if (
          state.data.events.every(
            (e) => e.eventId !== action.payload.data.event_id,
          )
        ) {
          state.data.events.push(convertToCamelCase(action.payload.data));
        }
      })
      .addCase(getEvent.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:386 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(updateEventName.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEventName.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:395 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return { ...e, eventName: action.payload.eventName };
          } else {
            return e;
          }
        });
      })
      .addCase(updateEventName.rejected, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:407 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(updateEventDate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEventDate.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: eventsSlice.js:416 |~~| action:", action);
        state.status = "success";
        state.error = false;
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return { ...e, startDate: action.payload.startDate };
          } else {
            return e;
          }
        });
      })
      .addCase(updateEventDate.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:429 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(updateEventModeration.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEventModeration.fulfilled, (state, action) => {
        state.status = "success";
        state.error = false;
        console.log("🚀 |~~| file: eventsSlice.js:439 |~~| action:", action);
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return { ...e, moderation: action.payload.moderation };
          } else {
            return e;
          }
        });
      })
      .addCase(updateEventModeration.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:450 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(updateEventMaxQuestionLength.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEventMaxQuestionLength.fulfilled, (state, action) => {
        state.status = "success";
        state.error = false;
        console.log("🚀 |~~| file: eventsSlice.js:460 |~~| action:", action);
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return {
              ...e,
              maxQuestionLength: action.payload.maxQuestionLength,
            };
          } else {
            return e;
          }
        });
      })
      .addCase(updateEventMaxQuestionLength.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:474 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(updateMaxQuestions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateMaxQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.error = false;
        console.log("🚀 |~~| file: eventsSlice.js:484 |~~| action:", action);
        state.data.events = state.data.events.map((e) => {
          if (e.eventId === action.payload.eventId) {
            return {
              ...e,
              maxQuestions: action.payload.maxQuestions,
            };
          } else {
            return e;
          }
        });
      })
      .addCase(updateMaxQuestions.rejected, (state, action) => {
        state.status = "idle";
        console.log("🚀 |~~| file: eventsSlice.js:498 |~~| action:", action);
        state.error = action.payload.error;
        state.message = action.payload.message;
      });
  },
});

export const selectEvents = (state) => state.events.data.events;
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;
export const selectEventsErrorMessage = (state) => state.events.message;

export const { resetEvents, resetError, resetErrorMessage, resetErrorStatus } =
  eventsSlice.actions;

export const selectScheduledEvents = createSelector(
  [selectEvents],
  (events) => {
    // Your logic to filter scheduled events here
    return events.filter((e) => e.status === "scheduled");
  },
);

export const selectFinishedEvents = createSelector([selectEvents], (events) => {
  // Your logic to filter finished events here
  return events.filter((e) => e.status === "finished");
});

export const selectLiveEvents = createSelector([selectEvents], (events) => {
  // Your logic to filter scheduled events here
  return events.filter((e) => e.status === "live");
});

// selector.js
export const selectEventByEventCode = createSelector(
  [
    // Usual first input - extract value from `state`
    selectEvents,
    // Take the second arg, `category`, and forward to the output selector
    (_, eventCode) => eventCode,
  ],
  // Output selector gets (`items, category)` as args
  (events, eventCode) => events.find((e) => e.eventCode === eventCode),
);

export default eventsSlice.reducer;
