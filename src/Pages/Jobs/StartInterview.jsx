import React, { useEffect, useState } from "react";
import useStartInterview from "../utilis/useScreenAudioRecorder";
import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetApi, PostApi } from "../utilis/Api_Calling";
import axios from "axios";
import { toast } from "react-toastify";
import sampleAudio from "./sampleaudio.mp3";

const StartInterview = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    screenVideoRef,
    webcamVideoRef,
    downloadVideo,
    downloadAudio,
  } = useStartInterview();
  const { jobId } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [job, setJob] = useState("");
  const [level, setLevel] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getJob = async (id) => {
    setLoading(true);
    try {
      let res = await GetApi(`api/AdminRoutes/GetAJobs/${id}`);
      setLevel(res?.data?.data?.videoInterview?.level);
      const questions = [];
      questions.push(
        ...res?.data?.data?.videoQuestions.flatMap(
          (topicObj) => topicObj.questions
        )
      );
      setQuestions(questions);
      const criterias =
        res?.data?.data?.videoInterview?.topic?.map((skill) => skill) || [];
      setCriteria(criterias);
      setJob(res?.data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // const getQues = async (job, level, criteria) => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       jobTitle: job?.positionName,
  //       level: level,
  //       criteria: criteria,
  //       suggestionFor: "interview ques separated comma",
  //     };
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     };
  //     const response = await axios.post(
  //       "https://get-hire-ai.vercel.app/job-suggestion",
  //       data,
  //       config
  //     );
  //     const splitArray = response.data.res.split(",");
  //     setQuestions(splitArray);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (job) {
  //     getQues(job, level, criteria);
  //   }
  // }, [job]);

  useEffect(() => {
    getJob(jobId);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      stopRecording();
      handleSubmitVideo();
    }
  };

  const handleSubmitVideo = async () => {
    // downloadVideo();
    downloadAudio();
    if (mediaBlobUrl) {
      setSubmissionStatus("submitting");
      const videoBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
      const audioBlob = new Blob([videoBlob], { type: "audio/webm" });

      const formData = new FormData();
      formData.append("video", videoBlob, "recorded-video.webm");
      formData.append("questions", JSON.stringify(questions));
      formData.append("audio", audioBlob);

      try {
        const aitext = await getTextFromAudio(formData);
        const points = await getResult(aitext);
        await submitResult(points, aitext);
        setSubmissionStatus("submitted");
        toast.success("Video submitted successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error submitting video:", error);
        toast.error("Failed to submit video. Please try again.", {
          autoClose: 1000,
        });
        setSubmissionStatus("idle");
      }
    }
  };

  const getTextFromAudio = async (formData) => {
    const response = await fetch(
      "https://shining-needed-bug.ngrok-free.app/transcribe",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to transcribe audio");
    }

    const jsonData = await response.json();
    return jsonData;
  };

  const getResult = async (aitext) => {
    const data = {
      question: aitext,
      criteria: criteria,
    };

    const response = await fetch(
      "https://shining-needed-bug.ngrok-free.app/check-answer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to check answer");
    }

    const jsonData = await response.json();
    return jsonData?.points;
  };

  const submitResult = async (points, aitext) => {
    try {
      const data = {
        jobId,
        score: points,
        aitext: aitext,
      };
      await PostApi("api/testRoutes/result/aitestresult", data);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  const sample = async () => {
    let formData = new FormData();
    formData.append("1", sampleAudio);
    getTextFromAudio(formData);
  };

  if (loading) {
    return (
      <div className="text-2xl h-full w-full text-center bg-white">
        {" "}
        Loading
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      <Container className="h-full w-full">
        {questions.length !== 0 && (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={4}
            >
              <Box mb={1}>
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={
                    status === "recording" ||
                    status === "requesting_permissions"
                  }
                  style={{
                    marginRight: "10px",
                    padding: "5px",
                    backgroundColor:
                      status === "recording" ||
                      status === "requesting_permissions"
                        ? "#ccc"
                        : "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor:
                      status === "recording" ||
                      status === "requesting_permissions"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {status === "requesting_permissions"
                    ? "Requesting Permissions..."
                    : "Start Recording"}
                </button>
                <button
                  type="button"
                  onClick={sample}
                  style={{
                    marginRight: "10px",
                    padding: "5px",
                  }}
                >
                  Sample
                </button>
                {mediaBlobUrl && (
                  <button
                    type="button"
                    onClick={handleSubmitVideo}
                    style={{
                      marginLeft: "10px",
                      padding: "10px",
                      backgroundColor: "#888",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Submit{" "}
                  </button>
                )}
              </Box>
              {status === "recording" && (
                <Box
                  mb={1}
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="h6" gutterBottom>
                    {questions[currentQuestionIndex]}
                  </Typography>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    style={{
                      padding: "5px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "Finish"}
                  </button>
                </Box>
              )}
              <Box display="flex" justifyContent="center" width="100%">
                <Box
                  flex={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <div className="bg-[#292929] w-[80vw] h-[60vh] rounded-lg">
                    <video
                      className="w-full h-full object-cover"
                      style={{ minWidth: "80vw", minHeight: "100%" }}
                      ref={webcamVideoRef}
                      autoPlay
                      muted
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </>
        )}
        <div className="d-none">
          <video
            ref={screenVideoRef}
            autoPlay
            muted
            style={{
              width: "80%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "none",
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default StartInterview;
