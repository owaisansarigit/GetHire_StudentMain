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
        <div className="flex justify-center w-full mt-[100px] bg-[#fafbff]">
          <div className=" hidden md:block p-3 bg-[#fafbff] w-1/6">
            <Sidebar />
          </div>
          <div className="flex-1 flex bg-[#fafbff] flex-col overflow-y-auto overflow-x-hidden gap-8 max-w-3/6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
