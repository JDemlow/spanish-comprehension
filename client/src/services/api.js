const API_URL = "http://localhost:5000";

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    return await response.text();
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};
