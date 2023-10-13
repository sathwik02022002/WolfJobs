import "./App.css";
import { Header } from "./feature/header/header";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./feature/user-auth/components/loginPage";
import { RegistrationPage } from "./feature/user-auth/components/registrationPage";
import { Dashboard } from "./feature/dashboard/components/dashboard";
import { LogoutPage } from "./feature/user-auth/components/logoutPage";
import ProtectedRoute from "./core/components/protectedRoute";
import { ExplorePage } from "./feature/explore/components/explorePage";
import { CreateJob } from "./feature/createJob/components/createJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandingPage } from "./feature/user-auth/components/landingPage";

function App() {
  return (
    <>
      <div className="h-screen">
        <Header />
        <ToastContainer style={{ marginTop: "64px" }} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createjob"
            element={
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
