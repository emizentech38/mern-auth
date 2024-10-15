import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // navigate from useNavigate it is from the react router dom
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleShowPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4 justify-center content-center items-center"
      >
        <div className="flex flex-col gap-4 mx-6">
          <div className="flex flex-row w-1/2">
            <input
              type="text"
              placeholder="name"
              className="border p-3 rounded-lg"
              id="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="mobile"
              className="border p-3 rounded-lg"
              id="mobile"
              onChange={handleChange}
            />
          </div>
          <div className=" flex -row">
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <div className="flex felx-row justify-center items-center content-center text-center relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                className="border p-3 border-black rounded-lg w-full"
                id="password"
                onChange={handleChange}
              />
              <span onClick={handleShowPassword}>
                <i
                  className=" passshow absolute right-3 bottom-4 cursor-pointer"
                  size={25}
                >
                  {isPasswordVisible ? <BiShow /> : <GrHide />}
                </i>
              </span>
            </div>
          </div>
          {/* 
          <div className="flex flex-col w-1/2"></div> */}
        </div>
        <div className="flex w-full">
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full mx-auto"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>

        {/* <OAuth/> */}
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
