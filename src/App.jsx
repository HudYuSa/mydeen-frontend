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
import Authenticate from "./components/middlewares/Authenticate";
import EventPage from "./components/pages/EventPage";
import EventPagePresent from "./components/pages/EventPagePresent";

function App() {
  return (
    <div className="w-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* auth */}
          <Route element={<Authenticate />}>
            <Route path="/master/signup" element={<SignupMasterPage />} />
            <Route path="/master/signin" element={<SigninMasterPage />} />
            <Route path="/master/otp" element={<MasterOtp />} />

            <Route path="/admin/signup" element={<SignupAdminPage />} />
            <Route path="/admin/signin" element={<SigninAdminPage />} />

            {/* contents */}
            <Route
              path="/master/generate-invitation"
              element={<GenerateInvitationCode />}
            />
            <Route path="/admin/setting" element={<AdminSetting />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/setting/username"
              element={<EditUsernameAdmin />}
            />
            <Route path="/admin/setting/email" element={<EditEmailAdmin />} />

            <Route path="/event/:eventId" element={<EventPage />} />
            <Route
              path="/event/:eventId/present"
              element={<EventPagePresent />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
