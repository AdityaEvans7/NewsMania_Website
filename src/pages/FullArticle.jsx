import React from "react";
import { useLocation } from "react-router-dom";

const FullArticle = () => {
  const location = useLocation();
  const { article } = location.state || {}; // Get the passed article data

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">By {article.author || "Unknown"}</p>
      <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg mb-4">{article.content}</p>
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 underline"
      >
        Read more
      </a>
    </div>
  );
};

export default FullArticle;
