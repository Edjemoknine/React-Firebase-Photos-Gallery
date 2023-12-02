import { signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((store) => store.gallery);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <header className="shadow-lg fixed w-full top-0 left-0 z-50 Glass">
        <nav className="container mx-auto flex justify-between items-center py-3">
          <Link to="/" className="font-semibold text-lg">
            <h1 id="title">
              <span className="text-pink-500">Photosnap</span>
            </h1>
          </Link>
          <ul className="flex items-center gap-10 ">
            <li
              className={
                location.pathname === "/"
                  ? " hover:text-pink-500  active"
                  : " hover:text-pink-500 text-white"
              }
            >
              <Link
                to="/"
                className={location.pathname !== "/" && "text-gray-600"}
              >
                Gallery
              </Link>
            </li>

            {!user ? (
              <li
                className={
                  location.pathname === "/auth"
                    ? " hover:text-pink-500  active"
                    : " hover:text-pink-500  text-white"
                }
              >
                <Link
                  to="/auth"
                  className={location.pathname !== "/" && "text-gray-600"}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className={" hover:text-pink-500 text-white"}>
                <button
                  onClick={handleSignOut}
                  className={location.pathname !== "/" && "text-gray-600"}
                >
                  Sign Out
                </button>
              </li>
            )}

            {user && (
              <>
                <li
                  className={
                    location.pathname === "/profile"
                      ? " hover:text-pink-500  active"
                      : " hover:text-pink-500  text-white"
                  }
                >
                  <Link
                    to="/profile"
                    className={location.pathname !== "/" && "text-gray-600"}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.photoURL}
                    alt="avatar"
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
