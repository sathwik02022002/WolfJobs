import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./Pages/Auth/LoginPage";
import LogoutPage from "./Pages/Auth/LogoutPage";
import RegistrationPage from "./Pages/Auth/RegistrationPage";
import Header from "./components/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateJob from "./Pages/CreateJob/CreateJob";
import ExplorePage from "./Pages/Explore/Explore";

function App() {
  return (
    <>
      <div className="h-screen">
        <Header />
        <ToastContainer style={{ marginTop: "64px" }} />
        <Routes>
          <Route path="/" element={<h1>Coming soon</h1>} />
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
