import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [time, setTime] = useState("");
  const location = useLocation();

  // ✅ Update time every second
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600000);
      setTime(ist.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">TimeTutor</h2>
      </div>


      <div className="nav-right">
        <div className="clock-box">
          <h4>IST</h4>
          <div className="clock">{time}</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
