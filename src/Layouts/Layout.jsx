import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom/dist";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className=" fixed w-full z-10">
          <Header />
        </div>
        <div className="flex mt-[100px]">
          <div className=" hidden md:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex bg-[#fafbff] flex-col overflow-y-auto overflow-x-hidden gap-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
