import http from "../http";

const signup = (signupCredentials) => {
  return http.post("api/admin/signup", signupCredentials);
};

const signin = (signinCredentials) => {
  return http.post("api/admin/signin", signinCredentials);
};

const refreshToken = () => {
  return http.get("api/admin/refresh");
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

const adminService = {
  signup,
  signin,
  refreshToken,
  checkOtp,
  profile,
  logout,
};
export default adminService;
