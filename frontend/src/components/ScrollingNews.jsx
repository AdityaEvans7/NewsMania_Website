import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const TrendingNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/news`);


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.news || data.news.length === 0) {
          throw new Error("No trending news found.");
        }

        setNewsItems(data.news);
      } catch (error) {
        console.error("Error fetching news:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  const handleClick = (article) => {
    navigate("/full-article", { state: { article } });
  };

  return (
    <div className="w-full p-4 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-2 text-center">Trending News</h2>

      {loading ? (
        <div className="text-gray-500">Loading trending news...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Marquee speed={50} pauseOnHover gradient={false} className="overflow-hidden">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="px-6 py-2 mx-4 border border-blue-600 text-black rounded-full whitespace-nowrap cursor-pointer"
              onClick={() => handleClick(news)}
            >
              {news.title}
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default TrendingNews;
