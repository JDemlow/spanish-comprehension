// backend/routes/youtube.js
import express from "express";
import fetch from "node-fetch"; // or any HTTP client of your choice
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Define a route for searching YouTube
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&key=${YOUTUBE_API_KEY}&maxResults=7`
    ); // Adjust maxResults as needed, up to 50
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from YouTube:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/captions/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    // Placeholder for fetching captions. In production, integrate an API or service for actual captions.
    const placeholderCaptions =
      "This is a placeholder caption text for the video.";
    res.status(200).json({ captions: placeholderCaptions });
  } catch (error) {
    console.error("Error fetching captions:", error);
    res.status(500).json({ error: "Failed to fetch captions" });
  }
});

export default router;
