import React, { useState, useRef } from "react";
import "./learn.css";
import Navbar from "../components/Navbar";

function Learn() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(15);
  const [dragging, setDragging] = useState(null);
  const clockRef = useRef(null);

  const handleMouseDown = (type) => setDragging(type);

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // Normalize

    if (dragging === "hour") {
      const newHour = Math.round(angle / 30) % 12;
      setHour(newHour === 0 ? 12 : newHour);
    } else if (dragging === "minute") {
      const newMinute = Math.round(angle / 6) % 60;
      setMinute(newMinute);
    }
  };

  const handleMouseUp = () => setDragging(null);

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div
      className="learn-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Navbar/>
      <h1 className="learn-title">Learn to Tell Time</h1>
      <p className="learn-subtitle">Drag the clock hands to set the time.</p>

      <div className="analog-clock" ref={clockRef}>
        {/* Clock Numbers */}
        {numbers.map((num) => {
          const angle = (num - 3) * (Math.PI / 6);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          return (
            <div
              key={num}
              className="clock-number"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {num}
            </div>
          );
        })}

        {/* Hands */}
        <div
          className="hour-hand"
          style={{
            transform: `translateX(-50%) rotate(${(hour % 12) * 30 + minute * 0.5}deg)`,
          }}
          onMouseDown={() => handleMouseDown("hour")}
        ></div>

        <div
          className="minute-hand"
          style={{
            transform: `translateX(-50%) rotate(${minute * 6}deg)`,
          }}
          onMouseDown={() => handleMouseDown("minute")}
        ></div>

        <div className="center-dot"></div>
      </div>

      <div className="digital-display">
        {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
      </div>

      <p className="instruction">Try setting different times to practice!</p>
    </div>
  );
}

export default Learn;
