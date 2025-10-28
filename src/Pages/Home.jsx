import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <main className="main-section">
        <h1>
          Welcome to <span>TimeTutor</span>
        </h1>
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

      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
