import { useState } from "react";
import { NavBarItem } from "./nav-bar-item";

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div className="relative hidden lg:flex items-center ml-auto">
        <nav className="text-sm leading-6 font-semibold text-slate-700 ">
          <ul className="flex space-x-8">
            {!loggedIn && <NavBarItem link="/login" text="Login" />}
            {!loggedIn && <NavBarItem link="/register" text="Register" />}
            {loggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
}
