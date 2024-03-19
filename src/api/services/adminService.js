import http from "../http";

const getLiveEvents = (adminCode) => {
  return http.get("/api/admin/logout", adminCode);
};

const signup = (signupCredentials) => {
  return http.post("/api/admin/signup", signupCredentials);
};

const signin = (signinCredentials) => {
  return http.post("/api/admin/signin", signinCredentials);
};

const refreshToken = () => {
  return http.get("/api/admin/refresh");
};

const checkOtp = (otpCode) => {
  return http.post("/api/admin/otp", otpCode);
};

const profile = () => {
  return http.get("/api/admin/profile");
};

const logout = () => {
  return http.get("/api/admin/logout");
};

const updateAdminUsername = (username) => {
  return http.patch(`/api/admin/edit/username`, { username });
};

const adminService = {
  getLiveEvents,
  signup,
  signin,
  refreshToken,
  checkOtp,
  profile,
  logout,
  updateAdminUsername,
};
export default adminService;
