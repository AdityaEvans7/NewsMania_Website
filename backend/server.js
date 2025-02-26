const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Ensure frontend can access backend
app.use(express.json());

const NEWS_API_KEY = "02fd93c0997641979e077f639e1770c0";

app.get("/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );

    // ✅ Check if response is OK
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch news" });
    }

    const data = await response.json();

    // ✅ Check if API actually returned articles
    if (!data.articles) {
      return res.status(500).json({ error: "Invalid news data received" });
    }

    res.json({ news: data.articles });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
