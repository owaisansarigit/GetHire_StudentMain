import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetApi, PostApi } from "../utilis/Api_Calling";
import JobApplyModel from "./JobApplyModel";

const JobViewDetails = () => {
  const { id } = useParams();

  const [Jobdetail, setJobdetail] = useState({});
  const [Loading, setLoading] = useState(true);
  const [isbookmarked, setisbookmarked] = useState(false);
  const [isappiled, setisappiled] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [appiledjobs, setappiledjobs] = useState([]);

  const Getallbookmark = async () => {
    try {
      const Getbookmark = await GetApi(`api/StudentRoutes/getallbookmark`);
      setBookmarkedJobs(Getbookmark?.data?.data?.bookmarkedJobs);
    } catch (error) {
      console.log(error);
    }
  };
  const Getallappiledjob = async () => {
    try {
      const Getbookmark = await GetApi(
        `api/StudentRoutes/GetAllAppiledJobidsofaStudent`
      );
      setappiledjobs(Getbookmark?.data?.data?.appliedJobIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getallbookmark();
    Getallappiledjob();
  }, []);

  const GetJobdetails = async () => {
    try {
      const Getjobdata = await GetApi(`api/AdminRoutes/GetAJobs/${id}`);
      setJobdetail(Getjobdata?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    GetJobdetails();
  }, [id]);

  function formatDate(dateString) {
    const [day, month, year] = dateString?.split("-");
    const date = new Date(`${month}-${day}-${year}`);
    const options = { day: "numeric", month: "short", year: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  function NewformatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  const AddtoBookmark = async () => {
    try {
      let obj = {
        jobId: id,
      };
      const responce = await PostApi("api/StudentRoutes/AddToBookmark", obj);
      // console.log(responce?.data)
      Getallbookmark();
      alert(responce?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isBookmarked = bookmarkedJobs.includes(id);
    setisbookmarked(isBookmarked);
  }, [bookmarkedJobs, id]);

  useEffect(() => {
    const isappiled = appiledjobs.includes(id);
    setisappiled(isappiled);
  }, [appiledjobs, id]);

  const removefromBookmark = async () => {
    try {
      let obj = {
        jobId: id,
      };
      const responce = await PostApi(
        "api/StudentRoutes/RemovefromBookmark",
        obj
      );
      // console.log(responce?.data)
      Getallbookmark();
      alert(responce?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const [Applymodel, setApplymodel] = useState(false);

  const jobapplymodelopen = () => {
    setApplymodel(true);
  };
  const jobapplymodelclose = () => {
    setApplymodel(false);
  };

  return (
    <>
      {Loading ? (
        <div className="bg-white flex justify-center pt-20 min-w-[100vw] min-h-[100vh] text-2xl">
          Loading...
        </div>
      ) : (
        <div className="py-[28px] px-[20px] flex flex-col w-full justify-center items-center font-[Outfit]">
          <div className="border rounded-xl w-[75%]">
            <h1>{Jobdetail?.positionName}</h1>
          </div>
          <div className="bg-white rounded-[16px] lg:w-[998px] mt-[27px] border-[1px] border-[#efecec] p-[29px]">
            <div className="border-[1px] rounded-[3px] w-[125px] h-[26px] p-[4px] border-[#d9d9d9] flex items-center gap-[7px]">
              <img
                src="/images/Vector 4.svg"
                className="w-[16px] h-[8px]"
                alt=""
              />
              <p className="text-[14px] font-[400] text-[#000] text-opacity-[50%]">
                Actively hiring
              </p>
            </div>
            <div className="mt-[8px]">
              <p className="text-[20px] lg:w-[476px] flex-wrap font-[400]">
                {Jobdetail?.positionName}
              </p>

              <p className="text-black mt-[12px] text-opacity-[50%] text-[14px] font-[400]">
                {Jobdetail?.Company?.Name}
              </p>
              <div className="flex gap-[5px] items-center mt-[24px]">
                <img src="/images/home.svg" alt="" />
                <p className="text-black text-opacity-[50%] text-[14px] font-[400]">
                  {Jobdetail?.addlocation}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row text-[14px] font-[400] text-black text-opacity-[50%] mt-[22px] gap-[10px] lg:gap-[54px] lg:flex-wrap">
                <div className="flex flex-col gap-[8px] min-w-[150px]">
                  <div className="flex gap-[4px] items-center">
                    <img
                      src="/images/carbon_play-outline.svg"
                      alt="Start Date Icon"
                    />
                    <p className="text-[12px]">START DATE</p>
                  </div>
                  <p>Immediately</p>
                </div>
                <div className="flex flex-col gap-[8px] min-w-[150px]">
                  <div className="flex gap-[4px] items-center">
                    <img
                      src="/images/game-icons_duration.svg"
                      alt="Duration Icon"
                    />
                    <p>DURATION</p>
                  </div>
                  {/* <p>{Jobdetail?.contractDetails}</p> */}
                </div>
                <div className="flex flex-col gap-[8px] min-w-[150px]">
                  <div className="flex gap-[4px] items-center">
                    <img src="/images/nimbus_money (1).svg" alt="Salary Icon" />
                    <p>SALARY</p>
                  </div>
                  <p>
                    {Jobdetail?.minSalary} to {Jobdetail?.maxSalary}
                  </p>
                </div>
                <div className="flex flex-col gap-[8px] min-w-[150px]">
                  <div className="flex gap-[4px] items-center">
                    <img src="/images/guidance_time.svg" alt="Apply By Icon" />
                    <p className="text-[13px] w-[70px]">APPLY BY</p>
                  </div>
                  {/* <p>{formatDate(Jobdetail?.ExpirationDate)}</p> */}
                </div>
              </div>

              <div className="flex mt-[28px] gap-[28px] ">
                <div className="flex gap-[4px] bg-[#d9d9d9] text-[12px] font-[400] text-[#000] text-opacity-[50%] justify-center items-center bg-opacity-[50%] rounded-[3px] px-[6px] py-[2px]">
                  <img
                    src="/images/pepicons-pencil_rewind-time.svg"
                    className="w-[18px] h-[18px]"
                    alt=""
                  />
                  <p>{NewformatDate(Jobdetail?.createdAt)}</p>
                </div>
                <p className="text-[12px] font-[400] text-[#000] text-opacity-[50%] bg-[#d9d9d9] bg-opacity-[50%] p-[4px] ">
                  Job
                </p>
              </div>
              <div className="flex mt-[35px] border-b-[1px] border-[#ebe6e6] pb-[32px] justify-between items-center">
                <div className="flex gap-[7px] text-[16px] font-[400] text-black text-opacity-[50%]">
                  <img
                    src="/images/clarity_users-line.svg"
                    className="w-[24px] h-[24px]"
                    alt=""
                  />
                  <p>{Jobdetail?.totalApplicationCount} applicants</p>
                </div>
                <div className="flex gap-[37px]">
                  {isbookmarked ? (
                    <div
                      onClick={() => {
                        removefromBookmark();
                      }}
                    >
                      <img src="/images/saved.svg" alt="" />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        AddtoBookmark();
                      }}
                    >
                      <img src="/images/save.svg" alt="" />
                    </div>
                  )}

                  <div>
                    {" "}
                    <img
                      src="/images/material-symbols-light_share.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[17px]">
              <p className="text-[18px] font-[400]">
                About {Jobdetail?.Company?.Name}
              </p>
              <div className="text-[14px] mt-[9px] flex gap-[7px] items-center font-[400] text-[#4234a2]">
                <p>Company Page</p>
                <img
                  src="/images/sendvector.svg"
                  className="w-[9.33px] h-[9.33px]"
                  alt=""
                />
              </div>
              <p className="text-[16px] mt-[14px] text-black text-opacity-[50%] font-[400]">
                {Jobdetail?.Company?.About}
              </p>
              <div className="border-[1px] mt-[17px] border-[#d9d9d9] rounded-[3px] w-full p-[17px]">
                <p className="text-[16px] font-[500]">Activity on </p>
                <div className="flex justify-around gap-[27px] mt-[10px]">
                  <div className="flex flex-col justify-center items-center gap-[5px] text-black text-opacity-[50%] text-[16px] font-[400]">
                    <img src="/images/uiw_date.svg" alt="" />
                    <p>Hiring since July 2021</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-[5px] text-black text-opacity-[50%] text-[16px] font-[400]">
                    <img src="/images/iconoir_mail.svg" alt="" />
                    <p>103 opportunities posted</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-[5px] text-black text-opacity-[50%] text-[16px] font-[400]">
                    <img src="/images/ph_user-light.svg" alt="" />
                    <p>54 candidates hired</p>
                  </div>
                </div>
              </div>
              <p className="text-[18px] mt-[25px] font-[500]">About the job</p>
              <br />
              <p className="text-[16px] font-[500] text-[#000] text-opacity-[50%]">
                {Jobdetail?.Job_Description}
              </p>
              <p className="text-[18px] mt-[25px] font-[500]">
                About the work from home job responsibilities
              </p>
              <div className="text-[16px] font-[500] text-black text-opacity-[50%] mt-[25px]">
                <p>Selected Student's day-to-day responsibilities include:</p>
                <ol className="mt-[24px]">{Jobdetail?.Responsibilities}</ol>
              </div>
              <div className="mt-[25px]">
                <p className="text-[18px] font-[500]">Skill(s) required</p>
                <div className="flex flex-wrap gap-2">
                  {Jobdetail?.skillsRequired?.map((skill, index) => (
                    <p
                      key={index}
                      className=" text-[16px] text-center bg-blue-50 rounded-[20px] px-4 font-[500] text-blue-500 m-2"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
              <div className="text-[16px] font-[500] text-black text-opacity-[50%] mt-[25px]">
                <p className="text-black">Who can apply </p>
                <ol>{Jobdetail?.qualification}</ol>
              </div>
              <div className="mt-[25px]">
                <p className="text-[18px] font-[500]">Perks</p>
                <div className="flex gap-[16px] mt-[6px]">
                  <p className=" text-[16px] text-center bg-blue-50 rounded-[20px] px-4 font-[500] text-blue-500 m-2">
                    Certificate
                  </p>
                  <p className=" text-[16px] text-center bg-blue-50 rounded-[20px] px-4 font-[500] text-blue-500 m-2">
                    Letter of recommendation
                  </p>
                </div>
              </div>
              <div className="mt-[25px]">
                <p className="text-[18px] font-[500]">Number of openings</p>

                <p className="text-[16px] font-[500] text-black text-opacity-[50%]">
                  {Jobdetail?.Openings}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-end items-center mt-[61px]">
              {isappiled ? (
                <button className="text-white bg-gradient-to-tr from-[#0f87b3] to-[#462da1] w-[153px] h-[49px] flex justify-center items-center rounded-[6px]">
                  Already applied
                </button>
              ) : (
                <button
                  onClick={jobapplymodelopen}
                  className="text-white bg-gradient-to-tr from-[#0f87b3] to-[#462da1] w-[153px] h-[49px] flex justify-center items-center rounded-[6px]"
                >
                  Apply now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {Applymodel && (
        <JobApplyModel
          onOpen={jobapplymodelopen}
          onClose={jobapplymodelclose}
          Jobdetail={Jobdetail}
        />
      )}
    </>
  );
};

export default JobViewDetails;
