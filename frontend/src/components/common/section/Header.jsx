import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Logout from "../section/Logout";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const Navbar = [
    { name: "Home", link: "/userhome" },
    { name: "Plant", link: "/plant" },
    { name: "Disease", link: "/disease" },
    { name: "Detection", link: "/detection" },
    { name: "Feedback", link: "/feedback" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:3000/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeNavbar = () => setNavbar(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogoutSuccess = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <Link to="/" className="flex items-center" onClick={closeNavbar}>
            <span className="text-2xl text-green-400 font-bold">
              Green Care
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {Navbar.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Profile section and Mobile menu button */}
          <div className="flex items-center">
            {/* Profile section */}
            {user && (
              <div className="relative mr-2 md:mr-0 " ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="text-sm font-medium mr-2">{user.name}</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="group flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="py-1">
                      <Logout onLogoutSuccess={handleLogoutSuccess}>
                        {({ logout }) => (
                          <button onClick={logout}>
                            <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            Logout
                          </button>
                        )}
                      </Logout>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setNavbar(!navbar)}
              >
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${navbar ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {Navbar.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeNavbar}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
