import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./Flashcards.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Flashcards() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingCard, setEditingCard] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubject) return;

    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE}/api/flashcards/${selectedSubject}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFlashcards(res.data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [selectedSubject]);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !selectedSubject) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/flashcards`,
        { question, answer, subjectId: selectedSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFlashcards((prev) => [res.data, ...prev]);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  const startEdit = (card) => {
    setEditingCard(card);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleUpdateFlashcard = async (e) => {
    e.preventDefault();
    if (!editingCard) return;

    try {
      const res = await axios.put(
        `${API_BASE}/api/flashcards/${editingCard._id}`,
        { question: editQuestion, answer: editAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFlashcards((prev) =>
        prev.map((c) => (c._id === editingCard._id ? res.data : c))
      );
      cancelEdit();
    } catch (err) {
      console.error("Error updating flashcard:", err);
    }
  };

  return (
    <div className="flashcards-page">
      <h1 className="page-title">Flashcards</h1>
      <p className="page-subtitle">Memorize key concepts by topic.</p>

      <div className="subject-select-box">
        <label>Select Subject:</label>
        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- choose --</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.title}
            </option>
          ))}
        </select>
      </div>

      {!selectedSubject && (
        <p className="no-selection">Select a subject to view flashcards.</p>
      )}

      {selectedSubject && (
        <>

          <div className="flashcards-grid">
            
            {loading ? (
              <p className="loading-text">Loading flashcards...</p>
              
          
            ) : flashcards.length === 0 ? (
              <p className="no-data">No flashcards yet. Add one below.</p>
            ) : (
              flashcards.map((card) => (
                <Card key={card._id} className="flashcard">
                  <div className="flashcard-header">
                    <button
                      className="flash-edit"
                      onClick={() => startEdit(card)}
                    >
                      ✎
                    </button>
                    <button
                      className="flash-delete"
                      onClick={() => handleDeleteFlashcard(card._id)}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="flash-q">{card.question}</p>
                  <p className="flash-a">{card.answer}</p>
                </Card>
              ))
            )}
          </div>

          <Card title="Add Flashcard">
            <form onSubmit={handleAddFlashcard} className="flash-form">
              <input
                type="text"
                placeholder="Question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <textarea
                placeholder="Answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
              <Button type="submit">Add Flashcard</Button>
            </form>
          </Card>
        </>
      )}

      {editingCard && (
        <div className="flash-modal-backdrop">
          <div className="flash-modal">
            <h2>Edit Flashcard</h2>
            <form onSubmit={handleUpdateFlashcard} className="flash-modal-form">
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                placeholder="Question..."
              />
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                placeholder="Answer..."
              ></textarea>
              <div className="flash-modal-actions">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flashcards;
