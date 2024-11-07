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
