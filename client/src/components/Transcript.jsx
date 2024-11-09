import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Transcript({ transcript }) {
  const wordsToReplace = ["caption", "video"];
  const correctAnswers = {
    1: "caption", // First blank at index 1 expects "caption"
    3: "video", // Second blank at index 3 expects "video"
  };

  const parts = transcript.split(
    new RegExp(`(${wordsToReplace.join("|")})`, "g")
  );
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const totalBlanks = Object.keys(correctAnswers).length;
  const activeInputRef = useRef(null); // Track the active input field

  useEffect(() => {
    const correctCount = Object.keys(inputs).reduce((count, index) => {
      if (
        correctAnswers[index] &&
        inputs[index]?.toLowerCase() === correctAnswers[index].toLowerCase()
      ) {
        return count + 1;
      }
      return count;
    }, 0);
    setScore(correctCount);
    setIsComplete(correctCount === totalBlanks);
  }, [inputs]);

  const handleChange = (event, index) => {
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [index]: value }));

    if (
      correctAnswers[index] &&
      value.toLowerCase() === correctAnswers[index].toLowerCase()
    ) {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [index]: "Correct!" }));
    } else if (value) {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [index]: "Try again.",
      }));
    } else {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [index]: "" }));
    }
  };

  const handleReset = () => {
    setInputs({});
    setFeedback({});
    setScore(0);
    setIsComplete(false);
  };

  // Handle insertion of special character into the active input field
  const handleSpecialCharClick = (char) => {
    if (activeInputRef.current) {
      const { value, selectionStart, selectionEnd } = activeInputRef.current;
      const newValue =
        value.slice(0, selectionStart) + char + value.slice(selectionEnd);
      activeInputRef.current.value = newValue; // Update the input's value directly
      handleChange(
        { target: { value: newValue } },
        activeInputRef.current.dataset.index
      );
    }
  };

  return (
    <div className="relative flex">
      {/* Fixed sidebar for special characters */}
      <div className="fixed flex flex-col space-y-2 left-4 top-20">
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
        <h2 className="mb-4 text-2xl font-semibold">Transcript</h2>
        {isComplete && (
          <p className="mb-4 text-xl font-bold text-green-600">
            Congratulations! You've completed the exercise!
          </p>
        )}
        <p className="text-lg font-semibold">
          Score: {score} / {totalBlanks}
        </p>
        <p className="text-gray-700">
          {parts.map((part, index) =>
            wordsToReplace.includes(part) ? (
              <span key={index}>
                <input
                  type="text"
                  value={inputs[index] || ""}
                  onChange={(event) => handleChange(event, index)}
                  placeholder="Fill in"
                  className="mx-1 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  onFocus={(e) => (activeInputRef.current = e.target)} // Track active input
                  data-index={index}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {feedback[index] || ""}
                </span>
              </span>
            ) : (
              part
            )
          )}
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

Transcript.propTypes = {
  transcript: PropTypes.string.isRequired,
};

export default Transcript;
