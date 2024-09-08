import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(0);
  };

  return (
    <nav className="bg-violet-700 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="http://localhost:5173/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.png" className="h-8 rounded" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Kitch Track
          </span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isNavbarOpen}
          onClick={handleNavbarToggle}
        >
          <span className="sr-only">Меню</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div
          className={`${isNavbarOpen ? "block" : "hidden"} md:block`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                aria-current="page"
              >
                Начална Страница
              </Link>
            </li>

            {localStorage.getItem("user") != null ? (
              <>
                {JSON.parse(localStorage.getItem("user")!).role == "Manager" ? (
                  <>
                    <li>
                      <Link
                        to="/projects"
                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                        aria-current="page"
                      >
                        Проекти
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/teams"
                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                        aria-current="page"
                      >
                        Екипи
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/my-tasks"
                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                        aria-current="page"
                      >
                        Моите задачи
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                    aria-current="page"
                  >
                    Отписване
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                    aria-current="page"
                  >
                    Влизане
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-violet-400"
                    aria-current="page"
                  >
                    Регистриране
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
