import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

function Header() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignedOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/logout");
      console.log(res);
      if (res.ok === false) {
        dispatch(signOutUserFailure(res.statusText));
        console.log("false");
      }
      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Admin</span>
            <span className="text-slate-700">Dashboard</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          {currentUser && (
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
          )}
          {currentUser ? (
            <button
              onClick={handleSignedOut}
              disabled={loading}
              className="bg-slate-700 text-sm text-white p-2 flex rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign in
              </li>
            </Link>
          )}
          {/* here if the currentUser exist show profile icon else show signin */}

          {/* <Link to="/sign-in">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Sign in
            </li>
          </Link> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;
