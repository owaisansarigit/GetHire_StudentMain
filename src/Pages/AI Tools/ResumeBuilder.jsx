import React, { useState } from "react";
import ResumeModal from "./ResumeModal";

const ResumeBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [],
    skills: [],
    workExperience: [],
    isExperienced: false,
  });

  const [hasResumeData, setHasResumeData] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (
      resumeData.name ||
      resumeData.email ||
      resumeData.phone ||
      resumeData.skills.length > 0 ||
      resumeData.workExperience.length > 0 ||
      resumeData.education.length > 0
    ) {
      setHasResumeData(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, arrayName) => {
    const newArray = [...resumeData[arrayName], e.target.value];
    setResumeData((prevData) => ({
      ...prevData,
      [arrayName]: newArray,
    }));
    e.target.value = "";
  };

  const handleExperienceChange = (e) => {
    setResumeData({
      ...resumeData,
      isExperienced: e.target.value === "true",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex gap-10 justify-center items-center">
      {/* Initial State: Show Add Button */}
      {!hasResumeData && (
        <button
          onClick={openModal}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
        >
          Add Resume
        </button>
      )}

      {/* After Modal Close: Show Edit Inputs and Resume Preview */}
      {hasResumeData && (
        <div className="w-full min-h-screen flex gap-10">
          {/* Left side: Input fields for editing */}
          <div className="w-1/2 bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Resume
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={resumeData.name}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={resumeData.email}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={resumeData.phone}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter work experience"
              onBlur={(e) => handleArrayChange(e, "workExperience")}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentSkill.trim()) {
                  handleArrayChange(e, "skills");
                  setCurrentSkill("");
                }
              }}
              placeholder="Enter a skill and press Enter"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter educational details"
              onBlur={(e) => handleArrayChange(e, "education")}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />

            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              Add More Details
            </button>
          </div>

          {/* Right side: Resume template preview */}
          <div className="w-1/2 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Resume Preview
            </h2>

            <div className="text-lg font-semibold">{resumeData.name}</div>
            <div className="text-sm text-gray-600">{resumeData.email}</div>
            <div className="text-sm text-gray-600">{resumeData.phone}</div>

            <div className="mt-4">
              <h3 className="text-md font-bold">Skills</h3>
              <ul className="list-disc ml-5">
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-bold">Work Experience</h3>
              <ul className="list-disc ml-5">
                {resumeData.workExperience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-bold">Education</h3>
              <ul className="list-disc ml-5">
                {resumeData.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
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
