import { useUserStore } from "../../store/UserStore";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role);

  return (
    <>
      <div className="relative items-center hidden ml-auto lg:flex">
        <nav className="text-sm font-semibold leading-6 text-slate-700 ">
          <ul className="flex space-x-8">
            {isLoggedIn && <NavBarItem link="/profile" text="Profile" />}
            {isLoggedIn && role == "Applicant" && <NavBarItem link="/resume" text="Upload Resume" />}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
