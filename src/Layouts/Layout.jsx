import Sidebar from "../Components/Sidebar/Sidebar";
import Sidebar2 from "../Components/Sidebar/Sidebar2";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom/dist";
import Home from "../Pages/Home/Home";
import { useState,useCallback, useMemo  } from "react";


const Layout = () => {
  
// this is all for show the side bar and home baar connection
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionVisible = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSectionHidden = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
    {/* for allow sticky i just add on "overflow-y-auto h-screen"  */}
      <div className="flex flex-col overflow-hidden overflow-y-auto h-screen">
        <div className=" fixed w-full z-10">
          <Header />
        </div>
        <div className="flex justify-center w-full mt-[73px] bg-[#fafbff]">
          <div className="  hidden md:block p-3 bg-[#fafbff] w-1/5">
            <Sidebar  activeSection={activeSection} 
          scrollToSection={scrollToSection}  />
          </div>
          <div className="w-[60%] -mr-[285px] max-2xl:-mr-[250px]">
            <Home onSectionVisible={handleSectionVisible} 
             onSectionHidden={handleSectionHidden}/>
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
