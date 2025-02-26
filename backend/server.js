import express from "express";
import cors from "cors";
import "dotenv/config";


import fetch from "node-fetch";  // Instead of require()

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GNEWS_API_KEY; // Use the correct API key from .env

app.get("/news", async (req, res) => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?token=${process.env.GNEWS_API_KEY}&lang=en&country=us`
      );
      const data = await response.json();
  
      console.log("GNews API Response:", data); // Debugging
  
      if (!data.articles) {
        throw new Error("Failed to fetch news from GNews API");
      }
  
      res.json(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

app.listen(5000, () => console.log("Server running on port 5000"));
