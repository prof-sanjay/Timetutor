import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [time, setTime] = useState("");

  const updateTime = () => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 5.5 * 3600000);
    setTime(ist.toLocaleTimeString());
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <h2 className="logo">TimeTutor</h2>
        <div className="clock-box">
          <h4>Indian Standard Time</h4>
          <div className="clock">{time}</div>
        </div>
      </div>

      <main className="main-section">
        <h1>Welcome to <span>TimeTutor</span></h1>
        <p className="subtitle">Learn, practice, and master telling time!</p>

        <div className="feature-container">
          <Link to="/learn" className="feature-box">
            <h3>Learn</h3>
            <p>Understand how clocks work with interactive visuals.</p>
          </Link>

          <Link to="/startquiz" className="feature-box">
            <h3>Quiz</h3>
            <p>Test your time-reading skills with fun challenges.</p>
          </Link>
        </div>
      </main>

      <footer className="footer">
      </footer>
    </div>
  );
}

export default Home;
