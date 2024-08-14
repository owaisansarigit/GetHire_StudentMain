import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AIToolsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        className="flex justify-center items-center h-screen p-4 font-[poppins]"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg overflow-y-auto max-h-[90vh] w-full max-w-4xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full sticky z-10 top-0 flex justify-between px-5 py-3 rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <span>Experience AI Tools</span>
            <span className="cursor-pointer" onClick={onClose}>
              Close
            </span>
          </div>
          <Box
            className="bg-[#e1ecfe] p-8 rounded-b-lg"
          >
            <div className="flex flex-wrap justify-around gap-4">
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Resume Builder"
                link="/blank/ai-tools/resume-builder"
              />
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Resume Analyzer"
                link="/blank/ai-tools/resume-analyser"
              />
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Mock Interview"
                link="/blank/ai-tools/mockinterview"
              />
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Mock Interview"
                link="/blank/ai-tools/mockinterview"
              />
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Mock Interview"
                link="/blank/ai-tools/mockinterview"
              />
              <Card
                desc={
                  "Leverage the power of AI to customize your resume targeted for jobs you ..."
                }
                onClose={onClose}
                title="Mock Interview"
                link="/blank/ai-tools/mockinterview"
              />
              {/* Add more Card components as needed */}
            </div>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

const Card = ({ title, desc, link, onClose }) => {
  const navigate = useNavigate();
  return (
    <Box
      className="bg-white p-4 rounded-lg shadow-lg w-[30%] h-auto transform transition-transform duration-300 hover:scale-105"
      sx={{
        border: "1px solid #e5e7eb",
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <img
        src="https://cdn.prod.website-files.com/61dfc899a471632619dca9dd/64cafabc42dffebe28cb4a82_tools-for-startups.jpeg"
        alt={title}
        className="w-full h-36 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl text-gray-800 font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      <Button
        variant="contained"
        color="primary"
        className="bg-blue-500 text-white hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-colors duration-300"
        onClick={() => {
          navigate(link);
          onClose();
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default AIToolsModal;
