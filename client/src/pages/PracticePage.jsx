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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-blue-600 sm:text-3xl lg:text-4xl">
        Practice Page
      </h1>

      {/* Dropdown to select TED Talk */}
      {tedTalks.length > 0 && (
        <select
          onChange={handleSelectTalk}
          className="w-full px-3 py-2 mt-4 mb-4 text-sm border border-gray-300 rounded sm:w-1/2 lg:w-1/3 sm:text-base"
        >
          {tedTalks.map((talk, index) => (
            <option key={talk.id.videoId} value={index}>
              {talk.snippet.title}
            </option>
          ))}
        </select>
      )}

      {selectedTalk && (
        <div className="w-full max-w-xl">
          {/* Non-sticky header and description */}
          <h2 className="text-lg font-semibold text-center sm:text-xl lg:text-2xl">
            {selectedTalk.snippet.title}
          </h2>
          <p className="mt-2 text-sm text-center sm:text-base">
            {selectedTalk.snippet.description}
          </p>

          {/* Sticky and Resizable Video Player */}
          <div className="sticky top-0 z-10 py-4 mt-4 bg-gray-100">
            <div
              className="relative overflow-hidden bg-white rounded-md resize"
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
