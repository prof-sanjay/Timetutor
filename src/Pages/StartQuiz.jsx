import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./startQuiz.css";
import Navbar from "../../../../Reflect-design/fe/src/components/Navbar";

function StartQuiz() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (name.trim() === "") {
      alert("⚠️ Please enter your name before starting the quiz!");
      return;
    }

    try {
      // ✅ Send name to backend
      const response = await fetch("http://localhost:5000/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to save name");
      }

      const data = await response.json();
      console.log("✅ Name saved:", data);
      alert(`Welcome ${data.name}! Let's begin the quiz! 🎯`);

      // Navigate to Quiz page
      navigate("/quiz");
    } catch (error) {
      console.error("❌ Error saving name:", error);
      alert("Error saving name to server");
    }
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
