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
        <div className="bg-white rounded-lg">
          <div className="w-full flex justify-between px-5 py-3 rounded-lg">
            <span>Explore GetHire.AI</span>
            <span className="cursor-pointer" onClick={onclose}>
              Close
            </span>
          </div>
          <Box
            className="bg-[#e1ecfe] p-8 rounded-b-lg w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-around gap-2">
              <Card
                desc={
                  "Leaverage the power of AI to customize your resume for targeted for jobs you ..."
                }
                onClose={onClose}
                title="Resume Builder"
                link={"/blank/ai-tools/resume-builder"}
              />
              <Card
                desc={
                  "Leaverage the power of AI to customize your resume for targeted for jobs you ..."
                }
                onClose={onClose}
                title="Resume Analyzer"
                link={"/blank/ai-tools/resume-analyser"}
              />
              <Card
                desc={
                  "Leaverage the power of AI to customize your resume for targeted for jobs you ..."
                }
                onClose={onClose}
                title="Mock Interview"
                link={"/blank/ai-tools/mockinterview"}
              />
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
      className="bg-white p-2 rounded-lg shadow-lg w-[32%] h-[auto]"
      sx={{
        border: "1px solid #e5e7eb",
      }}
    >
      <img
        src={
          "https://cdn.prod.website-files.com/61dfc899a471632619dca9dd/64cafabc42dffebe28cb4a82_tools-for-startups.jpeg"
        }
        alt={title}
        className="w-full h-36 object-cover mb-2"
      />
      <h2 className="text-xl text-gray-700">{title}</h2>
      <p className="text-xs text-gray-700 mb-2">{desc}</p>
      <Button
        variant="contained"
        color="primary"
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
