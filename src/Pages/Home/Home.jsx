// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import moment from "moment";
// import "react-circular-progressbar/dist/styles.css";
// import { GetApi } from "../utilis/Api_Calling";

// const Home = () => {
//   const navigate = useNavigate();
  
//   const dummyJobs = [
//     {
//       JobId: {
//         _id: "job1",
//         positionName: "Software Engineer",
//         location: "New York, NY",
//         minExp: 2,
//         maxExp: 5,
//         maxSalary: 120000,
//         Openings: 3,
//         time: "2 days ago",
//         result: "Not shortlisted",
//       },
//       CompanyId: {
//         Image: "/images/company1.png",
//         Name: "Tech Innovations Inc.",
//       },
//     },
//     {
//       JobId: {
//         _id: "job2",
//         positionName: "Product Manager",
//         location: "San Francisco, CA",
//         minExp: 4,
//         maxExp: 7,
//         maxSalary: 150000,
//         Openings: 2,
//         time: "2 days ago",
//         result: "Resume Rejected",
//       },
//       CompanyId: {
//         Image: "/images/company2.png",
//         Name: "Product Solutions LLC",
//       },
//     },
//     {
//       JobId: {
//         _id: "job3",
//         positionName: "UI/UX Designer",
//         location: "Chicago, IL",
//         minExp: 1,
//         maxExp: 3,
//         maxSalary: 80000,
//         Openings: 5,
//         time: "2 days ago",
//         result: "Cleared",
//       },
//       CompanyId: {
//         Image: "/images/company3.png",
//         Name: "Creative Studios",
//       },
//     },
//   ];

//   const [selectedtab, setselectedtab] = useState("MyJobs");
//   const [Loading, setLoading] = useState(true);
//   const [allappiledjobs, setallappiledjobs] = useState(dummyJobs);
//   const [selectedJob, setSelectedJob] = useState(dummyJobs[0]); // Initialize with the first job

//   // Handle job card click
//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <div className="py-[14px] pl-[16px] pr-[14.56px] font-[Outfit]">
//       <div className="w-full border rounded-3xl p-5 min-h-[20vh] my-5 flex justify-start items-start bg-[#13d0a6] text-white flex-col">
//         <h2 className="text-xl font-bold">Climb the career ladder</h2>
//         <br />
//         <p>gethire ai tools and resources to help you take your career to the next level</p>
//         <br />
//         <button className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-3xl mt-5">
//           Get Started
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white col-span-1 lg:col-span-1 px-6 py-6 rounded-3xl border-2 border-gray-200">
//           <div className="text-[24px] flex w-full font-[400] justify-center items-center text-[#545454] mb-4">
//             <div className="flex-col lg:flex-row gap-10 flex">
//               <div
//                 onClick={() => {
//                   setselectedtab("MyJobs");
//                 }}
//                 className={`pb-[12px] px-[30px] cursor-pointer ${
//                   selectedtab === "MyJobs"
//                     ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
//                     : "border-b-[3px] border-[#D9D9D9]"
//                 }`}
//               >
//                 Applied
//               </div>
//               <div
//                 onClick={() => {
//                   setselectedtab("MyInterview");
//                 }}
//                 className={`pb-[12px] pl-[14px] pr-[27px] cursor-pointer ${
//                   selectedtab === "MyInterview"
//                     ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
//                     : "border-b-[3px] border-[#D9D9D9]"
//                 }`}
//               >
//                 Interviews
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 overflow-auto h-[60vh]">
//             {allappiledjobs.map((job, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleJobClick(job)}
//                 className={`cursor-pointer bg-white p-4 rounded-xl shadow-sm border ${
//                   selectedJob.JobId._id === job.JobId._id ? "border-blue-500" : "border-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="text-lg font-semibold">{job.JobId.positionName}</h4>
//                     <p className="text-sm text-gray-600">{job.JobId.location}</p>
//                     <p className="text-sm text-gray-500 mt-2">{job.JobId.time}</p>
//                   </div>
//                   <img
//                     src={job.CompanyId.Image}
//                     alt={job.CompanyId.Name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="bg-white col-span-1 lg:col-span-1 p-6 rounded-3xl border-2 border-gray-200 h-[60vh] overflow-auto">
//           {selectedJob ? (
//             <div>
//               <h3 className="text-2xl font-bold mb-4">{selectedJob.JobId.positionName}</h3>
//               <p className="text-lg font-semibold mb-2">Company: {selectedJob.CompanyId.Name}</p>
//               <p className="text-gray-700 mb-4">{selectedJob.JobId.location}</p>
//               <p className="text-gray-600 mb-4">
//                 Experience Required: {selectedJob.JobId.minExp} - {selectedJob.JobId.maxExp} years
//               </p>
//               <p className="text-gray-600 mb-4">Salary: Rs. {selectedJob.JobId.maxSalary}</p>
//               <p className="text-gray-600 mb-4">Openings: {selectedJob.JobId.Openings}</p>
//               <p className="text-gray-600 mb-4">Application Status: {selectedJob.JobId.result}</p>
//             </div>
//           ) : (
//             <p>Select a job to see the details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;






















import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "react-circular-progressbar/dist/styles.css";
import { GetApi } from "../utilis/Api_Calling";

// import Logo from "../../assets/Images/Gethire SVG.svg";
import logo from "../../assets/Images/Gethire SVG.svg"
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const skillData = [
    {
      image: "/images/Ellipse 3290.svg",
      name: "Kimaya",
      skillName: "Ai Carrer Counsellor",
      buttonData: "comming soon !",
    },
    {
      image: "/images/Ellipse 3291.svg",
      name: "Kimaya",
      skillName: "Ai Carrer Counsellor",
      buttonData: "comming soon !",
    },
    {
      image: "/images/Ellipse 3292.svg",
      name: "Kimaya",
      skillName: "Skill Gap Analys",
      buttonData: "comming soon !",
    },
    {
      image: "/images/Ellipse 3293.svg",
      name: "Kimaya",
      skillName: "Mock interview",
      buttonData: "comming soon !",
    },
  ];

