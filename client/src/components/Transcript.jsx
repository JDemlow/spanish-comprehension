import React, { useState } from "react";
import PropTypes from "prop-types";

function Transcript({ transcript }) {
  // Words to replace with blanks
  const wordsToReplace = ["caption", "video"]; // Adjust this list as needed

  // Split the transcript into parts around each word to replace
  const parts = transcript.split(
    new RegExp(`(${wordsToReplace.join("|")})`, "g")
  );

  // State to hold user inputs for each blank
  const [inputs, setInputs] = useState({});

  // Handle input change for each blank
  const handleChange = (event, index) => {
    setInputs({ ...inputs, [index]: event.target.value });
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded shadow-md max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
      <p className="text-gray-700">
        {parts.map((part, index) =>
          wordsToReplace.includes(part) ? (
            <input
              key={index}
              type="text"
              value={inputs[index] || ""}
              onChange={(event) => handleChange(event, index)}
              placeholder="Fill in"
              className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none mx-1"
            />
          ) : (
            part
          )
        )}
      </p>
    </div>
  );
}

// PropTypes validation
Transcript.propTypes = {
  transcript: PropTypes.string.isRequired,
};

export default Transcript;
