// import { useState } from "react";
import { NavBarItem } from "./nav-bar-item";
import { useUserStore } from "../dashboard/controllers/userController";

export function NavBar() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div className="relative hidden lg:flex items-center ml-auto">
        <nav className="text-sm leading-6 font-semibold text-slate-700 ">
          <ul className="flex space-x-8">
            {/* {!isLoggedIn && <NavBarItem link="/login" text="Login" />}
            {!isLoggedIn && <NavBarItem link="/register" text="Register" />} */}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
}
