import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import questionService from "../api/services/questionService";
import { convertArrayToCamelCase, convertToCamelCase } from "../utils/json";

const initialState = {
  data: {
    questions: [],
  },
  status: "idle",
  error: false,
  message: "",
};

// //////////////////////
//? HTTP THUNK
// //////////////////////
export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async ({ credentials, sendJsonMessage }) => {
    return sendJsonMessage({
      type: "createQuestion",
      event_id: credentials.eventId,
      content: credentials.content,
      username: credentials.username,
    });
  },
);

// //////////////////////
//? WEBSOCKET THUNK
// //////////////////////
export const retrieveQuestionMessages = createAsyncThunk(
  "questions/retrieveMessages",
  async (lastJsonMessage, { rejectWithValue }) => {
    // only take message for question group in this slice
    if (
      lastJsonMessage.group === "question" ||
      lastJsonMessage.group === "like"
    ) {
      return lastJsonMessage;
    }

    // if its not part of question group the return nothing
    return;
  },
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async ({ credentials, sendJsonMessage }) => {
    console.log(
      "🚀 |~~| file: questionsSlice.js:55 |~~| credentials:",
      credentials,
    );

    return sendJsonMessage({
      type: "deleteQuestion",
      question_id: credentials.questionId,
    });
  },
);

export const editQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async ({ credentials, sendJsonMessage }) => {
    console.log(
      "🚀 |~~| file: questionsSlice.js:67 |~~| credentials:",
      credentials,
    );

    return sendJsonMessage({
      type: "editQuestion",
      question_id: credentials.questionId,
      content: credentials.content,
    });
  },
);

export const toggleLike = createAsyncThunk(
  "questions/toggleLike",
  async ({ credentials, sendJsonMessage }) => {
    console.log(
      "🚀 |~~| file: questionsSlice.js:80 |~~| credentials:",
      credentials,
    );

    return sendJsonMessage({
      type: "toggleLike",
      question_id: credentials.questionId,
    });
  },
);

// http thunk
export const getEventQuestions = createAsyncThunk(
  "questions/getEventQuestions",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await questionService.getEventQuestions(eventId);
      console.log(res);

      return res.data;
    } catch (err) {
      console.log(
        "Request failed",
        "🚀 |~~| file: questionsSlice.js:99 |~~| err:",
        err,
      );
      return rejectWithValue(err.response.data);
    }
  },
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // semua hasil request http biasa disini
      .addCase(getEventQuestions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getEventQuestions.fulfilled, (state, action) => {
        console.log("🚀 |~~| file: questionsSlice.js:116 |~~| action:", action);
        state.status = "idle";
        state.error = false;
        state.data.questions.push(
          ...convertArrayToCamelCase(action.payload.data),
        );
      })
      .addCase(getEventQuestions.rejected, (state, action) => {
        console.log("🚀 |~~| file: questionsSlice.js:116 |~~| action:", action);
        state.status = "idle";
        state.error = action.payload.error;
        state.message = action.payload.message;
      })

      // semua hasil dari websocket request di retrieve disini
      .addCase(retrieveQuestionMessages.pending, (state) => {
        state.status = "pending";
      })
      .addCase(retrieveQuestionMessages.fulfilled, (state, action) => {
        const questionMessage = action.payload;
        console.log(
          "🚀 |~~| file: questionsSlice.js:133 |~~| questionMessage:",
          questionMessage,
        );

        switch (questionMessage.type) {
          // questions
          case "createQuestion":
            console.log(
              "🚀 |~~| file: questionsSlice.js:214 |~~| createQuestionResponse",
            );
            state.data.questions.push(convertToCamelCase(questionMessage.data));
            break;
          case "deleteQuestion":
            console.log(
              "🚀 |~~| file: questionsSlice.js:214 |~~| deleteQuestionResponse",
            );
            state.data.questions = state.data.questions.filter((q) => {
              return q.questionId !== questionMessage.data.question_id;
            });
            break;

          case "editQuestion":
            console.log(
              "🚀 |~~| file: questionsSlice.js:214 |~~| editQuestionResponse",
            );
            state.data.questions = state.data.questions.map((q) => {
              if (q.questionId === questionMessage.data.question_id) {
                return { ...q, content: questionMessage.data.content };
              } else {
                return q;
              }
            });
            break;

          // likes
          case "toggleLike":
            console.log(
              "🚀 |~~| file: questionsSlice.js:214 |~~| createQuestionResponse",
            );
            const user = JSON.parse(sessionStorage.getItem("user"));
            console.log("🚀 |~~| file: questionsSlice.js:169 |~~| user:", user);

            state.data.questions = state.data.questions.map((q) => {
              console.log(
                "🚀 |~~| file: questionsSlice.js:172 |~~| user:",
                user,
              );
              // get the question
              if (q.questionId === questionMessage.data.question_id) {
                // if it's liked
                if (questionMessage.data.liked) {
                  // like
                  // check kalo yang buat like sama dengan yang punya likenya
                  if (questionMessage.data.user_id === user.id) {
                    q.userLiked = true;
                  }

                  return {
                    ...q,
                    likesCount: q.likesCount + 1,
                  };
                } else {
                  // unlike
                  // check kalo yang nge delete like sama dengan yang punya likenya
                  if (questionMessage.data.user_id === user.id) {
                    q.userLiked = false;
                  }

                  return {
                    ...q,
                    likesCount: q.likesCount - 1,
                  };
                }
              } else {
                return q;
              }
            });
            console.log(
              "🚀 |~~| file: questionsSlice.js:203 |~~| state.data.questions:",
              state.data.questions,
            );
            break;

          case "error":
            console.log(
              "Error ",
              "🚀 |~~| file: questionsSlice.js:208 |~~| user:",
              questionMessage,
            );
            break;
          default:
            // unknown type of message
            console.log(
              "🚀 |~~| file: questionsSlice.js:212 |~~| :",
              "unknown type of message",
            );
            console.log(
              "🚀 |~~| file: questionsSlice.js:212 |~~| :",
              questionMessage,
            );
            break;
        }
      });
  },
});

export const selectQuestions = (state) => state.questions.data.questions;
export const selectQuestionsStatus = (state) => state.questions.status;
export const selectQuestionsError = (state) => state.questions.error;
export const selectQuestionsErrorMessage = (state) => state.questions.message;

// selector.js
export const selectQuestionById = createSelector(
  [
    // Usual first input - extract value from `state`
    selectQuestions,
    // Take the second arg, `category`, and forward to the output selector
    (_, questionId) => questionId,
  ],
  // Output selector gets (`items, category)` as args
  (events, questionId) => events.find((e) => e.questionId === questionId),
);

export default questionsSlice.reducer;
