import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetApi, PostApi } from "../utilis/Api_Calling";
import axios from "axios";

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [skills, setSkills] = useState([]);
  const [testId, setTestId] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questions, setQuestions] = useState([]);

  const getTest = async (skills) => {
    try {
      setLoading(true);
      const data = {
        categories: skills,
        experience: "junior",
        count: "5",
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await fetch(
        "https://shining-needed-bug.ngrok-free.app/generate-mcq",
        {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      const filterAndFlattenQuestions = (data) => {
        if (typeof data === "object" && data !== null) {
          if (Array.isArray(data)) {
            return data.flatMap((item) => filterAndFlattenQuestions(item));
          }
          if (
            data.hasOwnProperty("question") &&
            Array.isArray(data.options) &&
            data.hasOwnProperty("answer")
          ) {
            return [data];
          }

          return Object.keys(data).flatMap((key) =>
            filterAndFlattenQuestions(data[key])
          );
        }
        return [];
      };
      const allQuestions = filterAndFlattenQuestions(responseData);
      const transformedArray = allQuestions.map((item, index) => {
        return {
          _id: (index + 1).toString(),
          questionText: item.question,
          type: "MCQ",
          options: item.options,
          correctAnswer: [item.answer],
        };
      });
      setQuestions(transformedArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getJob = async () => {
    setLoading(true);
    try {
      let res = await GetApi(`api/AdminRoutes/GetAJobs/${id}`);
      const skillFields =
        res?.data?.data?.skillAssessment
          ?.filter((skill) => skill.type === "skill" && skill.mustHave === true)
          ?.map((skill) => skill.skill) || [];
      setSkills(skillFields);
      setJob(res?.data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  useEffect(() => {
    if (job) {
      getTest(skills);
    }
  }, [job]);

  useEffect(() => {
    setStartTime(new Date());
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((new Date() - startTime) / 1000));
    }, 1000);
    setTimerInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerChange = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishTest = async () => {
    clearInterval(timerInterval);
    let data = {
      jobId: id,
      timeTaken: elapsedTime,
      answers: questions.map((question) => {
        const answer = selectedAnswers[question._id];
        return {
          question: question.questionText,
          answer: answer || "not attempt",
          isCorrect: answer ? question.correctAnswer.includes(answer) : false,
        };
      }),
    };
    try {
      const res = await PostApi("api/testRoutes/result", data);
      if (res.status === 200) {
        navigate(`/blank/report/${res.data.data._id}`);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  if (Loading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center bg-white">
        <span className="text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  const formatTimeElapsed = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-[28px] font-[Outfit] mt-[50px] w-full">
      <div className="flex w-full sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-[20px] justify-between">
        <div className="flex flex-1 items-center gap-[14px]">
          <img src="/images/start/item11.svg" alt="" />
          <p className="font-[Poppins] font-[600] text-[18px] leading-[27px] text-[#000000]">
            {job?.positionName}
          </p>
        </div>
        <div className="flex flex-1 items-center gap-[10px]">
          <img src="/images/start/item12.svg" alt="" />
          <div>
            <p className="font-[600] text-[14px] leading-[17.64px] text-[#545454]">
              {formatTimeElapsed(elapsedTime)}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col w-full max-w-[226px]">
          <div className="flex justify-between">
            <p className="font-[400] text-[14px] leading-[17.64px] text-[#545454]">
              Attempted
            </p>
            <p className="font-[500] text-[14px] leading-[17.64px] text-[#545454]">
              {Object.keys(selectedAnswers).length}/{questions.length}
            </p>
          </div>
          <div className="max-w-[226px] w-full h-[9px] rounded-[4px] bg-gradient-to-tl from-[#0f87b3] to-[#462da1]"></div>
        </div>
        <div className="flex flex-1 justify-center items-center gap-[14px]">
          <img src="/images/start/item13.svg" alt="" />
          <p className="font-[400] text-[18px] leading-[27px] text-[#545454]">
            Performance
          </p>
        </div>
        <button
          onClick={handleFinishTest}
          className="w-[164px] flex-1 h-[45px] flex items-center text-[18px] leading-[22.68px] font-[400] text-white bg-[#4234A2] rounded-[5px] justify-center"
        >
          Finish Test
        </button>
      </div>

      {currentQuestion && (
        <div className="mt-[30px] flex sm:flex-row flex-col gap-[22px]">
          <div className="sm:w-[70%] w-full bg-[#FFFFFF] border border-[#E1E4E9] rounded-[10px]">
            <div className="flex justify-between border-b border-[#E3E6EA] pl-[20px] pr-[12px] items-center w-full">
              <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#000000] pt-[21px] pb-[15px]">
                Question {currentQuestionIndex + 1}/{questions.length}
              </h6>
              <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#204F53] pt-[21px] pb-[15px]">
                MCU
              </h6>
            </div>
            <p className="text-[#545454] border-b border-[#E3E6EA] font-[400] text-[16px] leading-[28px] py-[27px] pl-[31px] pr-[46px]">
              {currentQuestion.questionText}
            </p>
            <div className="sm:pl-[31px] pl-[14px]">
              <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#000000] pt-[21px] pb-[30px]">
                Options
              </h6>
              <div className="flex flex-col border-b border-[#E3E6EA] sm:pb-[202px] pb-[30px] sm:pr-[123px] pr-[14px] sm:gap-[26px] gap-[14px]">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-[25px]">
                    <div className="bg-[#FEEFC6] h-[30px] w-[30px] rounded-full"></div>
                    <div
                      className={`flex gap-[16px] w-full rounded-[10px] px-[20px] py-[18px] cursor-pointer hover:bg-[#E3EFF7] ${
                        selectedAnswers[currentQuestion._id] === option
                          ? "bg-[#E3EFF7]"
                          : "border border-[#EAEAEA]"
                      }`}
                      onClick={() =>
                        handleAnswerChange(currentQuestion._id, option)
                      }
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion._id}`}
                        checked={
                          selectedAnswers[currentQuestion._id] === option
                        }
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, option)
                        }
                      />
                      <p className="text-[#000000] font-[400] text-[16px] leading-[23px]">
                        {option}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-[22px] pb-[20px] pr-[35px] gap-[16px]">
                <button
                  className="border border-[#E1E4E9] rounded-[5px] py-[6px] px-[37px] font-[400] text-[18px] leading-[22.68px] text-[#97969D]"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Back
                </button>
                <button
                  className="bg-gradient-to-tl from-[#0F87B3] rounded-[5px] py-[6px] px-[37px] font-[400] text-[18px] leading-[22.68px] to-[#462DA1] text-[#FFFFFF]"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="flex sm:w-[30%] w-full gap-[12px] flex-col">
            <div className="max-w-[458px] w-full bg-[#FFFFFF] border border-[#E1E4E9] rounded-[10px]">
              <div className="flex justify-between border-b border-[#E3E6EA] pl-[20px] pr-[12px] items-center w-full">
                <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#000000] pt-[21px] pb-[15px]">
                  No of Questions
                </h6>
                <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#204F53] pt-[21px] pb-[15px]">
                  {questions.length}
                </h6>
              </div>
              <div className="pt-[30px] pb-[21px] px-[24px]">
                <div className="flex items-center justify-between">
                  <p className="font-[Poppins] font-[500] text-[16px] leading-[24px] text-[#545454]">
                    No of Multiple Choice Question
                  </p>
                  <p className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#545454]">
                    {questions.filter((q) => q.type === "MCQ").length}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[Poppins] font-[500] text-[16px] leading-[24px] text-[#545454]">
                    No of Coding Question
                  </p>
                  <p className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#545454]">
                    {questions.filter((q) => q.type === "Coding").length}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-[33px] pb-[21px] px-[24px]">
                <div className="flex items-center gap-[18px]">
                  <h6 className="font-[600] text-[18px] leading-[27px]">
                    {Object.keys(selectedAnswers).length}
                  </h6>
                  <div className="flex gap-[3px] items-center bg-[#ECFDF3] rounded-[5px] py-[3px] px-[17px]">
                    <div className="h-[8px] w-[8px] bg-[#009652] rounded-full"></div>
                    <p className="text-[#545454] font-[400] text-[12px] leading-[18px]">
                      Answered
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[18px]">
                  <h6 className="font-[600] text-[18px] leading-[27px]">
                    {questions.length - Object.keys(selectedAnswers).length}
                  </h6>
                  <div className="flex gap-[3px] items-center bg-[#F9FAFB] rounded-[5px] py-[3px] px-[17px]">
                    <div className="h-[8px] w-[8px] bg-[#98A2B3] rounded-full"></div>
                    <p className="text-[#545454] font-[400] text-[12px] leading-[18px]">
                      Not Attempted
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[18px]">
                  <h6 className="font-[600] text-[18px] leading-[27px]">0</h6>
                  <div className="flex gap-[3px] items-center bg-[#FFFAEB] rounded-[5px] py-[3px] px-[17px]">
                    <div className="h-[8px] w-[8px] bg-[#FDB022] rounded-full"></div>
                    <p className="text-[#545454] font-[400] text-[12px] leading-[18px]">
                      Not Answered
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[458px] h-full w-full bg-[#FFFFFF] border border-[#E1E4E9] rounded-[10px]">
              <div className="flex justify-between border-b border-[#E3E6EA] pl-[20px] pr-[12px] items-center w-full">
                <h6 className="font-[Poppins] font-[600] text-[16px] leading-[24px] text-[#000000] pt-[21px] pb-[15px]">
                  Notes
                </h6>
              </div>
              <h6 className="font-[Poppins] flex justify-center items-center h-full font-[600] text-center text-[16px] leading-[24px] text-[#204F53] pt-[21px] pb-[15px]">
                You can take a notes here
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
