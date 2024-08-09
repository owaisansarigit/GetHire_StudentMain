import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetApi } from "../utilis/Api_Calling";


const Jobs = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [AllJobs, setAllJobs] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [appiledjobs, setappiledjobs] = useState([]);
  const [totaljob, Settotaljob] = useState("");

  const GetAllJobs = async () => {
    try {
      const Getjobdata = await GetApi(`api/AdminRoutes/GetAllJobs`);
      console.log(Getjobdata?.data.data[1]);
      setAllJobs(Getjobdata?.data?.data);
      Settotaljob(Getjobdata?.data?.data?.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    GetAllJobs();
    Getallappiledjob();
  }, []);

  const formatSalary = (salary) => {
    if (salary >= 1000) {
      return (salary / 1000).toFixed(1) + "k";
    } else {
      return salary.toString();
    }
  };

  function NewformatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  const jobDetail = async (id) => {
    navigate(`/blank/JobViewDetails/${id}`);
  };

  const [profileFilter, setProfileFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [workFromHomeFilter, setWorkFromHomeFilter] = useState(false);
  const [partTimeFilter, setPartTimeFilter] = useState(false);
  const [includeInternshipsFilter, setIncludeInternshipsFilter] =
    useState(false);
  const [salaryFilter, setSalaryFilter] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState("");

  const applyFilters = (jobs) => {
    return jobs.filter((job) => {
      // Apply individual filters
      const profileMatch =
        !profileFilter ||
        job.positionName.toLowerCase().includes(profileFilter.toLowerCase());
      const locationMatch =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const workFromHomeMatch =
        !workFromHomeFilter ||
        job.contractDetails.toLowerCase() === "work from home";
      const partTimeMatch =
        !partTimeFilter || job.contractDetails.toLowerCase() === "part-time";
      const includeInternshipsMatch =
        !includeInternshipsFilter ||
        job.jobPipeline.toLowerCase() === "internship";
      const salaryMatch = job.maxSalary >= salaryFilter * 1000; // assuming salary is in thousands
      const experienceMatch =
        !experienceFilter || job?.minExp === experienceFilter;

      return (
        profileMatch &&
        locationMatch &&
        workFromHomeMatch &&
        partTimeMatch &&
        includeInternshipsMatch &&
        salaryMatch &&
        experienceMatch
      );
    });
  };

  const clearAllFilters = () => {
    setProfileFilter("");
    setLocationFilter("");
    setWorkFromHomeFilter(false);
    setPartTimeFilter(false);
    setIncludeInternshipsFilter(false);
    setSalaryFilter(0);
    setExperienceFilter("");
  };

  return (
    <>
      {Loading ? (
        <div className="bg-white flex justify-center pt-20 min-w-[100vw] min-h-[100vh] text-2xl">
          Loading...
        </div>
      ) : (
        <div
          className="flex flex-col justify-start items-center w-full bg-[#f8f9fa]"
          style={{ fontFamily: "poppins" }}
        >
          <>
            <div className="w-full flex justify-start items-center bg-[#f8f9fa] py-2">
              <p className="text-[16px] font-[400] text-[#000] text-opacity-[50%] px-[34px] cursor-pointer">
                Home &gt; Jobs
              </p>
            </div>
            <div className="flex flex-col justify-start items-start w-full md:flex-row gap-[34px] mt-[16px] px-[34px] bg-[#f8f9fa]">
              <div className="bg-white min-h-[100] w-1/5 rounded-[8px]  flex flex-col  items-start p-[26px] border-[1px] ">
                <p className="text-md font-[400] text-gray-900">All Fillters</p>
                <br />
                <hr className="border-b w-full" />
                <div className="flex flex-col gap-[6px] mt-[6px] w-full">
                  <p className="text-black text-opacity-[50%] text-[16px] font-[400]">
                    Profile
                  </p>
                  <input
                    className="border-[1px] h-[42px] border-[#d9d9d9] rounded-[4px]"
                    type="text"
                    value={profileFilter}
                    onChange={(e) => setProfileFilter(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mt-[8px] w-full">
                  <p className="text-black text-opacity-[50%] text-[16px] font-[400]">
                    Location
                  </p>
                  <input
                    className="border-[1px] h-[42px] border-[#d9d9d9] rounded-[4px]"
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <p className="text-md font-[400] text-gray-900 mt-[20px]">
                  Work Mode
                </p>
                <br />
                <hr className="border-b w-full" />
                <div className="mt-[20px] flex gap-[8px] w-full">
                  <input
                    type="checkbox"
                    checked={workFromHomeFilter}
                    onChange={(e) => setWorkFromHomeFilter(e.target.checked)}
                  />
                  <p className="text-[14px] font-[400] text-black text-opacity-[50%]">
                    Work from home
                  </p>
                </div>
                <div className="mt-[20px] flex gap-[8px] w-full">
                  <input
                    type="checkbox"
                    checked={partTimeFilter} // Connect checked to the state
                    onChange={(e) => setPartTimeFilter(e.target.checked)}
                  />
                  <p className="text-[14px] font-[400] text-black text-opacity-[50%]">
                    Part-time
                  </p>
                </div>
                <div className="mt-[20px] flex gap-[8px] w-full">
                  <input type="checkbox" />
                  <p className="text-[14px] font-[400] text-black text-opacity-[50%]">
                    Include all internships
                  </p>
                </div>
                <div className="w-full mt-[28px]">
                  <p>Annual salary (in lakhs)</p>
                  <div className="w-full">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={salaryFilter}
                      onChange={(e) =>
                        setSalaryFilter(parseInt(e.target.value))
                      } // Convert value to integer and update state
                      className="slider w-full"
                    />
                    <div className="flex gap-[30px] text-[#000] text-opacity-[50%]">
                      <p>0</p>
                      <p>2</p>
                      <p>4</p>
                      <p>6</p>
                      <p>8</p>
                      <p>10</p>
                    </div>
                  </div>
                </div>
                <div className="mt-[35px] w-full">
                  <p className="text-black text-opacity-[50%] text-[16px] font-[400]">
                    Years of experience
                  </p>
                  <input
                    className="border-[1px] w-3/4 h-[42px] border-[#d9d9d9] rounded-[4px]"
                    type="text"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                  />
                </div>
                <div
                  onClick={clearAllFilters}
                  className="mt-[44px] w-full flex justify-end"
                >
                  <p className="text-[16px] font-[500] text-[#4234a2]">
                    Clear all
                  </p>
                </div>
              </div>
              <div className="flex gap-[10px] flex-col w-3/5 max-h-[80vh] overflow-scroll px-2 bg-[#f8f9fa]">
                <div className="w-full flex justify-between items-center my-2 px-4">
                  <span className="text-sm text-gray-600">
                    {totaljob} Jobs Available
                  </span>
                  <span className="text-sm text-blue-600 cursor-pointer font-semibold">
                    send me more jobs like these
                  </span>
                </div>
                {applyFilters(AllJobs)?.length > 0 ? (
                  applyFilters(AllJobs)?.map((job, index) => {
                    const isJobApplied = appiledjobs.includes(job._id);
                    return (
                      <div
                        onClick={() => {
                          jobDetail(job?._id);
                        }}
                        key={index}
                        className="bg-white rounded-3xl border-[1px] border-[#efecec] p-5"
                      >
                        <div className="mt-[8px]">
                          <div className="flex justify-between gap-[20px]">
                            <p className="text-xl font-medium lg:w-[476px] flex-wrap">
                              {job?.positionName}
                            </p>
                            <p>
                              {isJobApplied ? (
                                <button className="w-[103px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center">
                                  Applied
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    jobDetail(job?._id);
                                  }}
                                  className="w-[103px] h-[32px] text-white bg-gradient-to-tl from-[#0f87b3] to-[#462da1] rounded-[5px] flex justify-center items-center"
                                >
                                  Apply now
                                </button>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-600  text-md font-normal">
                            {job?.Company?.Name}
                          </p>
                          <div className="flex flex-col  text-[14px] font-[400] text-black text-opacity-[50%] mt-[5px] gap-2">
                            <div className="flex justify-start items-center flex-wrap gap-3">
                              <span>
                                <i className="fa-solid fa-briefcase mr-2"></i>{" "}
                                0-5 Years &nbsp; |
                              </span>
                              <span>
                                <i className="fa-solid fa-dollar-sign mr-2"></i>{" "}
                                {job?.minSalary}-{job?.maxSalary} salary &nbsp;
                                |
                              </span>
                              <span>
                                {" "}
                                <i className="fa-solid fa-location-dot mr-2"></i>
                                {job?.location} &nbsp; |
                              </span>
                            </div>
                            <div className="flex justify-start items-center flex-wrap gap-3">
                              <span>
                                <i className="fa-solid fa-clipboard mr-2"></i>{" "}
                                Must have
                                {job?.skillAssessment?.map((skill) => (
                                  <span className="mx-1">{skill.skill},</span>
                                ))}
                              </span>
                            </div>
                            <div className="flex justify-start items-center flex-wrap gap-3">
                              {job?.skillsRequired?.map((skill) => (
                                <span>{skill} &nbsp;&nbsp; .</span>
                              ))}
                            </div>
                            <div className="w-full flex justify-between items-center flex-wrap gap-3">
                              <span className="flex gap-3">
                                <img
                                  src="/images/pepicons-pencil_rewind-time.svg"
                                  className="w-[18px]"
                                  alt=""
                                />{" "}
                                {NewformatDate(job?.createdAt)}
                              </span>
                              <span className="cursor-pointer">
                                <i className="fa-solid fa-bookmark mr-3"></i>{" "}
                                Save
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-[16px] border-[1px] border-[#efecec] p-[27px]">
                    No Jobs Found With This query
                  </div>
                )}
              </div>
              <div className="bg-white min-h-[100] w-1/5 rounded-[8px]  flex flex-col  items-start p-[26px] border-[1px] ">
                
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default Jobs;
