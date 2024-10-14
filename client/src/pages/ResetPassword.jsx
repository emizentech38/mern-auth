import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Otp from "../components/reset password/Otp";

function ResetPassword() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  console.log(email);
  console.log(token);
  console.log(userOtp);

  const notifyForNoEmail = () => toast("Please Enter Email");
  const notifyForValidEmail = (message) => toast.error(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    let generatedOTP = generateOTP();
    setUserOtp(generatedOTP);
    axios
      .post("/api/auth/forget-password", {
        recipient_email: email,
        OTP: generatedOTP,
      })
      .then((res) => {
        const data = res.data;

        setToken(data);
      })
      .catch((error) => {
        notifyForValidEmail("please enter valid email");
      });
  };
  const generatedOTP = generateOTP();
  // generate random token
  function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";
    let len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }

    return OTP;
  }

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      notifyForNoEmail();
    }
    setEmail(e.target.value);
  };

  return (
    <div>
      <ToastContainer />
      {token ? (
        <Otp token={token} generatedOTP={userOtp} email={email} />
      ) : (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">
            Enter Email
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="email"
              className="border p-3 border-black rounded-lg"
              id="email"
              onChange={handleChange}
            />

            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Send Otp
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
