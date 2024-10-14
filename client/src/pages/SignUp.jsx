import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // navigate from useNavigate it is from the react router dom
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              placeholder="name"
              className="border p-3 rounded-lg"
              id="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              placeholder="mobile"
              className="border p-3 rounded-lg"
              id="mobile"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex">
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
