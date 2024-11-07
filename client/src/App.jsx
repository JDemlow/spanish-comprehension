import { useEffect, useState } from "react";
import { testConnection } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    testConnection().then(setMessage);
  }, []);

  return (
    <div className="App">
      <h1>{message || "Loading..."}</h1>
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <h1 className="text-3xl font-bold text-emerald-600">
          Hello, Tailwind is working!
        </h1>
      </div>
    </div>
  );
}

export default App;
