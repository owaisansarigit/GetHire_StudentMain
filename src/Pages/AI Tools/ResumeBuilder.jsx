import React, { useState } from "react";
import ResumeModal from "./ResumeModal";
import ResumeBuilerForm from "./ResumeBuilderForm";

const ResumeBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    openForRemote: false,
    openForRelocate: false,
    summary: "",
    webLinks: [],
    name: "",
    education: [],
    certificates: [],
    skills: [],
    workExperience: [],
    isExperienced: false,
  });
  const [hasResumeData, setHasResumeData] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (resumeData.jobTitle || resumeData.jobDescription) {
      setHasResumeData(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full border-b pb-3">
        {!hasResumeData && (
          <>
            <div className="w-full flex justify-between items-center px-5">
              <div className="w-full flex flex-col items-start">
                <span className="text-3xl text-gray-900 font-semibold">
                  My Resumes
                </span>
                <span className="text-xl text-gray-500 ">
                  create edit analyze and organize your resumes for divers
                  opportunities
                </span>
              </div>
              <div className="w-1/4 flex justify-end">
                <button
                  onClick={openModal}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
                >
                  Add Resume
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {hasResumeData && (
        <div className="w-full min-h-screen overflow-y-auto flex gap-10 ">
          {" "}
          <ResumeBuilerForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
          <div className="w-1/2 bg-white p-4 rounded shadow overflow-y-auto max-h-[100vh]">

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4 pb-2">
              <div className="text-lg">
                {resumeData.firstName} {resumeData.lastName}
                <br />
                <p className="text-sm text-gray-500">{resumeData?.jobTitle}</p>
                <p className="text-sm text-gray-800 w-3/4 mx-auto">
                  {resumeData?.email} &nbsp; {resumeData?.phone} &nbsp;{" "}
                  {resumeData?.location} &nbsp; {resumeData?.city} &nbsp;
                  {resumeData?.state} &nbsp; {resumeData?.country} &nbsp;
                  {resumeData?.openForRemote && "open For Remote"} &nbsp;{" "}
                  {resumeData?.openForRelocate && "open For Relocate"} &nbsp;
                </p>
              </div>
            </h2>
            
            <div className="mt-4">
              <h3 className="text-md font- border-b">Summary</h3>
              <p className="text-sm">{resumeData?.summary}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-md font- border-b">Skills</h3>
              <ul className="list-disc ml-5">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="">
                    {skill?.category}
                    <ul>
                      {skill?.skill?.map((skil) => (
                        <li>{skil}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-md border-b">Work Experience</h3>
              <ul className="list-disc ml-5">
                {resumeData.workExperience.map((exp, index) => (
                  <li key={index}>{exp?.title}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-md border-b">Education</h3>
              <ul className="list-disc ml-5">
                {resumeData.education?.map((edu, index) => (
                  <li key={index}>{edu?.degree}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {isModalOpen && (
        <ResumeModal
          resumeData={resumeData}
          setResumeData={setResumeData}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
