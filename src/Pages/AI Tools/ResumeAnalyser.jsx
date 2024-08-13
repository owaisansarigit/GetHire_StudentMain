import React, { useRef, useState } from "react";

const ResumeAnalyser = () => {
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full font-[poppins]">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Analyse Resume
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative bg-white min-w-[25rem] py-10 px-5 rounded shadow-lg flex justify-center items-center flex-col">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fa-solid fa-close text-xl"></i>
            </button>
            <h2 className="text-gray-900 text-lg mb-1">Upload Your Resume</h2>
            <p className="text-gray-500 text-sm mb-5">
              Get your resume reviewed in instant
            </p>
            <div
              className="w-full h-20 rounded-lg border flex justify-center items-center cursor-pointer"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <span>Upload A File</span>
            </div>
            <input
              ref={fileInputRef}
              style={{ visibility: "hidden" }}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}

      {file && (
        <div className="mt-4">
          <iframe
            src={file}
            height="800"
            title="Resume"
            className="border w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyser;
