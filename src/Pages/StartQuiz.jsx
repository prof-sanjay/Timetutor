import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./startQuiz.css";

function StartQuiz() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim() === "") {
      alert("Please enter your name before starting the quiz!");
      return;
    }
    // Save name to local storage so quiz page can use it
    localStorage.setItem("userName", name);
    navigate("/quiz"); // redirect to quiz page
  };

  return (
    <div className="startquiz-container">
      <h1>Welcome to the Time Quiz!</h1>
      <p className="subtitle">Test your ability to read and calculate time correctly.</p>

      <div className="form-box">
        <label htmlFor="name">Enter your Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Your name here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleStart}>Start Quiz</button>
      </div>
    </div>
  );
}

export default StartQuiz;
