import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

function ForgetPasswordReset() {
  const params = useParams();
  const navigate = useNavigate();
  // notify function
  const notifyForPassNotMatch = () => toast.error("Password not match");
  const notifyForSmallPass = () =>
    toast.error("Password must be greater than 7 charater");
  const notifyForPasswordResetFail = () =>
    toast.error("Password Reset Fail . Something Went Wrong");
  const notifyForPasswordResetSuccessfully = (data) => toast(data.msg);

  // state of pass and confirm pass
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const handlePasswordChange = (e) => {
    setNewPass(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmNewPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmNewPass) {
      notifyForPassNotMatch();
    }

    if (newPass.length < 7) {
      notifyForSmallPass();
    }

    // fetch the api of the reset password
    console.log(params.id);
    console.log(params.token);
    console.log(newPass);

    axios
      .post("/api/auth/reset-password", {
        email: params.id,
        token: params.token,
        newPassword: newPass,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data) {
          notifyForPasswordResetSuccessfully(data);
        }

        navigate("/sign-in");
      })
      .catch((error) => {
        notifyForPasswordResetFail();
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-3 border-black rounded-lg"
          id="newPass"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          max={5}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="border p-3 border-black rounded-lg"
          id="confirmNewPass"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          max={5}
          onChange={handleConfirmPasswordChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ForgetPasswordReset;
