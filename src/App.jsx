import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Learn from "./Pages/Learn.jsx";
import StartQuiz from "./Pages/StartQuiz.jsx";
import Quiz from "./Pages/Quiz.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/startquiz" element={<StartQuiz />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
