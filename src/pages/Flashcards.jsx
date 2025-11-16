import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Flashcards() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!subjectId) return;

    axios
      .get(`http://localhost:5000/api/flashcards/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, [subjectId]);

  const addCard = async () => {
    if (!question || !answer || !subjectId) return;

    const res = await axios.post(
      "http://localhost:5000/api/flashcards",
      { subjectId, question, answer },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCards([...cards, res.data]);
    setQuestion("");
    setAnswer("");
  };

  const deleteCard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCards(cards.filter((c) => c._id !== id));
  };

  return (
    <div className="page-container">
      <h2>Flashcards</h2>

      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="dropdown"
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s._id} value={s._id}>
            {s.title}
          </option>
        ))}
      </select>

      <div className="card-form">
        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={addCard}>Add Flashcard</button>
      </div>

      <div className="card-list">
        {cards.map((c) => (
          <div key={c._id} className="flashcard">
            <p><b>Q:</b> {c.question}</p>
            <p><b>A:</b> {c.answer}</p>
            <button className="delete-btn" onClick={() => deleteCard(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
