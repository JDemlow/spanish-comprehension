import { useEffect, useState } from "react";
import { fetchTedTalks, fetchCaptions } from "../services/api";
import Transcript from "../components/Transcript";

function PracticePage() {
  const [tedTalks, setTedTalks] = useState([]);
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [captions, setCaptions] = useState("");

  useEffect(() => {
    fetchTedTalks().then((data) => {
      setTedTalks(data);
      setSelectedTalk(data[0]); // Select the first TED Talk as a default for now
    });
  }, []);

  useEffect(() => {
    if (selectedTalk) {
      fetchCaptions(selectedTalk.id.videoId).then(setCaptions);
    }
  }, [selectedTalk]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Practice Page</h1>
      {selectedTalk && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            {selectedTalk.snippet.title}
          </h2>
          <p>{selectedTalk.snippet.description}</p>
          <Transcript transcript={captions} />
        </div>
      )}
    </div>
  );
}

export default PracticePage;
