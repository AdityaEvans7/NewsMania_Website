import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewspaperPage = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Updated source mapping
  const sourceMapping = {
    "bbc-news": "bbc-news",
    "cnn": "cnn",
    "nyt": "the-new-york-times", 
    "the-times-of-india": "the-times-of-india",
    "al-jazeera": "al-jazeera-english",
    "fox-news": "fox-news",
    "the-economic-times": "the-economic-times", 
    "ndtv-news": "ndtv-news", 
  };

  useEffect(() => {
    const fetchNews = async () => {
      if (!sourceMapping[id]) {
        setError("Newspaper not found or not supported!");
        setLoading(false);
        return;
      }

      try {
        const apiKey = "9551fbf83a0042fbbdd128bcf74a48a7"; 
        let url = `https://newsapi.org/v2/top-headlines?sources=${sourceMapping[id]}&apiKey=${apiKey}`;
        
        if (id === "nyt") {
          url = `https://newsapi.org/v2/everything?q=New%20York%20Times&apiKey=${apiKey}`;
        }

        console.log("Fetching news from:", url);
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("API Response:", data);

        if (data.status === "ok") {
          setArticles(data.articles.slice(0, 20));
        } else {
          setError(data.message || "Failed to fetch news!");
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
            <img src={article.urlToImage || "https://via.placeholder.com/300"} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-3" />
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
