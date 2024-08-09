import React from "react";

const Sidebar = () => {
  return (
    <div className="border rounded-2xl p-5 min-h-[60vh] bg-white min-w-[15vw]">
      <div className="profile w-full flex flex-col justify-start items-start">
        <h2 className="text-md font-semibold text-gray-900">
          Where are you in your job search journey ?
        </h2>
        <div className="flex flex-col  mt-3 gap-3">
          <h6 className="text-sm font-semibold text-gray-900 border rounded-3xl py-1 px-2 cursor-pointer">
            Actively Looking for jobs
          </h6>
          <h6 className="text-sm font-semibold text-gray-900 border rounded-3xl py-1 px-2 cursor-pointer">
            Actively Looking for jobs
          </h6>
          <h6 className="text-sm font-semibold text-gray-900 border rounded-3xl py-1 px-2 cursor-pointer">
            Actively Looking for jobs
          </h6>
          <h6 className="text-sm font-semibold text-gray-900 border rounded-3xl py-1 px-2 cursor-pointer">
            Actively Looking for jobs
          </h6>
          <h6 className="text-sm font-semibold text-gray-900 border rounded-3xl py-1 px-2 cursor-pointer">
            Actively Looking for jobs
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
