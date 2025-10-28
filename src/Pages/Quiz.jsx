import React, { useState, useEffect } from "react";
import "./quiz.css";
import Navbar from "../components/Navbar";

function Quiz() {
  const [userName, setUserName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQn, setCurrentQn] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ✅ Fetch name + questions when page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/getUser")
      .then((res) => res.json())
      .then((data) => setUserName(data.name))
      .catch((err) => console.error("Error fetching name:", err));

    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQn].answer) setScore(score + 1);

    if (currentQn + 1 < questions.length) setCurrentQn(currentQn + 1);
    else setShowResult(true);
  };

  if (questions.length === 0) return <h2>Loading quiz...</h2>;

  return (
    <>
      <Navbar/>
    <div className="quiz-container">
      <h1 className="quiz-title">Time Quiz</h1>

      {!showResult ? (
        <div className="quiz-box">
          <h3 className="question">{questions[currentQn].question}</h3>
          <div className="options">
            {questions[currentQn].options.map((opt, i) => (
              <button key={i} className="option-btn" onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <p className="progress">
            Question {currentQn + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="result-box">
          <h2>Quiz Completed!</h2>
          <p>
            <strong>{userName}</strong>, your score is{" "}
            <strong>{score}</strong> / {questions.length}.
          </p>
          <button
            className="restart-btn"
            onClick={() => {
              setCurrentQn(0);
              setScore(0);
              setShowResult(false);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default Quiz;
