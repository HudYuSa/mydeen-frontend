import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupMasterPage from "./components/pages/SignupMasterPage";
import LandingPage from "./components/pages/LandingPage";
import SigninMasterPage from "./components/pages/SigninMasterPage";
import SignupAdminPage from "./components/pages/SignupAdminPage";
import SigninAdminPage from "./components/pages/SigninAdminPage";
import MasterOtp from "./components/pages/MasterOtp";
import GenerateInvitationCode from "./components/pages/GenerateInvitationCode";
import AdminDashboard from "./components/pages/AdminDashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import AdminSetting from "./components/pages/AdminSetting";
import EditUsernameAdmin from "./components/features/EditUsernameAdmin";
import EditEmailAdmin from "./components/features/EditEmailAdmin";
import AuthenticateAuthPage from "./components/middlewares/AuthenticateAuthPage";
import AuthenticateContentPage from "./components/middlewares/AuthenticateContentPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* auth */}
        <Route element={<AuthenticateAuthPage />}>
          <Route path="/master/signup" element={<SignupMasterPage />} />
          <Route path="/master/signin" element={<SigninMasterPage />} />
          <Route path="/master/otp" element={<MasterOtp />} />

          <Route path="/admin/signup" element={<SignupAdminPage />} />
          <Route path="/admin/signin" element={<SigninAdminPage />} />
        </Route>

        <Route element={<AuthenticateContentPage />}>
          {/* contents */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/master/generate-invitation"
            element={<GenerateInvitationCode />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/setting" element={<AdminSetting />} />
          <Route
            path="/admin/setting/username"
            element={<EditUsernameAdmin />}
          />
          <Route path="/admin/setting/email" element={<EditEmailAdmin />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
