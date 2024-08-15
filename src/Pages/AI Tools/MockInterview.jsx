import React from "react";

const MockInterview = () => {
  return (
    <div className="flex flex-col justify-start items-center pt-36 bg-gradient-to-l from-[#4086f0] to-[#15bb98] min-h-screen">
      <span className="text-xl font-bold text-gray-800">
        included with Premium Membership
      </span>
      <span className="text-6xl font-bold text-gray-800 mb-5">
        Ace Your upcoming job interviews !
      </span>
      <span className="text-xl font-semibold text-gray-600 mb-5">
        practice role and company specific interview questions and get real time
        feedback
        <br /> from your private and judgment free AI interview Coach .S tart
        your mock interview
      </span>
      <button className="bg-white text-blue-600 font-semibold px-5 py-2 mt-5">
        Start Your Mock interview
      </button>
    </div>
  );
};

export default MockInterview;
