// ArticleContext.js
import React, { createContext, useContext } from "react";

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

const articles = [
  {
    id: 1,
    image: "/images/article1.jpg",
    title: "Best Marketing Jobs After Graduation",
    description: "Graduating from college, getting that degree in your hand...",
    category: "Career Advice",
    author: "Neha",
    date: "August 9, 2024",
  },
  {
    id: 2,
    image: "/images/article2.jpg",
    title: "Find Job Opportunities With Top Management Jobs",
    description: "Management roles not only come with high-paying salaries...",
    category: "Career Advice",
    author: "Neha",
    date: "August 8, 2024",
  },
  // more articles...
];

export const ArticleProvider = ({ children }) => {
  return (
    <ArticleContext.Provider value={articles}>
      {children}
    </ArticleContext.Provider>
  );
};
