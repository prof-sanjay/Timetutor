import React, { useState, useEffect } from "react";
import "./quiz.css";

function Quiz() {
  const [userName] = useState(localStorage.getItem("userName"));
  const [currentQn, setCurrentQn] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "If the hour hand is on 3 and the minute hand is on 12, what is the time?",
      options: ["3:00", "12:15", "6:00", "9:30"],
      answer: "3:00",
    },
    {
      question: "When the minute hand is on 6, how many minutes have passed?",
      options: ["15", "30", "45", "60"],
      answer: "30",
    },
    {
      question: "If the time is quarter past 4, what is the digital time?",
      options: ["4:15", "3:45", "4:30", "5:15"],
      answer: "4:15",
    },
    {
      question: "What is the time if the hour hand is on 12 and the minute hand is on 3?",
      options: ["12:15", "3:00", "12:30", "9:15"],
      answer: "12:15",
    },
    {
      question: "If the minute hand is at 9, how many minutes are left to the next hour?",
      options: ["45", "30", "15", "5"],
      answer: "15",
    },
  ];

  const handleAnswer = (selected) => {
    if (selected === questions[currentQn].answer) setScore(score + 1);

    if (currentQn + 1 < questions.length) setCurrentQn(currentQn + 1);
    else setShowResult(true);
  };

  useEffect(() => {
    if (showResult) {
      fetch("http://localhost:5000/api/users/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, score }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Saved to DB:", data))
        .catch((err) => console.error("Error:", err));
    }
  }, [showResult]);

  return (
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
            <strong>{userName}</strong>, your score is <strong>{score}</strong> /{" "}
            {questions.length}.
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
  );
}

export default Quiz;
