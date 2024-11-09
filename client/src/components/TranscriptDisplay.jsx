import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { fetchTranscript } from "../services/api";

function TranscriptDisplay({ videoId }) {
  const [transcript, setTranscript] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const activeInputRef = useRef(null); // Track the active input field

  useEffect(() => {
    async function loadTranscript() {
      const fetchedTranscript = await fetchTranscript(videoId);
      setTranscript(fetchedTranscript);
    }

    if (videoId) {
      loadTranscript();
    }
  }, [videoId]);

  // Handle changes to inputs in blanks
  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  // Check answers against the actual transcript
  const handleCheckAnswers = () => {
    let correctCount = 0;
    transcript.forEach((item, index) => {
      const words = item.text.split(" ");
      words.forEach((word, wordIndex) => {
        if (
          wordIndex % 5 === 0 &&
          answers[`${index}-${wordIndex}`]?.toLowerCase() === word.toLowerCase()
        ) {
          correctCount += 1;
        }
      });
    });
    setScore(correctCount);
  };

  // Handle inserting special character into the active input
  const handleSpecialCharClick = (char) => {
    if (activeInputRef.current) {
      const { value, selectionStart, selectionEnd } = activeInputRef.current;
      const newValue =
        value.slice(0, selectionStart) + char + value.slice(selectionEnd);
      activeInputRef.current.value = newValue; // Update the input’s value directly
      handleChange(activeInputRef.current.dataset.index, newValue); // Update in state
    }
  };

  if (!transcript) {
    return <p>Loading transcript...</p>;
  }

  return (
    <div className="relative flex">
      {/* Fixed sidebar for special characters, check answers button, and score */}
      <div className="fixed flex flex-col space-y-2 left-4 top-20">
        <p className="font-semibold text-gray-700">
          Score: {score} /{" "}
          {Math.floor(
            transcript.reduce(
              (count, item) => count + item.text.split(" ").length,
              0
            ) / 5
          )}
        </p>
        <button
          onClick={handleCheckAnswers}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Check Answers
        </button>
        {["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"].map((char) => (
          <button
            key={char}
            onClick={() => handleSpecialCharClick(char)}
            className="px-2 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {char}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="w-full max-w-2xl p-4 mt-6 ml-20 rounded shadow-md bg-gray-50">
        <h2>Transcript</h2>
        <div>
          {transcript.map((item, index) => (
            <p key={index}>
              <strong>{item.start.toFixed(2)}s:</strong>{" "}
              {item.text.split(" ").map((word, wordIndex) =>
                wordIndex % 5 === 0 ? (
                  <input
                    key={`${index}-${wordIndex}`}
                    type="text"
                    value={answers[`${index}-${wordIndex}`] || ""}
                    onChange={(e) =>
                      handleChange(`${index}-${wordIndex}`, e.target.value)
                    }
                    placeholder=""
                    className="w-20 px-3 py-2 text-lg text-center transition-all duration-300 ease-in-out bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                    style={{ margin: "10px 20px" }}
                    onFocus={(e) => (activeInputRef.current = e.target)}
                    data-index={`${index}-${wordIndex}`}
                  />
                ) : (
                  <span
                    key={`${index}-${wordIndex}`}
                    style={{ margin: "0 5px" }}
                  >
                    {word}
                  </span>
                )
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

TranscriptDisplay.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default TranscriptDisplay;
