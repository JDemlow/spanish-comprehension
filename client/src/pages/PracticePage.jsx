import { useEffect, useState } from "react";
import { fetchTedTalks } from "../services/api";

function PracticePage() {
  const [tedTalks, setTedTalks] = useState([]);

  useEffect(() => {
    fetchTedTalks().then((data) => {
      setTedTalks(data);
      console.log("Fetched TED Talks data:", data); // This should log the data
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Practice Page</h1>
      {tedTalks.length > 0 ? (
        <ul>
          {tedTalks.map((talk, index) => (
            <li key={index}>
              <h2>{talk.snippet.title}</h2>
              <p>{talk.snippet.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading TED Talks...</p>
      )}
    </div>
  );
}

export default PracticePage;
