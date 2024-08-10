import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    minWidth: "30rem",
    maxWidth: "90vw",
    minHeight: "80vh",
    position: "fixed",
    right: 20,
    bottom: 20,
    display: "flex",
    flexDirection: "column",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: "1rem",
  backgroundColor: theme.palette.background.paper,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  overflowY: "auto",
}));

const ChatContainer = styled(List)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
}));

const MessageItem = styled(ListItem)(({ theme, type }) => ({
  backgroundColor:
    type === "user" ? theme.palette.primary.main : theme.palette.grey[300],
  color:
    type === "user"
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  borderRadius: 20,
  marginBottom: theme.spacing(1),
  maxWidth: "70%",
  alignSelf: type === "user" ? "flex-end" : "flex-start",
  padding: "8px 12px",
  wordBreak: "break-word",
  position: "relative",
}));

const JobApplyModelChat = ({
  onOpen,
  onClose,
  onSubmit,
  setEducationDetails,
}) => {
  const [step, setStep] = useState(0);
  const [qualification, setQualification] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const addBotMessage = (message) => {
    setChatHistory((prev) => [...prev, { type: "bot", message }]);
  };

  const addUserMessage = (message) => {
    setChatHistory((prev) => [...prev, { type: "user", message }]);
  };

  const logAnswersAndClose = () => {
    setEducationDetails({
      qualification,
      skills: selectedSkills,
      experience,
      company,
      yearsOfExperience,
    });
    onSubmit();
  };

  const handleNext = () => {
    setIsInputDisabled(true);
    switch (step) {
      case 0:
        addUserMessage(qualification);
        setStep(step + 1);
        setTimeout(() => {
          addBotMessage("Please select your skills.");
          setIsInputDisabled(false);
        }, 500);
        break;
      case 1:
        addUserMessage(selectedSkills.join(", "));
        setStep(step + 1);
        setTimeout(() => {
          addBotMessage("Do you have any work experience?");
          setIsInputDisabled(false);
        }, 500);
        break;
      case 2:
        addUserMessage(experience);
        if (experience === "Experienced") {
          setStep(step + 1);
          setTimeout(() => {
            addBotMessage(
              "Please provide your company name and years of experience."
            );
            setIsInputDisabled(false);
          }, 500);
        } else {
          logAnswersAndClose();
        }
        break;
      case 3:
        addUserMessage(
          `Company: ${company}, Years of Experience: ${yearsOfExperience}`
        );
        logAnswersAndClose();
        break;
      default:
        setIsInputDisabled(false);
        break;
    }
  };

  const renderInput = () => {
    switch (step) {
      case 0:
        return (
          <Autocomplete
            options={["10th", "12th", "Graduate", "Post Graduate", "PhD"]}
            value={qualification}
            onChange={(event, newValue) => setQualification(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Highest Qualification"
                disabled={isInputDisabled}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && qualification) {
                    handleNext();
                  }
                }}
              />
            )}
          />
        );
      case 1:
        return (
          <Autocomplete
            multiple
            options={[
              "JavaScript",
              "Python",
              "React",
              "Node.js",
              "Java",
              "C++",
            ]}
            value={selectedSkills}
            onChange={(event, newValue) => setSelectedSkills(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills"
                disabled={isInputDisabled}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && selectedSkills.length > 0) {
                    handleNext();
                  }
                }}
              />
            )}
          />
        );
      case 2:
        return (
          <Autocomplete
            options={["Fresher", "Experienced"]}
            value={experience}
            onChange={(event, newValue) => setExperience(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Experience"
                disabled={isInputDisabled}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && experience) {
                    handleNext();
                  }
                }}
              />
            )}
          />
        );
      case 3:
        return (
          <>
            <TextField
              label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
              disabled={isInputDisabled}
              onKeyPress={(e) => {
                if (e.key === "Enter" && company && yearsOfExperience) {
                  handleNext();
                }
              }}
            />
            <TextField
              label="Years of Experience"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              type="number"
              fullWidth
              disabled={isInputDisabled}
              onKeyPress={(e) => {
                if (e.key === "Enter" && company && yearsOfExperience) {
                  handleNext();
                }
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (step === 0) addBotMessage("What is your highest qualification?");
  }, [step]);

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={onOpen}
    >
      <StyledDialogTitle>
        Job Application Chat
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <ChatContainer>
          {chatHistory.map((chat, index) => (
            <MessageItem key={index} type={chat.type}>
              <ListItemText primary={chat.message} />
            </MessageItem>
          ))}
        </ChatContainer>
        {renderInput()}
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default JobApplyModelChat;
