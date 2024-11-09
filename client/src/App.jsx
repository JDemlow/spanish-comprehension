import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import Navbar from "./components/Navbar"; // Import Navbar component

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
