export function NavBar() {
  return (
    <>
      <div className="relative hidden lg:flex items-center ml-auto">
        <nav className="text-sm leading-6 font-semibold text-slate-700 ">
          <ul className="flex space-x-8">
            <li>
              <a className="hover:text-slate-500 " href="/login">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-slate-500">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
