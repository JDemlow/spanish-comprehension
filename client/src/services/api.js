const API_URL = "http://localhost:5000";

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    return await response.text();
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};

const BASE_URL = "http://localhost:5000/api";

export const fetchTedTalks = async (query = "TED Talks Spanish") => {
  try {
    const response = await fetch(
      `${BASE_URL}/youtube/search?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching TED Talks from proxy:", error);
    return [];
  }
};

export const fetchCaptions = async (videoId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/youtube/captions/${videoId}`
    );
    const data = await response.json();
    return data.captions;
  } catch (error) {
    console.error("Error fetching captions:", error);
    return "Failed to load captions.";
  }
};

// frontend/api.js

export async function fetchTranscript(videoId) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/transcript?videoId=${videoId}&lang=es`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transcript");
    }
    const transcript = await response.json();
    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return null;
  }
}
