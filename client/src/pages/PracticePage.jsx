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
    <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-green-900 sm:p-4 lg:p-6">
      {/* Gamification Header */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-xl p-2 text-white bg-green-800 rounded-md sm:p-3">
        <span className="text-xl font-bold sm:text-2xl">00000</span>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-sm sm:text-base">GAPS 62</span>
          <span className="flex items-center text-sm text-orange-500 sm:text-base">
            ❤️ 3
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-2xl font-bold text-center text-green-200 sm:mb-6 sm:text-3xl lg:text-4xl">
        Practice Page
      </h1>

      {/* Dropdown to select TED Talk */}
      {tedTalks.length > 0 && (
        <select
          onChange={handleSelectTalk}
          className="w-full max-w-sm px-2 py-1 mb-3 text-xs bg-green-200 border border-green-300 rounded-lg sm:px-3 sm:py-2 sm:mb-4 sm:text-sm"
        >
          {tedTalks.map((talk, index) => (
            <option key={talk.id.videoId} value={index}>
              {talk.snippet.title}
            </option>
          ))}
        </select>
      )}

      {selectedTalk && (
        <div className="w-full max-w-md p-3 text-green-200 bg-green-700 rounded-lg shadow-lg sm:max-w-xl sm:p-4">
          {/* Talk Title and Description */}
          <h2 className="mb-2 text-lg font-semibold text-center sm:text-xl lg:text-2xl">
            {selectedTalk.snippet.title}
          </h2>
          <p className="mb-3 text-xs text-center sm:mb-4 sm:text-sm">
            {selectedTalk.snippet.description}
          </p>

          {/* Video Player */}
          <div
            className="relative mb-3 overflow-hidden bg-white rounded-md resize sm:mb-4"
            style={{
              height: "200px",
              width: "100%",
              minHeight: "150px",
              maxHeight: "400px",
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
          <div className="p-2 text-center bg-green-600 rounded-lg sm:p-3">
            <TranscriptDisplay videoId={selectedTalk.id.videoId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticePage;
