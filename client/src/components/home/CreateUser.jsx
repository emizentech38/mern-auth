import React, { useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiShow } from "react-icons/bi";
import { GrHide } from "react-icons/gr";

export default function CreateUser() {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleShowPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // const validate = (values) => {
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (values.firstName.length > 20) {
  //     errors.firstName = "Must be 20 characters or less";
  //   }

  //   if (!values.email) {
  //     errors.email = "Email is required ";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }

  //   return errors;
  // };
  const notifyForUserCreated = (msg) => toast.success(msg);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      role: "user",
      status: "active",
      mobile: "",
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        setLoading(true);
        const res = await fetch("/api/user/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(null);
        notifyForUserCreated(data.msg);
        // // navigate("/sign-in");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <ToastContainer />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Create User</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-row justify-center content-center items-center gap-5">
            <div className="flex flex-col-reverse gap-5">
              <input
                type="email"
                placeholder="email"
                className="border border-black p-3 rounded-lg"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className="flex flex-row justify-center content-center items-center relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="password"
                  className="border p-3 border-black rounded-lg w-full"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
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

              <input
                type="text"
                placeholder="name"
                className="border p-3 border-black rounded-lg w-full"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="flex flex-col-reverse gap-5">
              <input
                type="mobile"
                placeholder="mobile"
                className="border border-black p-3 rounded-lg"
                id="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />

              <select
                name="role"
                id="role"
                onChange={formik.handleChange}
                className="border p-3 border-black rounded-lg w-full"
                value={formik.values.role}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <select
                name="status"
                id="status"
                onChange={formik.handleChange}
                className="border p-3 border-black rounded-lg w-full"
                value={formik.values.status}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white  p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Create User"}
          </button>
        </form>
      </div>

      {error && <div className="text-red-500 mt-5">{error}</div>}
    </div>
  );
}
