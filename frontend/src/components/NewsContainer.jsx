import React, { useState, useEffect } from "react";


const NewsContainer = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);

    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=bfce6599a7a616bf5f3a8fdc6c5780e0`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        setNewsItems(data.articles);
      } else {
        setError("No news found for this search.");
        setNewsItems([]);
      }
    } catch (err) {
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={fetchNews} />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {newsItems.map((article, index) => (
            <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
