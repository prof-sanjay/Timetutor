import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let userName = "Boss"; // temporary in-memory variable

// ✅ Get user name
app.get("/api/getUser", (req, res) => {
  res.json({ name: userName });
});

// ✅ Save user name
app.post("/api/saveUser", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Invalid name" });
  }

  userName = name.trim();
  console.log("✅ Name saved:", userName);
  res.json({ message: "Name saved successfully", name: userName });
});

// ✅ Questions endpoint
app.get("/api/questions", (req, res) => {
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

  res.json(questions);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
