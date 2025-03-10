import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewspaperPage = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/news/${id}`);
        const data = await response.json();

        if (data.news && data.news.length > 0) {
          setArticles(data.news.slice(0, 20));
        } else {
          setError("No news found!");
        }
      } catch (error) {
        setError("Error fetching news!");
      }
      setLoading(false);
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Top 20 News from {id.replace("-", " ").toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
            <img
              src={article.urlToImage || "https://via.placeholder.com/300"}
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewspaperPage;
