// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthContext();

  // Safely get first name
  const firstName = user?.name
    ? user.name.split(" ")[0]
    : "User";

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          BlogSpace
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg items-center">
          <li>
            <Link className="hover:text-blue-400 transition" to="/">
              Home
            </Link>
          </li>
          {(user&& <>
          <li>
            <Link className="hover:text-blue-400 transition" to="/blogs">
              Blogs
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-400 transition" to="/dashboard">
              Dashboard
            </Link>
          </li>

          </> )}
          {/* Auth based UI */}
          {!user ? (
            <>
              <li>
                <Link
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="border border-blue-500 hover:bg-blue-600 hover:border-blue-600 px-4 py-2 rounded-lg transition"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2 text-sm text-slate-200">
                <span className="text-blue-400 font-semibold">
                  Hi, {firstName} 👋
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-gray-900 text-center space-y-6 py-6 text-lg shadow-lg">
          <li>
            <Link onClick={() => setOpen(false)} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/blogs">
              Blogs
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/dashboard">
              Dashboard
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  className="bg-blue-500 px-4 py-2 rounded-lg block mx-auto w-28"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  className="border border-blue-500 px-4 py-2 rounded-lg block mx-auto w-28"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-blue-400 font-semibold">
                Hi, {firstName} 👋
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-lg block mx-auto w-28"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
