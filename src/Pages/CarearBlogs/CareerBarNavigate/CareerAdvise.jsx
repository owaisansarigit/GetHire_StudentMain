import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import articles from "../ArticalsData";

function CareerAdvise() {
  // Filter to get only the "Career Advisory" section
  const careerAdvisorySection = articles.find(
    (section) => section.title === "Career Advice"
  );

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-8">
              {/* Check if "Career Advisory" section exists */}
              {careerAdvisorySection ? (
                <div className="mb-12">
                  {/* Section Title */}
                  <h2 className="text-2xl font-bold mb-4">
                    {careerAdvisorySection.title}
                  </h2>

                  {/* Display Cards for the "Career Advisory" section */}
                  <section className="flex justify-center py-8">
                    <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {careerAdvisorySection.cards.map((card) => (
                        <ArticleCard
                          key={card.id}
                          id={card.id}
                          img={card.img}
                          title={card.title}
                          description={card.description}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              ) : (
                <p>No Career Advisory section found.</p>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default CareerAdvise;





// this gives all component with a search function
// import React ,{useState} from "react";
// import { Routes, Route } from "react-router-dom";
// import ArticleCard from "../ArticleCard";
// import articles from "../ArticalsData";
// function CareerAdvise() {
//     const [searchQuery, setSearchQuery] = useState("");

//     // Filter articles based on the search query
//     const filteredArticles = articles
//       .map((section) => ({
//         ...section,
//         cards: section.cards.filter(
//           (card) =>
//             card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             section.title.toLowerCase().includes(searchQuery.toLowerCase())
//         ),
//       }))
//       .filter((section) => section.cards.length > 0);

//   return (
//     <div className=" mt-12">
//         <div>
//       {/* Search Input */}
//       <div className="p-8">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search Career Advisory..."
//           className="px-4 py-2 border border-gray-300 rounded w-full"
//         />
//       </div>
      
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="p-8">
//               {/* Iterate through filtered sections */}
//               {filteredArticles.length > 0 ? (
//                 filteredArticles.map((section, index) => (
//                   <div key={index} className="mb-12">
//                     {/* Section Title */}
//                     <h2 className="text-2xl font-bold mb-4">{section.title}</h2>

//                     {/* Display Cards for the current section */}
//                     <section className="flex justify-center py-8">
//                       <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {section.cards.map((card) => (
//                           <ArticleCard
//                             key={card.id}
//                             id={card.id}
//                             img={card.img}
//                             title={card.title}
//                             description={card.description}
//                           />
//                         ))}
//                       </div>
//                     </section>
//                   </div>
//                 ))
//               ) : (
//                 <p>No results found for "{searchQuery}"</p>
//               )}
//             </div>
//           }
//         />
//       </Routes>
//     </div>
//     </div>
//   )
// }

// export default CareerAdvise