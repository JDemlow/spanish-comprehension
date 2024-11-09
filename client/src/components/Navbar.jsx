import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 text-white bg-blue-600">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          TED Talk Practice
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-lg hover:text-gray-200">
            Home
          </Link>
          <Link to="/practice" className="text-lg hover:text-gray-200">
            Practice
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
