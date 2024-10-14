import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const { currentUser, error, loading } = useSelector((state) => state.user);

  // navigate from useNavigate it is from the react router dom
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // handle the change the of the form data
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border border-black p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <div className="flex relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="password"
            className="border p-3 border-black rounded-lg w-full"
            id="password"
            onChange={handleChange}
          />
          <span>
            <button
              className="absolute top-3 right-4 bg-red-600"
              onClick={togglePasswordVisibility}
            >
              show
            </button>
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex justify-between gap-2 mt-5">
        <div>
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        <div>
          <p>Forgot Password?</p>
          <Link to={"/reset"}>
            <span className="text-red-700">reset </span>
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
