import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import About from "./pages/About";
import { useSelector } from "react-redux";

// import Sidebar from "./components/Sidebar";

import AllUser from "./components/home/AllUser";
import CreateUser from "./components/home/CreateUser";
import UpdateUser from "./components/home/UpdateUser";
import DeleteUser from "./components/home/DeleteUser";
import PrivateRoute from "./components/private route/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgetPasswordReset from "./components/reset password/ForgetPasswordReset";

const App = () => {
  // const { currentUser } = useSelector((state) => state.user);
  // function getCookie(name) {
  //   var re = new RegExp(name + "=([^;]+)");
  //   var value = re.exec(document.cookie);
  //   return value != null ? unescape(value[1]) : null;
  // }

  //Call the function
  // console.log(getCookie("token"));

  // here we created the route after installing the tailwind
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}>
            <Route index path="/all-users" element={<AllUser />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/delete-user/:id" element={<DeleteUser />} />
          </Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
          path="/reset-password/:id/:token"
          element={<ForgetPasswordReset />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
