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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
        Practice Page
      </h1>

      {/* Dropdown to select TED Talk */}
      {tedTalks.length > 0 && (
        <select
          onChange={handleSelectTalk}
          className="mt-4 mb-4 px-3 py-2 w-full sm:w-1/2 lg:w-1/3 border border-gray-300 rounded text-sm sm:text-base"
        >
          {tedTalks.map((talk, index) => (
            <option key={talk.id.videoId} value={index}>
              {talk.snippet.title}
            </option>
          ))}
        </select>
      )}

      {selectedTalk && (
        <div className="mt-4 w-full max-w-xl">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
            {selectedTalk.snippet.title}
          </h2>
          <p className="text-sm sm:text-base mt-2 text-center">
            {selectedTalk.snippet.description}
          </p>

          {/* Responsive YouTube Video Embed */}
          <div className="mt-4 w-full max-w-xl">
            <div
              className="relative overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedTalk.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Transcript Display with Fill-in-the-Blank */}
          <div className="mt-6">
            <TranscriptDisplay videoId={selectedTalk.id.videoId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticePage;
