import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [randomTalkHandler, setRandomTalkHandler] = useState(null);

  const updateRandomTalkHandler = (handler) => {
    setRandomTalkHandler(() => handler);
  };

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar onRandomTalk={randomTalkHandler} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/practice"
          element={
            <PracticePage setRandomTalkHandler={updateRandomTalkHandler} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
