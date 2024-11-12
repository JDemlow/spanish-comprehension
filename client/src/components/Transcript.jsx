import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Transcript({ transcript }) {
  const wordsToReplace = ["caption", "video"];
  const correctAnswers = {
    1: "caption",
    3: "video",
  };

  const parts = transcript.split(
    new RegExp(`(${wordsToReplace.join("|")})`, "g")
  );
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const totalBlanks = Object.keys(correctAnswers).length;
  const activeInputRef = useRef(null);

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

  const handleSpecialCharClick = (char) => {
    if (activeInputRef.current) {
      const { value, selectionStart, selectionEnd } = activeInputRef.current;
      const newValue =
        value.slice(0, selectionStart) + char + value.slice(selectionEnd);
      activeInputRef.current.value = newValue;
      handleChange(
        { target: { value: newValue } },
        activeInputRef.current.dataset.index
      );
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row">
      {/* Special characters sidebar - hidden on mobile */}
      <div className="fixed flex-col hidden space-y-2 sm:flex left-2 sm:left-4 top-16 sm:top-20">
        {["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"].map((char) => (
          <button
            key={char}
            onClick={() => handleSpecialCharClick(char)}
            className="px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded sm:text-base hover:bg-blue-600"
          >
            {char}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="w-full max-w-sm p-3 mt-6 ml-16 rounded shadow-md sm:max-w-2xl sm:p-4 sm:ml-20 bg-gray-50">
        <h2 className="mb-3 text-lg font-semibold sm:text-2xl">Transcript</h2>
        {isComplete && (
          <p className="mb-3 text-lg font-bold text-green-600 sm:text-xl">
            Congratulations! You've completed the exercise!
          </p>
        )}
        <p className="text-sm font-semibold sm:text-lg">
          Score: {score} / {totalBlanks}
        </p>
        <p className="text-xs text-gray-700 sm:text-base">
          {parts.map((part, index) =>
            wordsToReplace.includes(part) ? (
              <span key={index}>
                <input
                  type="text"
                  value={inputs[index] || ""}
                  onChange={(event) => handleChange(event, index)}
                  placeholder="Fill in"
                  className="w-16 p-1 mx-1 text-xs border-b-2 border-gray-300 sm:w-20 sm:text-base focus:border-blue-500 focus:outline-none"
                  onFocus={(e) => (activeInputRef.current = e.target)}
                  data-index={index}
                />
                <span className="ml-1 text-xs text-gray-500 sm:text-sm">
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
          className="px-3 py-1 mt-3 font-bold text-white bg-blue-500 rounded sm:px-4 sm:py-2 hover:bg-blue-700"
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
