import React, { useState } from "react";
import "./Combinedpagesstyles.css";

export default function Quizzies() {
  const quizzes = {
    HTML: [
      { q: "What does HTML stand for?", a: "HyperText Markup Language" },
      { q: "Which tag creates a link?", a: "<a>" },
      { q: "Which tag makes headings?", a: "<h1> to <h6>" },
      { q: "HTML is?", a: "Markup Language" },
      { q: "Which tag inserts an image?", a: "<img>" }
    ],
    CSS: [
      { q: "CSS stands for?", a: "Cascading Style Sheets" },
      { q: "Which property changes text color?", a: "color" },
      { q: "Which property sets background?", a: "background" },
      { q: "Which unit is relative?", a: "em" },
      { q: "Flexbox is used for?", a: "Layout" }
    ],
    JavaScript: [
      { q: "JavaScript is?", a: "Programming Language" },
      { q: "Which is used for variables?", a: "let" },
      { q: "Which compares both value & type?", a: "===" },
      { q: "Which stores arrays?", a: "[]" },
      { q: "Which keyword creates a function?", a: "function" }
    ]
  };

  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    let marks = 0;
    quizzes[selected].forEach((q, i) => {
      if (answers[i] && answers[i].toLowerCase() === q.a.toLowerCase()) {
        marks++;
      }
    });
    setScore(marks);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Quizzes</h2>

      <select className="resource-input" onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select Quiz</option>
        <option value="HTML">HTML Quiz</option>
        <option value="CSS">CSS Quiz</option>
        <option value="JavaScript">JavaScript Quiz</option>
      </select>

      {selected && (
        <div className="form-container">
          {quizzes[selected].map((item, idx) => (
            <div key={idx}>
              <p><strong>{idx + 1}. {item.q}</strong></p>
              <input
                className="resource-input"
                type="text"
                onChange={(e) =>
                  setAnswers({ ...answers, [idx]: e.target.value })
                }
              />
            </div>
          ))}
          <button className="resource-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}

      {score !== null && (
        <h3 className="page-title">Your Score: {score} / 5</h3>
      )}
    </div>
  );
}
