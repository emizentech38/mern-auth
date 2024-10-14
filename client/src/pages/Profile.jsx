import React from "react";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleSignedOut = async () => {
    try {
      dispatch(signOutUserStart());
      if (currentUser.user === null) {
        navigate("/sign-in");
      }
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          disabled
          type="text"
          defaultValue={currentUser.user.name}
          id="name"
          className="
              border border-black p-3 rounded-lg"
        />
        <input
          disabled
          type="text"
          placeholder="email"
          defaultValue={currentUser.user.email}
          id="email"
          className="
              border border-black p-3 rounded-lg"
        />
        <input
          disabled
          type="password"
          defaultValue={"password"}
          placeholder="******"
          id="password"
          className="
              border border-black p-3 rounded-lg"
        />
        <button
          onClick={handleSignedOut}
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Out"}
        </button>
      </form>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
    </div>
  );
};

export default Profile;
