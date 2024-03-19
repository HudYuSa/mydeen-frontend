import http from "../http";

const signup = (signupCredentials) => {
  return http.post("/api/master/signup", signupCredentials);
};

const signin = (signinCredentials) => {
  return http.post("/api/master/signin", signinCredentials);
};

const refreshToken = () => {
  return http.get("/api/master/refresh");
};

const checkOtp = (otpCode) => {
  return http.post("/api/master/otp", otpCode);
};
const reissueVerificationCode = (signupCredentials) => {
  return http.post("/api/master/reissue_verification_code", signupCredentials);
};

const profile = () => {
  return http.get("/api/master/profile");
};

const logout = () => {
  return http.get("/api/master/logout");
};

const GenerateInvitation = () => {
  return http.get("/api/master/generate_invitation");
};

const masterService = {
  signup,
  signin,
  refreshToken,
  checkOtp,
  reissueVerificationCode,
  profile,
  logout,
  GenerateInvitation,
};
export default masterService;
