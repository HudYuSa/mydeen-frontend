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
import Authenticate from "./components/middlewares/Authenticate";
import EventPage from "./components/pages/EventPage";
import EventPagePresent from "./components/pages/EventPagePresent";
import EventSetting from "./components/pages/EventSetting";
import FetchEvent from "./components/middlewares/FetchEvent";
import EventNotFound from "./components/pages/EventNotFound";
import ParticipantPage from "./components/pages/ParticipantPage";

function App() {
  return (
    <div className="w-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/event/notfound" element={<EventNotFound />} />

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
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/setting" element={<AdminSetting />} />

            {/* fetch a certain event */}
            <Route path="/event/:eventCode" element={<FetchEvent />}>
              <Route path="" element={<EventPage />} />

              <Route path="present" element={<EventPagePresent />} />
              <Route path="participants" element={<ParticipantPage />} />
              <Route path="settings" element={<EventSetting />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
