import "./App.css";
import { Header } from "./feature/header/header";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./feature/user-auth/components/loginPage";
import { RegistrationPage } from "./feature/user-auth/components/registrationPage";
import { Dashboard } from "./feature/dashboard/components/dashboard";
import { LogoutPage } from "./feature/user-auth/components/logoutPage";
import ProtectedRoute from "./core/components/protectedRoute";

function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <Header />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
