import http from "../http";

const getEventQuestions = (eventId) => {
  return http.get(`/api/questions/${eventId}`);
};

const questionService = {
  getEventQuestions,
};
export default questionService;
