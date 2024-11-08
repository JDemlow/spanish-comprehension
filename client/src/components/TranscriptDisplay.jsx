import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTranscript } from "../services/api";

function TranscriptDisplay({ videoId }) {
  const [transcript, setTranscript] = useState(null);
  const [answers, setAnswers] = useState({}); // Track user inputs
  const [score, setScore] = useState(0); // Track correct answers

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
          wordIndex % 5 === 0 && // Only check blanks (every fifth word)
          answers[`${index}-${wordIndex}`]?.toLowerCase() === word.toLowerCase()
        ) {
          correctCount += 1;
        }
      });
    });
    setScore(correctCount);
  };

  if (!transcript) {
    return <p>Loading transcript...</p>;
  }

  return (
    <div>
      <button
        onClick={handleCheckAnswers}
        className="mt-4 px-4 py-2 bg-blue-500 text-white"
      >
        Check Answers
      </button>
      <p>
        Score: {score} /{" "}
        {Math.floor(
          transcript.reduce(
            (count, item) => count + item.text.split(" ").length,
            0
          ) / 5
        )}
      </p>
      <h2>Transcript</h2>
      <div>
        {transcript.map((item, index) => (
          <p key={index}>
            <strong>{item.start.toFixed(2)}s:</strong>{" "}
            {item.text.split(" ").map((word, wordIndex) =>
              wordIndex % 5 === 0 ? ( // Create a blank every fifth word
                <input
                  key={`${index}-${wordIndex}`}
                  type="text"
                  value={answers[`${index}-${wordIndex}`] || ""}
                  onChange={(e) =>
                    handleChange(`${index}-${wordIndex}`, e.target.value)
                  }
                  placeholder="___"
                  style={{ width: "80px", margin: "0 5px" }}
                />
              ) : (
                <span key={`${index}-${wordIndex}`} style={{ margin: "0 5px" }}>
                  {word}
                </span>
              )
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

TranscriptDisplay.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default TranscriptDisplay;
