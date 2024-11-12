import { useState, useEffect } from "react";
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-900 sm:p-6 lg:p-8">
      {/* Gamification Header */}
      <div className="flex items-center justify-between w-full max-w-xl p-3 mb-4 text-white bg-blue-800 rounded-md">
        <span className="text-2xl font-bold">00000</span>
        <div className="flex items-center space-x-4">
          <span>GAPS 62</span>
          <span className="flex items-center">❤️ 3</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        Practice Page
      </h1>

      {/* Dropdown to select TED Talk */}
      {tedTalks.length > 0 && (
        <select
          onChange={handleSelectTalk}
          className="w-full max-w-md px-3 py-2 mb-4 text-sm border border-gray-300 rounded-lg sm:text-base"
        >
          {tedTalks.map((talk, index) => (
            <option key={talk.id.videoId} value={index}>
              {talk.snippet.title}
            </option>
          ))}
        </select>
      )}

      {selectedTalk && (
        <div className="w-full max-w-xl p-4 text-white bg-blue-700 rounded-lg shadow-lg">
          {/* Talk Title and Description */}
          <h2 className="mb-2 text-lg font-semibold text-center sm:text-xl lg:text-2xl">
            {selectedTalk.snippet.title}
          </h2>
          <p className="mb-4 text-sm text-center sm:text-base">
            {selectedTalk.snippet.description}
          </p>

          {/* Video Player */}
          <div
            className="relative mb-4 overflow-hidden bg-white rounded-md resize"
            style={{
              height: "300px",
              width: "100%",
              minHeight: "150px",
              minWidth: "300px",
              maxHeight: "600px",
              maxWidth: "100%",
            }}
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

          {/* Transcript Display */}
          <div className="p-3 text-center bg-blue-600 rounded-lg">
            <TranscriptDisplay videoId={selectedTalk.id.videoId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticePage;
