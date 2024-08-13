import React from "react";
import ArticleCard from "./ArticleCard";

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

const CareerAdviceSection = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          id={article.id}
          image={article.image}
          title={article.title}
          description={article.description}
          category={article.category}
          author={article.author}
          date={article.date}
        />
      ))}
    </div>
  );
};

export default CareerAdviceSection;
