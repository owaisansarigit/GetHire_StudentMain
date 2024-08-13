import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AIToolsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        className="flex justify-center items-center h-screen p-4"
        onClick={onClose}
      >
        <Box
          className="bg-gray-200 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-wrap justify-around gap-2">
            <Card title="Resume Builder" />
            <Card title="Resume Analyzer" />
            <Card title="Mock Interview" />
            <Card title="Resume Builder" />
            <Card title="Resume Analyzer" />
            <Card title="Mock Interview" />
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

const Card = ({ title }) => {
  return (
    <Box
      className="bg-white p-2 rounded-lg shadow-lg w-[32%] h-[15rem]"
      sx={{
        border: "1px solid #e5e7eb",
      }}
    >
      <img
        src={
          "https://cdn.prod.website-files.com/61dfc899a471632619dca9dd/64cafabc42dffebe28cb4a82_tools-for-startups.jpeg"
        }
        alt={title}
        className="w-full h-36 object-cover rounded-lg mb-2"
      />
      <Button variant="contained" color="primary" fullWidth>
        {title}
      </Button>
    </Box>
  );
};

export default AIToolsModal;
