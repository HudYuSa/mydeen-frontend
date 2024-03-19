import http from "../http";

const checkRole = () => {
  return http.get("/api/check_role");
};

const commonService = {
  checkRole,
};
export default commonService;
