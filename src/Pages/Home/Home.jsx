import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "react-circular-progressbar/dist/styles.css";
import { GetApi } from "../utilis/Api_Calling";

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


  return (
    <>
      <div className="py-[14px] pl-[16px] pr-[14.56px] font-[Outfit] ">
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
        <div className="w-full border rounded-3xl p-5 min-h-[20vh] my-5 flex justify-start items-start bg-[#13d0a6] text-white flex-col">
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
        </div>
        <div className="grid lg:grid-cols-6">
          <div className="bg-white mt-[1px] col-start-1 col-end-7 px-[39px] py-[49px] rounded-[30px] border-[1px] border-[#efecec]">
            <div className="text-[24px] flex w-full font-[400] justify-center items-center text-[#545454]">
              <div className=" flex-col lg:flex-row gap-[10px] lg:gap-0  flex">
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
                  className={`pb-[12px] px-[30px] ${
                    selectedtab === "MyJobs"
                      ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
                      : "border-b-[3px] border-[#D9D9D9]"
                  }`}
                >
                  Applied
                </div>
                <div
                  onClick={() => {
                    setselectedtab("MyInterview");
                  }}
                  className={`pb-[12px] pl-[14px] pr-[27px] ${
                    selectedtab === "MyInterview"
                      ? "border-b-[3px] text-[#5356e9]  border-[#5356e9]"
                      : "border-b-[3px] border-[#D9D9D9]"
                  }`}
                >
                  Interviews
                </div>
              </div>
            </div>
            <div className="bg-[#d9d9d9] mt-[31px] bg-opacity-[20%] rounded-[16px] flex items-center justify-center gap-[14px] p-[16px]">
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
              <p className="text-[16px] font-[500] text-[#4234a2]">View all</p>
            </div>
            <div className="grid md:grid-cols-2  mt-[46px] gap-[40px]">
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
              {selectedtab === "AllJobs" &&
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
                          {/* <p className="text-[14px] font-[400]">
                            Rs. {formatSalary(job?.maxSalary)}
                          </p> */}
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
              )}


              {/* --------------------------------------------------------------------------------- */}
              {selectedtab === "MyJobs" &&
                allappiledjobs?.map((job, index) => {
                  const jobId = job?.JobId?._id;
                  const takenTest = hasTakenTest(jobId);
                  return (
                    <div
                      key={index}
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
                          {job?.JobId?.location}
                        </p>
                      </div>
                      <div>
                        <p>{job?.JobId?.time}</p>
                        <p>{job?.JobId?.result}</p>
                      </div>
                      {/* <div className="flex flex-col lg:flex-row gap-[16px] mt-[10px]">
                        <div className="w-[150px] justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-black text-opacity-[50%] flex gap-[4px]">
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
                          <p className="text-[10px] font-[400]">
                            {job?.JobId?.minExp} to {job?.JobId?.maxExp} Years
                          </p>
                        </div>
                        <div className="w-[65px] flex justify-center h-[30px] rounded-[8px] items-center border-[1px] border-[#d9d9d9] text-[#4234a2]">
                          <p className="text-[11px] font-[400]">
                            Rs. {job?.JobId?.maxSalary}
                          </p>
                        </div>
                      </div> */}
                      {/* <div className="flex flex-col lg:flex-row w-full gap-[20px] justify-between mt-[20px] lg:items-center">
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
                        <button
                          disabled
                          className="w-[70px] text-[14px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center"
                        >
                          Applied
                        </button>
                        {!takenTest && (
                          <button
                            onClick={() => navigate(`/blank/question/${jobId}`)}
                            className="w-[70px] text-[14px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center"
                          >
                            Start Test
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/blank/start/${jobId}`)}
                          className="w-[70px] text-[14px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center"
                        >
                          Video Test
                        </button>
                      </div> */}
                    </div>
                  );
                })}


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
      </div>
    </>
  );
};

export default Home;
