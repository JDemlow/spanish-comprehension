import PropTypes from "prop-types";

function Transcript({ transcript }) {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded shadow-md max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
      <p className="text-gray-700">{transcript}</p>
    </div>
  );
}

// Define prop types
Transcript.propTypes = {
  transcript: PropTypes.string.isRequired, // Assuming transcript should always be a string
};

export default Transcript;
