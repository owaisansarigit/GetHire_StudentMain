import React from "react";

import { Outlet } from "react-router-dom/dist";
import Header from "../Components/Header/Header";

const HeaderLayout = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className=" fixed w-full z-10">
          <Header />
        </div>

        <div className="flex-1 mt-[100px] flex bg-[#fafbff] flex-col overflow-y-auto overflow-x-hidden gap-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HeaderLayout;
