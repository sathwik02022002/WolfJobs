import "./App.css";
import { Header } from "./core/header/header";
import { Outlet, Route, Routes } from "react-router-dom";
import { LoginPage } from "./feature/user-auth/components/loginPage";
import { RegistrationPage } from "./feature/user-auth/components/registrationPage";

function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<h1>Coming soon</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
        <Outlet />
      </div>
    </>
  );
}

export default App;
