import Sidebar from "../Components/Sidebar/Sidebar";
import Sidebar2 from "../Components/Sidebar/Sidebar2";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom/dist";
import Home from "../Pages/Home/Home";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className=" fixed w-full z-10">
          <Header />
        </div>
        <div className="flex justify-center w-full mt-[73px] bg-[#fafbff]">
          <div className="  hidden md:block p-3 bg-[#fafbff] w-1/5">
            <Sidebar />
          </div>
          <div className="w-[55%] -mr-[260px] max-2xl:-mr-[250px]">
            <Home/>
          </div>
          {/* <div className="flex-1 flex bg-[#fafbff] flex-col overflow-y-auto overflow-x-hidden gap-8 max-w-3/6">
            <Outlet />
          </div> */}
           <div className="hidden md:block p-3 bg-[#fafbff] w-1/5 ">
            <Sidebar2 />
           </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