// this is dummy data for interviews
const dummyJobs = [
  {
    JobId: {
      _id: 'job1',
      positionName: 'Software Engineer',
      location: 'New York, NY',
      minExp: 2,
      maxExp: 5,
      maxSalary: 120000,
      Openings: 3,
      time:'2 days ago',
      result:'Not shortlisted'
    },
    CompanyId: {
      Image: '/images/company1.png',
      Name: 'Tech Innovations Inc.',
    },
  },
  {
    JobId: {
      _id: 'job2',
      positionName: 'Product Manager',
      location: 'San Francisco, CA',
      minExp: 4,
      maxExp: 7,
      maxSalary: 150000,
      Openings: 2,
       time:'2 days ago',
      result:'Resume Rejected'
    },
    CompanyId: {
      Image: '/images/company2.png',
      Name: 'Product Solutions LLC',
    },
  },
  {
    JobId: {
      _id: 'job3',
      positionName: 'UI/UX Designer',
      location: 'Chicago, IL',
      minExp: 1,
      maxExp: 3,
      maxSalary: 80000,
      Openings: 5,
       time:'2 days ago',
      result:'Cleared'
    },
    CompanyId: {
      Image: '/images/company3.png',
      Name: 'Creative Studios',
    },
  },
];

// dummy data for companies
const companies = [
  {
    id: 1,
    name: "Aakash Educational Services",
    logo: "https://via.placeholder.com/50", // Replace with actual image URLs
    rating: 3.6,
    reviews: "2.8K+",
  },
  {
    id: 2,
    name: "Seclore",
    logo: "https://via.placeholder.com/50", // Replace with actual image URLs
    rating: 3.9,
    reviews: "54",
  },
  {
    id: 3,
    name: "Morgan Stanley",
    logo: "https://via.placeholder.com/50", // Replace with actual image URLs
    rating: 3.7,
    reviews: "1K+",
  },
  {
    id: 4,
    name: "Morgan ",
    logo: "https://via.placeholder.com/50", // Replace with actual image URLs
    rating: 3.2,
    reviews: "1.6K+",
  },
  {
    id: 5,
    name: " Stanley",
    logo: "https://via.placeholder.com/50", // Replace with actual image URLs
    rating: 3.1,
    reviews: "1.5K+",
  },
];


  const [selectedtab, setselectedtab] = useState("MyJobs");
  const [AllJobs, setAllJobs] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [appiledjobs, setappiledjobs] = useState([]);
  const [allappiledjobs, setallappiledjobs] = useState(dummyJobs);
  const [allinterview, setallinterview] = useState([]);
  const [allTestResults, setAllTestResults] = useState([]);
  const [studentprofile, setstudentprofile] = useState({});




  const Getstudentprofile = async () => {
    try {
      const Getjobdata = await GetApi(`api/StudentRoutes/GetStudentProfile`);
      setstudentprofile(Getjobdata?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    Getstudentprofile();
  }, []);

  const GetAllJobs = async () => {
    try {
      const Getjobdata = await GetApi(`api/AdminRoutes/GetAllJobs`);
      // console.log(Getjobdata?.data)
      setAllJobs(Getjobdata?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const Getallappiledjobid = async () => {
    try {
      const res = await GetApi(
        `api/StudentRoutes/GetAllAppiledJobidsofaStudent`
      );
      setappiledjobs(res?.data?.data?.appliedJobIds);
    } catch (error) {
      console.log(error);
    }
  };

  const Getallappiledjob = async () => {
    try {
      const res = await GetApi(`api/StudentRoutes/GetAllAppiledJobsofaStudent`);
      setallappiledjobs(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Getallinterview = async () => {
    try {
      const res = await GetApi(
        `api/StudentRoutes/GetAllJobinterviewofaStudent`
      );
      setallinterview(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllTest = async () => {
    let id = localStorage.getItem("Studentid");
    try {
      const res = await GetApi(`api/testRoutes/result/multiid/${id}`);
      setAllTestResults(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllJobs();
    Getallappiledjobid();
    // Getallappiledjob();
    Getallinterview();
    GetAllTest();
  }, []);

  const formatSalary = (salary) => {
    if (salary >= 1000) {
      return (salary / 1000).toFixed(1) + "k";
    } else {
      return salary.toString();
    }
  };

  const hasTakenTest = (jobId) => {
    return allTestResults.some((test) => test.job === jobId);
  };



  // for jobs
  const [selectedJob, setSelectedJob] = useState(allappiledjobs[0]); // Initialize with the first job

  // Handle job card click
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

//  for moving the company images---
// Determine how many cards to show at a time
const cardsToShow = 3;
const totalCards = companies.length;
const [offset, setOffset] = useState(0);

const handleMove = () => {
  setOffset((prevOffset) => (prevOffset + 1) % (totalCards - cardsToShow + 1));
};



  useEffect(() => {
    // Optionally, you could fetch or process additional data when a job is selected
  }, [selectedJob]);

  return (
    
  //   <>
  //   <div className="py-4 pl-4 pr-4 font-[Outfit] sm:py-[14px] sm:pl-[16px] sm:pr-[14.56px]">
  //     <div className="max-w-full sm:max-w-4xl mb-8 sm:mb-12 mx-auto p-4 sm:p-6 bg-gradient-to-r from-teal-400 via-green-400 to-teal-300 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-8">
  //       <div className="space-y-4 text-center sm:text-left">
  //         <div className="flex items-center justify-center sm:justify-start space-x-2">
  //           <span className="text-xs bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
  //             Introducing
  //           </span>
  //         </div>
  //         <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
  //           Climb the career ladder
  //         </h2>
  //         <p className="text-base sm:text-lg text-white font-medium">
  //           GetHire tools and resources help you take your career to the next level
  //         </p>
  //         <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transform transition hover:scale-105">
  //           Start exploring
  //         </button>
  //       </div>
  //       <div className="hidden md:block">
  //         <div className="relative flex justify-center items-center bg-white w-32 sm:w-48 h-32 sm:h-48 rounded-full">
  //           <img
  //             src={logo}
  //             alt="GetHire Logo"
  //             className="w-24 sm:w-36 transform transition hover:scale-110"
  //           />
  //         </div>
  //       </div>
  //     </div>
  
  //     <div className="grid lg:grid-cols-6">
  //       <div className="bg-white mt-1 col-start-1 col-end-7 px-4 py-6 sm:px-[39px] sm:py-[49px] rounded-[20px] sm:rounded-[30px] border-[1px] border-[#efecec]">
  //         <div className="text-lg sm:text-[24px] flex w-full font-[400] justify-center items-center text-[#545454]">
  //           <div className="flex flex-col sm:flex-row gap-2 sm:gap-[10px] lg:gap-0">
  //             <div
  //               onClick={() => {
  //                 setselectedtab("MyJobs");
  //               }}
  //               className={`pb-2 sm:pb-[12px] px-4 sm:px-[30px] hover:cursor-pointer ${
  //                 selectedtab === "MyJobs"
  //                   ? "border-b-2 sm:border-b-[3px] text-[#5356e9]  border-[#5356e9]"
  //                   : "border-b-2 sm:border-b-[3px] border-[#D9D9D9]"
  //               }`}
  //             >
  //               Applied
  //             </div>
  //             <div
  //               onClick={() => {
  //                 setselectedtab("MyInterview");
  //               }}
  //               className={`pb-2 sm:pb-[12px] pl-2 sm:pl-[14px] pr-4 sm:pr-[27px] hover:cursor-pointer ${
  //                 selectedtab === "MyInterview"
  //                   ? "border-b-2 sm:border-b-[3px] text-[#5356e9]  border-[#5356e9]"
  //                   : "border-b-2 sm:border-b-[3px] border-[#D9D9D9]"
  //               }`}
  //             >
  //               Interviews
  //             </div>
  //           </div>
  //         </div>
  //         <div className="bg-[#d9d9d9] mt-4 sm:mt-[31px] bg-opacity-[20%] rounded-[10px] sm:rounded-[16px] flex items-center justify-center gap-2 sm:gap-[14px] p-4 sm:p-[16px]">
  //           <img
  //             src="/images/search.svg"
  //             className="w-4 sm:w-[17px] h-4 sm:h-[17px]"
  //             alt=""
  //           />
  //           <input
  //             type="text"
  //             className="w-[80%] bg-[#d9d9d9] bg-opacity-[1%] outline-none"
  //             placeholder="Search Skills"
  //           />
  //           <p className="text-sm sm:text-[16px] font-[500] text-[#4234a2]">View all</p>
  //         </div>
  //         <div className="grid md:grid-cols-2 mt-8 sm:mt-[46px] gap-6 sm:gap-[40px]">
  //           {selectedtab === "MyJobs" && (
  //             <div className="relative">
  //               <div className="flex flex-wrap gap-4">
  //                 {allappiledjobs.map((job, index) => (
  //                   <div
  //                     key={index}
  //                     onClick={() => handleJobClick(job)}
  //                     className="bg-[#fff] p-4 sm:p-[16px] rounded-[16px] shadow-lg sm:shadow-xl hover:shadow-2xl cursor-pointer"
  //                   >
  //                     <div className="flex justify-between items-center gap-4 sm:gap-16">
  //                       <p className="text-lg sm:text-[20px] font-[600]">
  //                         {job?.JobId?.positionName}
  //                       </p>
  //                       <img src="/images/material-symbols-light_share.svg" alt="Share" />
  //                     </div>
  //                     <div className="flex gap-2 sm:gap-[7px] mt-4 sm:mt-[15px]">
  //                       <img
  //                         src="/images/carbon_location.svg"
  //                         className="w-4 sm:w-[15.13px] h-4 sm:h-[19.25px]"
  //                         alt="Location"
  //                       />
  //                       <p className="text-black text-opacity-[50%] text-sm sm:text-[14px] font-[400]">
  //                         {job?.JobId?.location}
  //                       </p>
  //                     </div>
  //                     <div className="flex mt-4 sm:mt-[15px] gap-4 sm:gap-7 justify-between">
  //                       <p className="text-black text-opacity-[50%] text-sm sm:text-[14px] font-[400]">
  //                         {job?.JobId?.time}
  //                       </p>
  //                       {job?.JobId?.result === "Cleared" ? (
  //                         <p className="text-blue-500">{job?.JobId?.result}</p>
  //                       ) : (
  //                         <p className="text-red-500">X {job?.JobId?.result}</p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  
  //               {selectedJob && (
  //                 <div
  //                   className="absolute top-0 right-0 h-full w-[320px] sm:w-[500px] bg-[#fff] p-4 sm:p-[16px] rounded-[16px] shadow-xl border border-[#d9d9d9]"
  //                   style={{ top: "10px", right: "-300px" }}
  //                 >
  //                   <div className="flex flex-row justify-between">
  //                     <div>
  //                       <h2 className="text-lg sm:text-[20px] font-[600]">
  //                         {selectedJob.JobId.positionName}
  //                       </h2>
  //                       <p>{selectedJob.JobId.location}</p>
  //                     </div>
  //                     <div>
  //                       <button
  //                         className="bg-blue-600 p-2 rounded-md shadow-lg text-white hover:bg-blue-900 hover:shadow-2xl"
  //                         onClick={() => alert("View job button is clicked")}
  //                       >
  //                         View Jobs
  //                       </button>
  //                     </div>
  //                   </div>
  //                   <hr className="border-t-2 border-gray-300 my-4" />
  //                   <p className="text-lg sm:text-xl">Application status</p>
  //                   <div className="ml-4">
  //                     <p>Applied</p>
  //                     <div className="flex flex-row gap-4 sm:gap-10">
  //                       {selectedJob.JobId.result === "Cleared" ? (
  //                         <p className="text-blue-500">{selectedJob.JobId.result}</p>
  //                       ) : (
  //                         <p className="text-red-500">X {selectedJob.JobId.result}</p>
  //                       )}
  //                       <div className="flex flex-col">
  //                         <button className="text-blue-500 hover:text-blue-700">
  //                           View Feedback
  //                         </button>
  //                         <hr className="border-t-1 border-blue-300" />
  //                       </div>
  //                     </div>
  //                     <p className="text-blue-600">On 7 Aug 2024</p>
  //                   </div>
  //                   <div className="flex items-center mt-4 sm:mt-7">
  //                     <div>
  //                       <p className="text-base font-extralight">
  //                         Our Suggested Product
  //                       </p>
  //                       <div className="ml-2 sm:ml-3 mt-2 sm:mt-3">
  //                         <p className="text-red-500 text-lg sm:text-xl">Profile Boost</p>
  //                         <p className="font-extralight mt-1 sm:mt-3">
  //                           Increase your chances of selection by using Profile Boost service.
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div className="mt-4 sm:mt-8 flex flex-col items-center">
  //                     <button
  //                       className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105"
  //                       onClick={() => alert("Boost your profile")}
  //                     >
  //                       Boost your Profile
  //                     </button>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </>
  


    <>
      <div className="py-[13px] pl-[16px] pr-[14.56px] font-[Outfit] max-2xl:-mt-3   ">
        {/* <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-6  lg:gap-[27px]">
          <div className="bg-white w-full col-start-1 col-end-7 mb-[59px]  px-[29px] py-[42px] flex border-[1px] border-[#efecec] rounded-[30px]">
            <div className="w-full  flex-col lg:flex-row flex gap-[5px]">
              <div className="flex self-center w-[148px] justify-center items-center flex-col">
                <img
                  src={
                    studentprofile?.Image
                      ? studentprofile?.Image
                      : "data:image/png;base64,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"
                  }
                  className="w-full rounded-[50%]"
                  alt=""
                />
                <div className="bg-[#4234a2] mt-[-20px] px-[22px] text-white py-[1.56px] rounded-[28px] flex justify-center items-center text-[14px] font-[500]">
                  5%
                </div>
              </div>
              <div className=" w-full lg:ml-[58px]">
                <div className="flex gap-[14.19px]">
                  <img
                    src="/images/diamondBlue.svg"
                    className="w-[35.63px] h-[32.06px]"
                    alt=""
                  />
                  <p className="text-[24px] font-[500]">Step into the future</p>
                </div>
                <div className="mt-[30px] flex  flex-row">
                  <div className="flex overflow-x-scroll w-[600px] gap-[30px]">
                    {skillData.map((d, index) => (
                      <div
                        key={index}
                        className="bg-[#d9d9d9] rounded-[8px] flex w-[147px] flex-col justify-center items-center gap-[6.56px] bg-opacity-[10%]"
                      >
                        <img
                          src={d.image}
                          className="w-[100px] rounded-[50%] h-[100px]"
                          alt=""
                        />
                        <div className="w-full flex justify-center items-center flex-col">
                          <p className="text-[14px] pb-[2px] font-[500]">
                            {d.name}
                          </p>
                          <p className="text-[12px] pb-[10px] font-[400]">
                            {d.skillName}
                          </p>
                          <button className="bg-[#4234a2] rounded-[4px] text-[12px] font-[400] text-white w-[107px] h-[27px] flex justify-center items-center">
                            {d.buttonData}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="w-full border rounded-3xl p-5 min-h-[20vh] my-5 flex justify-start items-start bg-[#13d0a6] text-white flex-col">
          <h2 className="text-xl font-bold">Climb the career ladder</h2>
          <br />
          <p>
            gethire ai tools and resorces to help you take your career to the
            next level
          </p>
          <br />
          <button className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-3xl mt-5">
            Get Started
          </button>
        </div> */}
        
        <div className="max-w-4xl h-56 mb-12 max-2xl:h-52 mx-auto p-6 bg-gradient-to-r from-teal-400 via-green-400 to-teal-300 rounded-2xl shadow-xl flex items-center justify-between space-x-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                  Introducing
                </span>
              </div>
              <div>
                  <h2 className="text-4xl max-lg:text-2xl max-xl:text-2xl font-extrabold text-white leading-tight">
                    Climb the career ladder
                  </h2>
                  <p className="text-lg  max-lg:text-base max-xl:text-base text-white font-medium">
                    GetHire tools and resources help you take your career to the next
                    level
                  </p>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
                Start exploring
              </button>
            </div>
            <div className="hidden md:block">
            <div className="relative flex justify-center items-center bg-white w-32 h-32 max-lg:w-20 max-lg:h-20   rounded-full">
              <img
                src={logo}
                alt="GetHire Logo"
                className="w-24 max-lg:w-16  transform transition hover:scale-110"
              />
            </div>
            </div>
          </div>


             {/* <div className="max-w-5xl mx-auto p-6 bg-gradient-to-r from-teal-400 to-green-300 rounded-2xl shadow-xl flex items-center justify-between">
      <div className="space-y-4 pl-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
            Introducing
          </span>
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight">
          Climb the career ladder
        </h2>
        <p className="text-lg text-white font-medium">
          Naukri 360's tools and resources help you take your career to the next
          level
        </p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
          Start exploring
        </button>
      </div>
      <div className="flex justify-center items-center w-1/3 relative">
        <div className="bg-white rounded-r-2xl flex items-center justify-center w-full h-full">
          <div className="bg-white rounded-full p-4 shadow-md">
            <img
              src={logo}
              alt="Naukri 360 Logo"
              className="w-28 md:w-36"
            />
          </div>
        </div>
      </div>
             </div>  */}
         






        <div className="grid lg:grid-cols-6 -mt-5">
          <div className="bg-white mt-[1px] col-start-1 col-end-7 px-[39px] py-[49px] rounded-[30px] border-[1px] border-[#efecec] ">
            <div className="text-[24px] flex w-full font-[400] justify-center items-center text-[#545454] -mt-8">
              <div className=" flex flex-row  gap-0 ">
                {/* <div
                  onClick={() => {
                    setselectedtab("AllJobs");
                  }}
                  className={`pb-[12px] pr-[8px] pl-[32px] ${
                    selectedtab === "AllJobs"
                      ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
                      : "border-b-[3px] border-[#D9D9D9]"
                  } `}
                >
                  All Jobs
                </div> */}
                <div
                  onClick={() => {
                    setselectedtab("MyJobs");
                  }}
                  className={`pb-[12px] px-[30px] hover:cursor-pointer ${
                    selectedtab === "MyJobs"
                      ? "border-b-[3px] text-[#5356e9]  border-[#5356e9] "
                      : "border-b-[3px] border-[#D9D9D9]"
                  }`}
                >
                  Applied
                </div>
                <div
                  onClick={() => {
                    setselectedtab("MyInterview");
                  }}
                  className={`pb-[12px] pl-[14px] pr-[27px] hover:cursor-pointer ${
                    selectedtab === "MyInterview"
                      ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
                      : "border-b-[3px] border-[#D9D9D9]"
                  }`}
                >
                  Interviews
                </div>
              </div>
            </div>
            <div className="bg-[#d9d9d9] mt-3 bg-opacity-[20%] max-lg:justify-between rounded-[16px] flex items-center justify-center gap-[14px] p-[16px]">
              <img
                src="/images/search.svg"
                className="w-[17px] h-[17px]"
                alt=""
              />
              <input
                type="text"
                className="w-[80%] bg-[#d9d9d9] bg-opacity-[1%] outline-none"
                placeholder="Search Skills"
              />
              <p className="text-[16px] max-lg:text-[13px] font-[500] text-[#4234a2]">View all</p>
            </div>
            <div className="grid md:grid-cols-2  mt-[46px] gap-[40px] ">
              {/* <div
                className="rounded-[16px] py-[26px] px-[20px] bg-gradient-to-tl from-[#0f87b3] to-[#462da1]"
                onClick={() => navigate("/premium")}
                style={{ cursor: "pointer" }}
               >
                <div className="flex gap-[10px]">
                  <img
                    src="/images/Star 1.svg"
                    className="w-[22px] h-[22px]"
                    alt=""
                  />
                  <p className="text-[18px] font-[500] text-white">
                    120 Premium members received job opportunities this week
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-[10px] mt-[15px]">
                  <div className="relative">
                    <img
                      src="/images/Polygon 1.svg"
                      className="w-[72px] h-[72px]"
                      alt=""
                    />
                    <img
                      src="/images/diamondBlue.svg"
                      className="w-[35.63px] absolute top-[22px] left-[18px] h-[32.06px]"
                      alt=""
                    />
                  </div>
                  <p className="text-[40px] font-[500] text-white">
                    Go Premium
                  </p>
                </div>
              </div> */}

              {/* {selectedtab === "AllJobs" &&
                AllJobs?.map((job, index) => {
                  const isJobApplied = appiledjobs.includes(job._id);
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        navigate(`/blank/JobViewDetails/${job._id}`);
                      }}
                      className="bg-[#fff] p-[16px] rounded-[16px] shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-[20px] font-[600]">
                          {job?.positionName}
                          <br />
                          <span>
                            <p className="text-black text-opacity-[50%] text-[14px] font-[400]">
                              {moment(job.createdAt).fromNow()}
                              {moment(job.createdAt)
                                .fromNow()
                                .includes("hours") &&
                              moment(job.createdAt).fromNow() !==
                                "a few seconds ago" &&
                              moment(job.createdAt).fromNow() !==
                                "in a few seconds"
                                ? " ago"
                                : ""}
                            </p>
                          </span>
                        </p>

                        <img
                          src="/images/material-symbols-light_share.svg"
                          alt=""
                        />
                      </div>
                      <div className="flex gap-[7px] mt-[15px]">
                        <img
                          src="/images/carbon_location.svg"
                          className="w-[15.13px] h-[19.25px]"
                          alt=""
                        />
                        <p className="text-black text-opacity-[50%] text-[14px] font-[400]">
                          {job?.location}
                        </p>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-[16px] mt-[10px]">
                        <div className="w-[150px]  justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-black text-opacity-[50%] flex gap-[4px]">
                          <img
                            src="/images/home.svg"
                            className="w-[18px] h-[18px]"
                            alt=""
                          />
                          <p className="text-[14px] font-[400]">
                            Work From Home
                          </p>
                        </div>
                        <div className="w-[100px] justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-black text-opacity-[50%] flex gap-[4px]">
                          <img src="/images/bytesize_work.svg" alt="" />
                          <p className="text-[12px] font-[400]">
                            {job?.minExp} to {job?.maxExp} Years
                          </p>
                        </div>
                        <div className="w-[115px] flex justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-[#4234a2]">
                          <p className="text-[11px] font-[400]">
                            Rs. {job?.minSalary} to {job?.maxSalary}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row w-full gap-[20px] justify-between mt-[20px] lg:items-center">
                        <div className="flex gap-[10px]">
                          <img
                            src={
                              job?.Company?.Image
                                ? job?.Company?.Image
                                : "https://cdn.vectorstock.com/i/1000v/64/35/icon-logo-for-construction-business-vector-19196435.jpg"
                            }
                            className="w-[38px] h-[38px] rounded-[50%]"
                            alt=""
                          />
                          <div>
                            <p className="text-[15px] font-[500]">
                              {job?.Company?.Name}
                            </p>
                            <p className="text-[13px] font-[400] text-black text-opacity-[50%]">
                              Available Post {job?.Openings}
                            </p>
                          </div>
                        </div>
                        {isJobApplied ? (
                          <button className="w-[103px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center">
                            Applied
                          </button>
                        ) : (
                          <button className="w-[103px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center">
                            Apply now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              {Loading && (
                <div className="flex justify-center items-center text-2xl">
                  Loading...
                </div>
              )} */}


              {/* --------------------------------------------------------------------------------- */}
              {/* {selectedtab === "MyJobs" && 
                allappiledjobs?.map((job, index) => {
                  const jobId = job?.JobId?._id;
                  const takenTest = hasTakenTest(jobId);
                  return (
                    <div
                      key={index}
                      className="bg-[#fff] p-[16px] rounded-[16px] shadow-xl hover:shadow-2xl "
                     >
                      

                          <div className="flex justify-between items-center">
                            <p className="text-[20px] font-[600]">
                              {job?.JobId?.positionName}
                            </p>
                            <img
                              src="/images/material-symbols-light_share.svg"
                              alt=""
                            />
                          </div>
                          <div className="flex gap-[7px] mt-[15px]">
                            <img
                              src="/images/carbon_location.svg"
                              className="w-[15.13px] h-[19.25px]"
                              alt=""
                            />
                            <p className="text-black text-opacity-[50%] text-[14px] font-[400]">
                              {job?.JobId?.location}
                            </p>
                          </div>
                          <div className="flex  mt-[15px] gap-7 justify-between  ">
                                <p className="text-black text-opacity-[50%] text-[14px] font-[400]">{job?.JobId?.time}</p>
                                <p className=" text-red-500 ">{job?.JobId?.result}</p>
                          </div>
                     
                    </div>
                  );
                })} */}

                
                     
                      {/* <div className="relative">
                          <div className="flex flex-wrap gap-4">
                            {allappiledjobs.map((job, index) => (
                              <div
                                key={index}
                                onClick={() => handleJobClick(job)}
                                className="bg-[#fff] p-[16px] rounded-[16px] shadow-xl hover:shadow-2xl cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <p className="text-[20px] font-[600]">{job?.JobId?.positionName}</p>
                                  <img src="/images/material-symbols-light_share.svg" alt="Share" />
                                </div>
                                <div className="flex gap-[7px] mt-[15px]">
                                  <img src="/images/carbon_location.svg" className="w-[15.13px] h-[19.25px]" alt="Location" />
                                  <p className="text-black text-opacity-[50%] text-[14px] font-[400]">{job?.JobId?.location}</p>
                                </div>
                                <div className="flex mt-[15px] gap-7 justify-between">
                                  <p className="text-black text-opacity-[50%] text-[14px] font-[400]">{job?.JobId?.time}</p>
                                  <p className="text-red-500">{job?.JobId?.result}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {selectedJob && (
                                <div
                                  className="absolute top-0 right-0 h-96 bg-[#fff] p-[16px] rounded-[16px] shadow-xl border border-[#d9d9d9]"
                                  style={{ width: '300px', top: '10px', right: '10px' }}
                                >
                                  <h2 className="text-[20px] font-[600]">{selectedJob.JobId.positionName}</h2>
                                  <p><strong>Location:</strong> {selectedJob.JobId.location}</p>
                                  <p><strong>Time:</strong> {selectedJob.JobId.time}</p>
                                  <p><strong>Result:</strong> {selectedJob.JobId.result}</p>
                                  <div className="flex items-center mt-4">
                                    <img src={selectedJob.CompanyId.Image} className="w-[38px] h-[38px] rounded-[50%]" alt="Company" />
                                    <div className="ml-2">
                                      <p className="text-[15px] font-[500]">{selectedJob.CompanyId.Name}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                        </div>  */}
                        
                        {/* {selectedtab === "MyJobs" && 
                           <div className="relative">
                            <div className="flex flex-wrap gap-4 max-2xl:gap-3 max-2xl:w-60">
                              {allappiledjobs.map((job, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleJobClick(job)}
                                  className="bg-[#fff] p-[16px] rounded-[16px] shadow-xl hover:shadow-2xl cursor-pointer"
                                >
                                  <div className="flex justify-between items-center gap-16">
                                    <p className="text-[20px] font-[600]">{job?.JobId?.positionName}</p>
                                    <img src="/images/material-symbols-light_share.svg" alt="Share" />
                                  </div>
                                  <div className="flex gap-[7px] mt-[15px]">
                                    <img src="/images/carbon_location.svg" className="w-[15.13px] h-[19.25px]" alt="Location" />
                                    <p className="text-black text-opacity-[50%] text-[14px] font-[400]">{job?.JobId?.location}</p>
                                  </div>
                                  <div className="flex mt-[15px] gap-7 justify-between">
                                    <p className="text-black text-opacity-[50%] text-[14px] font-[400]">{job?.JobId?.time}</p>
                                      {job?.JobId?.result === 'Cleared' ? (
                                          <p className=" text-blue-500"> {job?.JobId?.result}</p> 
                                        ) : (
                                            <p className=" text-red-500">X {job?.JobId?.result}</p> 
                                          )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            </div>
                        } */}
                         
                      


<div className="flex flex-row gap-8  max-lg:pr-7 max-2xl:-mt-6 ">
     <div className=" max-lg:w-14 max-lg:-pl-5 ">
            {selectedtab === "MyJobs" && (
              <div className="flex flex-col flex-1 gap-6 max-sm:gap-4  ">
                {dummyJobs.map((job, index) => (
                  <div
                    key={index}
                    onClick={() => handleJobClick(job)}
                    className="bg-[#fff] p-[14px] w-72 max-lg:w-48 max-sm:w-36 max-sm:h-40 rounded-[20px] shadow-xl hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
                  >
                    <div className="flex justify-between items-center gap-4 max-lg:gap-2 max-sm:gap-1">
                      <p className="text-[24px] max-lg:text-[20px] max-sm:text-[16px] font-[700]">{job.JobId.positionName}</p>
                      <img src="/images/material-symbols-light_share.svg" alt="Share" className="w-[24px] h-[24px] max-lg:w-[20px] max-lg:h-[20px]" />
                    </div>
                    <div className="flex gap-[10px] mt-[20px] max-lg:gap-[6px]">
                      <img src="/images/carbon_location.svg" className="w-[20px] h-[25px] max-lg:w-[18px] max-lg:h-[20px]" alt="Location" />
                      <p className="text-black text-opacity-[60%] text-[16px] max-lg:text-[13px] max-sm:text-[11px] font-[500]">{job.JobId.location}</p>
                    </div>
                    <div className="flex mt-[20px] gap-8 max-sm:gap-2 justify-between">
                      <p className="text-black text-opacity-[60%] text-[16px] font-[500] max-lg:text-[13px] max-sm:text-[11px]">{job.JobId.time}</p>
                      {job.JobId.result === 'Cleared' ? (
                        <p className="text-blue-500 max-lg:text-[13px]">{job.JobId.result}</p>
                      ) : (
                        <p className="text-red-500 max-lg:text-[13px]">X {job.JobId.result}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
     </div>
        <div className=" max-lg:ml-[120px]  ">
            {selectedJob && (
              <div
                className="w-[500px] max-2xl:w-[400px] max-xl:w-[300px] bg-[#fff] p-[24px] rounded-[20px] shadow-xl border border-[#d9d9d9] "
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h2 className="text-[24px] font-[700] max-lg:text-[18px]">{selectedJob.JobId.positionName}</h2>
                    <p>{selectedJob.JobId.location}</p>
                  </div>
                  <div>
                    <button
                      className="bg-blue-600 p-3 rounded-md shadow-lg text-white max-lg:p-2 hover:bg-blue-900 hover:shadow-2xl"
                      onClick={() => alert("View job button is clicked")}
                    >
                      View Jobs
                    </button>
                  </div>
                </div>
                <hr className="border-t-2 border-gray-300 my-4" />
                <p className="text-xl">Application status</p>
                <div className="ml-4">
                  <p>Applied</p>
                  <div className="flex flex-row gap-12">
                    {selectedJob.JobId.result === 'Cleared' ? (
                      <p className="text-blue-500">{selectedJob.JobId.result}</p>
                    ) : (
                      <p className="text-red-500">X {selectedJob.JobId.result}</p>
                    )}
                    <div className="flex flex-col">
                      <button className="text-blue-500 hover:text-blue-700">View Feedback</button>
                      <hr className="border-t-1 border-blue-300" />
                    </div>
                  </div>
                  <p className="text-blue-600">On 7 Aug 2024</p>
                </div>
                <div className="flex items-center mt-8">
                  <div>
                    <p className="text-base font-extralight">Our Suggested Product</p>
                    <div className="ml-4 mt-4">
                      <p className="text-red-500 text-xl">Profile Boost</p>
                      <p className="font-extralight">Your application would be shown on the priority list to the recruiter</p>
                      <div className="flex flex-row gap-6 mt-4">
                        <button className="hover:text-blue-500 hover:scale-105 duration-300">Buy Now</button>
                        <button className="text-red-400 hover:scale-105 duration-300">Explore</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
</div>


                        



                            {/* {selectedJob && (
                             <div
                             className="absolute top-0 right-0 h-full w-[500px] bg-[#fff] p-[16px] rounded-[16px] shadow-xl border border-[#d9d9d9] max-2xl:w-[400px] "
                             style={{ top: '10px', right: '-430px' }}
                           >
                             <div className="flex flex-row  justify-between">
                               <div>
                                 <h2 className="text-[20px] font-[600]">{selectedJob.JobId.positionName}</h2>
                                 <p> {selectedJob.JobId.location}</p>
                               </div>
                               <div>
                                 <button className=" bg-blue-600 p-2 rounded-md shadow-lg text-white hover:bg-blue-900 hover:shadow-2xl "
                                  onClick={()=> alert("View job button is clicked")} >
                                  View Jobs</button>
                               </div>
                             </div>
                               <hr className="border-t-2 border-gray-300 my-4" />
                               <p className=" text-xl ">Application status</p>
                               <div className=" ml-4">
                                 <p>Applied</p>
                                 <div className="flex flex-row gap-10">
                                        {selectedJob.JobId.result === 'Cleared' ? (
                                          <p className=" text-blue-500"> {selectedJob.JobId.result}</p> 
                                        ) : (
                                            <p className=" text-red-500">X {selectedJob.JobId.result}</p> 
                                          )}
                                   <div className="flex flex-col">
                                       <button className="text-blue-500 hover:text-blue-700">View Feedback</button>
                                       <hr className="border-t-1 border-blue-300 " />
                                   </div>
                                 </div>
                                   <p className="text-blue-600">On 7 Aug 2024</p>
                               </div>
                             <div className="flex items-center mt-7">
                               <div className="">
                                 <p className="text-base font-extralight ">Our Suggested Product</p>
                                 <div className=" ml-3 mt-3">
                                    <p className=" text-red-500 text-xl">Profile Boost</p>
                                    <p className=" font-extralight ">Your application would be shown on priority list to the recruiter</p>
                                      <div className="flex flex-row gap-5 mt-4  ">
                                         <button className="hover:text-blue-500 hover:scale-105 duration-300">Buy Now</button>
                                         <button className=" text-red-400 hover:scale-105 duration-300">Explore</button>
                                      </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                           
                            )} */}
                    {/* {selectedJob && (
                      <div
                        className={`absolute top-0 h-full w-[500px] bg-[#fff] p-[16px] rounded-[16px] shadow-xl border border-[#d9d9d9]
                          max-2xl:w-[400px] 
                          max-xl:w-[350px] 
                        max-lg:w-[300px] 
                          `}
                        style={{ top: '10px', 
                          right: (() => {
                            if (window.innerWidth <= 1024) return '-300px'; // max-lg
                            if (window.innerWidth <= 1280) return '-350px'; // max-xl
                            if (window.innerWidth <= 1536) return '-380px'; // max-2xl
                            return '-430px'; // Default
                          })(),
                        }}
                      >
                        <div className="flex flex-row justify-between">
                          <div>
                            <h2 className="text-[20px] font-[600]">{selectedJob.JobId.positionName}</h2>
                            <p>{selectedJob.JobId.location}</p>
                          </div>
                          <div>
                            <button
                              className="bg-blue-600 p-2 rounded-md shadow-lg text-white hover:bg-blue-900 hover:shadow-2xl"
                              onClick={() => alert("View job button is clicked")}
                            >
                              View Jobs
                            </button>
                          </div>
                        </div>
                        <hr className="border-t-2 border-gray-300 my-4" />
                        <p className="text-xl">Application status</p>
                        <div className="ml-4">
                          <p>Applied</p>
                          <div className="flex flex-row gap-10">
                            {selectedJob.JobId.result === 'Cleared' ? (
                              <p className="text-blue-500">{selectedJob.JobId.result}</p>
                            ) : (
                              <p className="text-red-500">X {selectedJob.JobId.result}</p>
                            )}
                            <div className="flex flex-col">
                              <button className="text-blue-500 hover:text-blue-700">View Feedback</button>
                              <hr className="border-t-1 border-blue-300" />
                            </div>
                          </div>
                          <p className="text-blue-600">On 7 Aug 2024</p>
                        </div>
                        <div className="flex items-center mt-7">
                          <div>
                            <p className="text-base font-extralight">Our Suggested Product</p>
                            <div className="ml-3 mt-3">
                              <p className="text-red-500 text-xl">Profile Boost</p>
                              <p className="font-extralight">Your application would be shown on priority list to the recruiter</p>
                              <div className="flex flex-row gap-5 mt-4">
                                <button className="hover:text-blue-500 hover:scale-105 duration-300">Buy Now</button>
                                <button className="text-red-400 hover:scale-105 duration-300">Explore</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} */}





                            
                          {/* </div>
                           } */}






                {/* -------------------------------------------------------------- */}
                {selectedtab === "MyInterview" &&
                allinterview?.map((job, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        navigate(`/blank/JobViewDetails/${job._id}`);
                      }}
                      className="bg-[#fff] p-[16px] rounded-[16px] shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-[20px] font-[600]">
                          {job?.JobId?.positionName}
                        </p>
                        <img
                          src="/images/material-symbols-light_share.svg"
                          alt=""
                        />
                      </div>
                      <div className="flex gap-[7px] mt-[15px]">
                        <img
                          src="/images/carbon_location.svg"
                          className="w-[15.13px] h-[19.25px]"
                          alt=""
                        />
                        <p className="text-black text-opacity-[50%] text-[14px] font-[400]">
                          {job?.JobId?.addlocation}
                        </p>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-[16px] mt-[10px]">
                        <div className="w-[150px]  justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-black text-opacity-[50%] flex gap-[4px]">
                          <img
                            src="/images/home.svg"
                            className="w-[18px] h-[18px]"
                            alt=""
                          />
                          <p className="text-[14px] font-[400]">
                            Work From Home
                          </p>
                        </div>
                        <div className="w-[95.75px] justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-black text-opacity-[50%] flex gap-[4px]">
                          <img src="/images/bytesize_work.svg" alt="" />
                          <p className="text-[14px] font-[400]">
                            {job?.JobId?.Experience} Years
                          </p>
                        </div>
                        <div className="w-[65px] flex justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-[#4234a2]">
                          <p className="text-[14px] font-[400]">
                            Rs. {formatSalary(job?.JobId?.maxSalary)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row w-full gap-[20px] justify-between mt-[20px] lg:items-center">
                        <div className="flex gap-[10px]">
                          <img
                            src={job?.CompanyId?.Image}
                            className="w-[38px] h-[38px] rounded-[50%]"
                            alt=""
                          />
                          <div>
                            <p className="text-[15px] font-[500]">
                              {job?.CompanyId?.Name}
                            </p>
                            <p className="text-[13px] font-[400] text-black text-opacity-[50%]">
                              Available Post {job?.JobId?.Openings}
                            </p>
                          </div>
                        </div>
                        <button className="w-[103px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center">
                          Applied
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
          
          
           <div className="flex items-center justify-between mt-6 p-6 bg-blue-200 rounded-lg shadow-md">
             <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-purple-100 p-4 rounded-full">
                  {/* Replace the SVG below with your own SVG or image */}
                  <img src={logo} alt="logo" className=" w-16 h-16 text-purple-600" />
                  {/* <svg
                    className="w-10 h-10 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 12v.01M12 9a3 3 0 110 6 3 3 0 010-6z"
                    />
                  </svg> */}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Increase your chances in interviews with AI</h2>
                  <p className="text-sm text-gray-600">
                    Access AI-powered mock interview and question bank for your desired role
                  </p>
                </div>
              </div>
              <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
                Start preparing
              </button>
            </div>


            {/* <div className="bg-white p-6 rounded-lg shadow-xl mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Top companies</h2>
                <a href="#" className="text-blue-600 hover:underline">
                  View all
                </a>
              </div>
              <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                  <div key={company.id} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 border-2 border-y-blue-200 border-x-blue-200 border-b-blue-200">
                    <img src={company.logo} alt={company.name} className="w-16 h-16 mb-4" />
                    <h3 className="text-sm font-semibold text-gray-900 text-center truncate">{company.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="ml-1 text-sm font-medium text-gray-800">{company.rating}</span>
                      <span className="ml-2 text-xs text-gray-600">| {company.reviews} reviews</span>
                    </div>
                    <a href="#" className="mt-4 text-base font-semibold text-blue-600 hover:underline">
                      View jobs
                    </a>
                  </div>
                ))}
              </div>
            </div> */}

                  <div className="relative bg-white p-6 rounded-lg shadow-xl mt-12">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Top companies</h2>
                        <a href="#" className="text-blue-600 hover:underline">View all</a>
                      </div>
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500"
                          style={{ transform: `translateX(-${offset * (100 / cardsToShow)}%)` }}
                        >
                          {companies.map((company) => (
                            <div
                              key={company.id}
                              className="flex-none w-full sm:w-1/3 p-4" // Adjust width to fit three cards
                              style={{ flex: '0 0 33.333%' }} // Adjust width for three cards
                            >
                              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 border-2 border-y-blue-200 border-x-blue-200 border-b-blue-200">
                                <img src={company.logo} alt={company.name} className="w-16 h-16 mb-4" />
                                <h3 className="text-sm font-semibold text-gray-900 text-center truncate">{company.name}</h3>
                                <div className="flex items-center mt-2">
                                  <span className="text-yellow-500 text-sm">★</span>
                                  <span className="ml-1 text-sm font-medium text-gray-800">{company.rating}</span>
                                  <span className="ml-2 text-xs text-gray-600">| {company.reviews} reviews</span>
                                </div>
                                <a href="#" className="mt-4 text-base font-semibold text-blue-600 hover:underline">View jobs</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleMove}
                        className="absolute top-1/2 mt-7 right-4 transform -translate-y-1/2 bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
                      >
                      <IoIosArrowForward/>
                      </button>
                    </div>
   






      </div>
    </>
  );
};

export default Home;


