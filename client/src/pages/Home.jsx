import React from "react";
import { Outlet } from "react-router-dom";

import SidebarComp from "../components/Sidebar";

function Home() {
  return (
    <div className="flex grid-cols-2">
      <div className="flex w-1/5 h-screen bg-slate-400">
        <SidebarComp />
      </div>

      <div className=" w-full h-screen flex content-center items-center justify-center mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
