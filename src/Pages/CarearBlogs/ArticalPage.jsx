import React from "react";
import { useParams } from "react-router-dom";
import articles from "./ArticalsData"; // Ensure the path to your articles data is correct
import { Link, animateScroll as scroll } from "react-scroll";


const ArticlePage = () => {
  const { id } = useParams();
  console.log("Ayaa article page me");

  // Find the article within the nested structure
  const findArticle = () => {
    for (const section of articles) {
      const article = section.cards.find(card => card.id === parseInt(id));
      if (article) return article;
    }
    return null;
  };

  const article = findArticle();

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.img} // Use the image URL from the article
        alt={article.title}
        className="w-28 h-28 rounded-lg mb-4"
      />
      <p className="text-gray-600">{article.details}</p>
       


      <div className="flex flex-col md:flex-row">
      {/* Sidebar with Table of Contents */}
      <div className="md:w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li>
            <Link to="section1" smooth={true} duration={500}>
              1. What Does a Marketing Professional Do?
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} duration={500}>
              2. Benefits of Having a Marketing Job
            </Link>
          </li>
          <li>
            <Link to="section3" smooth={true} duration={500}>
              3. What Are The Best Marketing Jobs After Graduation?
            </Link>
          </li>
          <li>
            <Link to="section4" smooth={true} duration={500}>
              4. How Can Apna Help You Find the Perfect Marketing Job?
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="md:w-3/4 p-4">
        <section id="section1" className="mb-8">
          <h2 className="text-2xl font-bold">What Does a Marketing Professional Do?</h2>
        
          <p className="mt-2">
            {/* Content goes here */}
          </p>
        </section>
        
        <section id="section2" className="mb-8">
          <h2 className="text-2xl font-bold">Benefits of Having a Marketing Job</h2>
          <p className="mt-2">
            {/* Content goes here */}
          </p>
        </section>
      
        <section id="section3" className="mb-8">
          <h2 className="text-2xl font-bold">What Are The Best Marketing Jobs After Graduation?</h2>
          <p className="mt-2">
            {/* Content goes here */}
          </p>
        </section>
        
        <section id="section4" className="mb-8">
          <h2 className="text-2xl font-bold">How Can Apna Help You Find the Perfect Marketing Job?</h2>
          <p className="mt-2">
            {/* Content goes here */}
          </p>
        </section>
      </div>
    </div>
    
    </div>
  );
};

export default ArticlePage;
