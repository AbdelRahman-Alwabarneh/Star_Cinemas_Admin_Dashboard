import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [Borgar, setBorgar] = useState(false);
  function Switch() {
    setBorgar(!Borgar);
  }
  const navigate = useNavigate();
  function Logout() {
    sessionStorage.setItem("issuccess", false);
    navigate("/login");
  }
  return (
    <>
      <nav className="fixed w-full bg-[#19002E] border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Star Cinemas
            </span>
          </Link>
          <button
            onClick={Switch}
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[870px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`items-center justify-between ${
              Borgar ? "flex" : "hidden"
            } w-full min-[870px]:flex min-[870px]:w-auto min-[870px]:order-1`}
            id="navbar-sticky"
          >
            <ul className="w-full flex flex-col p-4 min-[870px]:p-0 mt-4 font-medium border rounded-lg min-[870px]:space-x-8 rtl:space-x-reverse min-[870px]:flex-row min-[870px]:mt-0 min-[870px]:border-0 min-[870px]:bg-navbar-color bg-[#19002E] min-[870px]:dark:bg-gray-900 border-[#19002E]">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white rounded hover:bg-[#1D4ED8] min-[870px]:hover:bg-transparent min-[870px]:border-0 min-[870px]:hover:text-[#c038ff] min-[870px]:p-0 dark:text-white min-[870px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[870px]:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="block py-2 px-3 text-white rounded hover:bg-[#1D4ED8] min-[870px]:hover:bg-transparent min-[870px]:border-0 min-[870px]:hover:text-[#c038ff] min-[870px]:p-0 dark:text-white min-[870px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[870px]:dark:hover:bg-transparent"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="block py-2 px-3 text-white rounded hover:bg-[#1D4ED8] min-[870px]:hover:bg-transparent min-[870px]:border-0 min-[870px]:hover:text-[#c038ff] min-[870px]:p-0 dark:text-white min-[870px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[870px]:dark:hover:bg-transparent"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/addadmin"
                  className="block py-2 px-3 text-white rounded hover:bg-[#1D4ED8] min-[870px]:hover:bg-transparent min-[870px]:border-0 min-[870px]:hover:text-[#c038ff] min-[870px]:p-0 dark:text-white min-[870px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[870px]:dark:hover:bg-transparent"
                >
                  Add Admin
                </Link>
              </li>
            </ul>
            <button
              onClick={Logout}
              className="ml-8 bg-[#ff31cf53] text-white font-semibold py-2 px-4 rounded-[13px] shadow-md hover:bg-[#ff31cf97] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
