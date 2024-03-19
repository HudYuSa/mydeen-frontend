import { convertObjToUnderscoreCase } from "../../utils/json";
import http from "../http";

const createEvent = (eventCredentials) => {
  return http.post("/api/event", eventCredentials);
};

const getEvent = (eventCode) => {
  return http.get("/api/event/search/" + eventCode);
};

const getAdminEvents = () => {
  return http.get("/api/event/all");
};

const getScheduledEvents = () => {
  return http.get("/api/event/scheduled");
};

const getFinishedEvents = () => {
  return http.get("/api/event/finished");
};

const getLiveEvent = (adminCode) => {
  return http.get("/api/event/live/" + adminCode);
};

const deleteEvent = (eventID) => {
  return http.delete("/api/event/" + eventID);
};

const startEvent = (eventID) => {
  return http.get(`/api/event/${eventID}/start`);
};

const finishEvent = (eventID) => {
  return http.get(`/api/event/${eventID}/finish`);
};

const updateEventName = (eventID, eventName) => {
  return http.patch(
    `/api/event/${eventID}/event-name`,
    convertObjToUnderscoreCase({ eventName }),
  );
};

const updateEventDate = (eventID, eventDate) => {
  return http.patch(
    `/api/event/${eventID}/start-date`,
    convertObjToUnderscoreCase({ startDate: eventDate }),
  );
};

const updateModeration = (eventID, mod) => {
  return http.patch(`/api/event/${eventID}/moderation`, {
    moderation: mod,
  });
};

const updateMaxQuestionLength = (eventID, maxQuestionLength) => {
  return http.patch(
    `/api/event/${eventID}/max-question-length`,
    convertObjToUnderscoreCase({
      maxQuestionLength,
    }),
  );
};

const updateMaxQuestions = (eventID, maxQuestions) => {
  return http.patch(
    `/api/event/${eventID}/max-questions`,
    convertObjToUnderscoreCase({ maxQuestions }),
  );
};

const eventService = {
  createEvent,
  getEvent,
  getScheduledEvents,
  getFinishedEvents,
  getLiveEvent,
  getAdminEvents,
  deleteEvent,
  startEvent,
  finishEvent,
  updateEventName,
  updateEventDate,
  updateModeration,
  updateMaxQuestionLength,
  updateMaxQuestions,
};
export default eventService;
