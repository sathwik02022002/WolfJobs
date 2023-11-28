import { useUserStore } from "../../store/UserStore";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role); // Get the user's role

  return (
    <>
      <div className="relative hidden lg:flex items-center ml-auto">
        <nav className="text-sm leading-6 font-semibold text-slate-700 ">
          <ul className="flex space-x-8">
            {isLoggedIn && <NavBarItem link="/profile" text="Profile" />}
            {isLoggedIn && role === "Applicant" && <NavBarItem link="/notifications" text="Notifications" />} {/* Show only for applicants */}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
