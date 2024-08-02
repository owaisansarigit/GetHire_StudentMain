import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetApi } from "../utilis/Api_Calling";

const Report = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const getResult = async () => {
    try {
      setLoading(true);
      const res = await GetApi(`api/testRoutes/result/${id}`);
      setResult(res.data.data);
      } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);
  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="p-[28px] font-[Outfit] mt-[50px] w-full">
          <div className="flex w-full sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-[20px] justify-between">
            <div className="flex flex-1 items-center gap-[14px]">
              <img src="/images/start/item11.svg" alt="" />
              <p className="font-[Poppins] font-[600] text-[18px] leading-[27px] text-[#000000]">
                {result?.job?.positionName}
              </p>
            </div>
            <div className="flex flex-1 items-center gap-[10px]">
              <img src="/images/start/item12.svg" alt="" />
              <div>
                <p className="font-[600] text-[14px] leading-[17.64px] text-[#545454]">
                  {formatTime(result?.timeTaken)}
                </p>
                <p className="font-[400] text-[14px] leading-[17.64px] text-[#545454]">
                  Time Taken
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col w-full max-w-[226px]">
              <div className="flex justify-between">
                <p className="font-[400] text-[14px] leading-[17.64px] text-[#545454]">
                  Attempted
                </p>
                <p className="font-[500] text-[14px] leading-[17.64px] text-[#545454]">
                  {result?.answers.length}
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
              onClick={() => navigate(`/blank/successful/${result?.job._id}`)}
              className="w-[164px] flex-1 h-[45px] flex items-center text-[18px] leading-[22.68px] font-[400] text-white bg-[#4234A2] rounded-[5px] justify-center"
            >
              Start Interview
            </button>
          </div>
          <div className="border border-[#E1E4E9] bg-[#FFFFFF] rounded-[10px] mt-[30px]">
            <div className="grid sm:grid-cols-2 grid-cols-1 px-[24px] py-[30px] gap-[64px]">
              <div>
                <h6 className="font-[Poppins] font-[600] text-[20px] leading-[30px]">
                  Your Performance Report
                </h6>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-[16px] gap-y-[24px]">
                <div className="border border-[#E1E4E9] rounded-[10px] py-[16px] px-[22px]">
                  <p className="text-[#545454] font-[Poppins] font-[400] text-[14px] leading-[21px]">
                    Total Time Taken
                  </p>
                  <div className="pl-[5px] pt-[48px] gap-[21px] flex items-center">
                    <img src="/images/start/icon1.svg" alt="" />
                    <h6 className="font-[Poppins] font-[600] text-[40px] leading-[60px]">
                      45
                      <span className="text-[16px] leading-[24px] font-[400]">
                        mins
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="border border-[#E1E4E9] rounded-[10px] py-[16px] px-[22px]">
                  <p className="text-[#545454] font-[Poppins] font-[400] text-[14px] leading-[21px]">
                    Total Score
                  </p>
                  <div className="pl-[5px] pt-[48px] gap-[21px] flex items-center">
                    <img src="/images/start/icon2.svg" alt="" />
                    <h6 className="font-[Poppins] font-[600] text-[40px] leading-[60px]">
                      {result?.score}
                    </h6>
                  </div>
                </div>
                <div className="border border-[#E1E4E9] rounded-[10px] py-[16px] px-[22px]">
                  <p className="text-[#545454] font-[Poppins] font-[400] text-[14px] leading-[21px]">
                    Right Answers
                  </p>
                  <div className="pl-[5px] pt-[48px] gap-[21px] flex items-center">
                    <img src="/images/start/icon3.svg" alt="" />
                    <h6 className="font-[Poppins] font-[600] text-[40px] leading-[60px]">
                      {
                        result?.answers.filter((answer) => answer.isCorrect)
                          .length
                      }
                    </h6>
                  </div>
                </div>
                <div className="border border-[#E1E4E9] rounded-[10px] py-[16px] px-[22px]">
                  <p className="text-[#545454] font-[Poppins] font-[400] text-[14px] leading-[21px]">
                    Wrong Answers
                  </p>
                  <div className="pl-[5px] pt-[48px] gap-[21px] flex items-center">
                    <img src="/images/start/icon4.svg" alt="" />
                    <h6 className="font-[Poppins] font-[600] text-[40px] leading-[60px]">
                      {
                        result?.answers.filter((answer) => !answer.isCorrect)
                          .length
                      }
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[18px] px-[28px] text-[#000000]">
                  <tr className="border-b border-t border-[#E1E4E9]">
                    <th scope="col" className="px-6 py-[10px]">
                      Sno
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Your Answer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result?.answers.map((question, index) => {
                    const answer = result.answers.find(
                      (ans) => ans.question === question
                    );
                    return (
                      <tr
                        key={question._id}
                        className="bg-white border-b font-[Poppins] font-[400] leading-[21px] text-[14px] text-[#545454] border-[#E1E4E9]"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{question.question}</td>
                        <td className="px-6 py-4">
                          {question ? question.answer : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {question.isCorrect === true
                            ? "Correct"
                            : question.isCorrect === false
                            ? "Wrong"
                            : "Not Attempt"}
                        </td>

                        <td className="px-6 py-4">
                          <button>
                            <img src="/images/start/icon5.svg" alt="" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
