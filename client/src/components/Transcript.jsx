import React, { useState } from "react";
import PropTypes from "prop-types";

function Transcript({ transcript }) {
  // State to hold user input for the blank
  const [inputValue, setInputValue] = useState("");

  // Hard-code a single blank for now
  const placeholderTranscript = transcript.replace("caption", "_____");

  // Handle user input
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded shadow-md max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
      <p className="text-gray-700">
        {placeholderTranscript.split("_____")[0]}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Fill in"
          className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none mx-1"
        />
        {placeholderTranscript.split("_____")[1]}
      </p>
    </div>
  );
}

// PropTypes validation
Transcript.propTypes = {
  transcript: PropTypes.string.isRequired,
};

export default Transcript;
