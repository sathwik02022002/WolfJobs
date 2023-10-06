import "./App.css";
import { Header } from "./core/header/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
