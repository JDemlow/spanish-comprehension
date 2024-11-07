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
    </div>
  );
}

export default App;
