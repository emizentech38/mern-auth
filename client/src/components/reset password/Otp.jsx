import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Otp(props) {
  const [userEnterOtp, setUserEnterOtp] = useState(0);

  const navigate = useNavigate();
  // notify
  const notifyForTokenExpire = () =>
    toast.error("token expire please try again");
  const notifyForInvalidOtp = () => toast.error("Please enter valid otp");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!props.token) {
      notifyForTokenExpire();
    }

    if (props.generatedOTP !== userEnterOtp) {
      notifyForInvalidOtp();
    }
    navigate(`/reset-password/${props.email}/${props.token}`);
  };
  const handleChange = (e) => {
    setUserEnterOtp(e.target.value);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Enter Otp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Enter Otp"
          className="border p-3 border-black rounded-lg"
          id="otp"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Verify Otp
        </button>
      </form>
    </div>
  );
}

export default Otp;
