import React, { useState } from "react";
import ReactDOM from "react-dom";

const ResumeModal = ({ closeModal, setResumeData, resumeData }) => {
  const [step, setStep] = useState(0);

  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
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

  const handleRemoveItem = (arrayName, index) => {
    const updatedArray = resumeData[arrayName].filter((_, i) => i !== index);
    setResumeData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed min-w-[75vw] inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center font-[poppins]"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white px-6 py-4 rounded shadow-lg w-3/4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center border-gray-500 border-b">
          <h2 className="text-lg mb-4">Create New Resume</h2>
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={handleOutsideClick}
          ></i>
        </div>

        {step === 0 && (
          <div className="w-full">
            <div className="w-full flex flex-col">
              <div className="text-md font-semibold text-gray-800 my-3">
                How Do you want to started ?
              </div>
              <div className="text-sm text-gray-500">
                Browse Styles to march your profile and aspirations you pick
                from the base of your publish resumes.
              </div>
            </div>
            <div className="flex gap-5 w-full justify-around my-5">
              <div
                className="flex flex-col max-w-[15rem] border rounded p-3 items-start cursor-pointer bg-gray-100"
                onClick={handleNextStep}
              >
                <i class="fa-brands fa-linkedin bg-blue-500 text-white text-4xl rounded flex justify-center items-center p-5"></i>
                <span className="text-gray-900 text-lg my-2">
                  Start From Scratch
                </span>
                <span className="text-gray-500 text-sm">
                  Build your resume from the ground up using our intuitive
                  editor
                </span>
              </div>
              <div
                className="flex flex-col max-w-[15rem] border rounded p-3 items-start cursor-pointer bg-gray-100"
                onClick={handleNextStep}
              >
                <i class="fa-brands fa-linkedin bg-blue-500 text-white text-4xl rounded flex justify-center items-center p-5"></i>
                <span className="text-gray-900 text-lg my-2">
                  Start From Scratch
                </span>
                <span className="text-gray-500 text-sm">
                  Build your resume from the ground up using our intuitive
                  editor
                </span>
              </div>
              <div
                className="flex flex-col max-w-[15rem] border rounded p-3 items-start cursor-pointer bg-gray-100"
                onClick={handleNextStep}
              >
                <i class="fa-brands fa-linkedin bg-blue-500 text-white text-4xl rounded flex justify-center items-center p-5"></i>
                <span className="text-gray-900 text-lg my-2">
                  Start From Scratch
                </span>
                <span className="text-gray-500 text-sm">
                  Build your resume from the ground up using our intuitive
                  editor
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="text-md my-4">Basic Details</h3>
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
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-md my-4">Experience Level</h3>
            <select
              name="isExperienced"
              onChange={handleExperienceChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="false">Fresher</option>
              <option value="true">Experienced</option>
            </select>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-md my-4">Skills</h3>
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
            <div className="flex gap-3 justify-start flex-wrap">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex gap-3 border rounded-3xl px-3 py-2 items-center mb-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveItem("skills", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 4 && resumeData.isExperienced && (
          <div>
            <h3 className="text-md my-4">Work Experience</h3>
            <input
              type="text"
              placeholder="Enter work experience"
              onBlur={(e) => handleArrayChange(e, "workExperience")}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-md my-4">Educational Details</h3>
            <input
              type="text"
              placeholder="Enter educational details"
              onBlur={(e) => handleArrayChange(e, "education")}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={() => {
                // Handle saving resume data
                console.log(resumeData);
                closeModal();
              }}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;
