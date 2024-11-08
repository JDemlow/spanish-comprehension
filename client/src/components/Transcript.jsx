import { useState, useEffect } from "react";
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

  const progress = Math.round((score / totalBlanks) * 100);

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded shadow-md max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
      {isComplete && (
        <p className="text-xl font-bold text-green-600 mb-4">
          Congratulations! You've completed the exercise!
        </p>
      )}
      <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
        <div
          className="bg-blue-500 h-6 rounded-full text-center text-white font-semibold"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
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
                className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none mx-1"
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
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset
      </button>
    </div>
  );
}

Transcript.propTypes = {
  transcript: PropTypes.string.isRequired,
};

export default Transcript;
