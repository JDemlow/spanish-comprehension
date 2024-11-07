import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to TED Talk Practice
      </h1>
      <Link
        to="/practice"
        className="text-lg text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Start Practicing
      </Link>
    </div>
  );
}

export default HomePage;
