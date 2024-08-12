import React from "react";

const Sidebar = () => {
  // Array of possible questions
  const questions = [
    "Actively Looking for jobs",
    "Open to offers",
    "Not looking, but open to interesting opportunities",
    "Not looking at all",
    "Considering a career change",
    "Looking to start a new project",
    "Want to improve my current job situation",
    "Networking with industry professionals",
    "Updating my resume and LinkedIn",
    "Exploring job market trends",
  ];

  // Select 4 random questions
  const getRandomQuestions = () => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const randomQuestions = getRandomQuestions();

  return (
    <div className="border-2 border-gray-300 rounded-2xl p-6 max-2xl:-mt-2  min-h-[60vh] bg-white min-w-[15vw] shadow-lg hover:shadow-xl transition-shadow duration-300">
  <div className="profile w-full flex flex-col justify-start items-start">
    <h2 className="text-lg font-bold text-gray-900 mb-4">
      Where are you in your job search journey?
    </h2>
    <div className="flex flex-col mt-3 gap-3">
      {questions.slice(0, 4).map((question, index) => (
        <h6
          key={index}
          className="text-sm font-semibold text-gray-900 border-2 border-gray-300 rounded-3xl py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          {question}
        </h6>
      ))}
    </div>
  </div>
</div>

  );
};

export default Sidebar;
