import React, { useState, useEffect } from "react";
import { fetchTedTalks } from "../services/api";
import TranscriptDisplay from "../components/TranscriptDisplay";

function PracticePage() {
  const [tedTalks, setTedTalks] = useState([]);
  const [selectedTalk, setSelectedTalk] = useState(null);

  useEffect(() => {
    fetchTedTalks().then((data) => {
      setTedTalks(data);
      setSelectedTalk(data[0]); // Select the first TED Talk as a default for now
    });
  }, []);

  const handleSelectTalk = (event) => {
    setSelectedTalk(tedTalks[event.target.value]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Practice Page</h1>

      {/* Dropdown to select TED Talk */}
      {tedTalks.length > 0 && (
        <select
          onChange={handleSelectTalk}
          className="mt-4 mb-4 px-4 py-2 border border-gray-300 rounded"
        >
          {tedTalks.map((talk, index) => (
            <option key={talk.id.videoId} value={index}>
              {talk.snippet.title}
            </option>
          ))}
        </select>
      )}

      {selectedTalk && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            {selectedTalk.snippet.title}
          </h2>
          <p>{selectedTalk.snippet.description}</p>

          {/* YouTube Video Embed */}
          <div className="mt-4">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedTalk.id.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Transcript Display with Fill-in-the-Blank */}
          <TranscriptDisplay videoId={selectedTalk.id.videoId} />
        </div>
      )}
    </div>
  );
}

export default PracticePage;
