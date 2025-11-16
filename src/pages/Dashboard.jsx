import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import "./Combinedpagesstyles.css";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all subjects on load
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Add subject
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/subjects",
        { title: newSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh subjects list
      const res = await axios.get("http://localhost:5000/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(res.data);

      setNewSubject("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="page-center">Loading your subjects...</div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Your Subjects</h2>

      {/* ADD SUBJECT FORM */}
      <form className="form-container" onSubmit={handleAddSubject}>
        <h3>Add a New Subject</h3>
        <input
          className="input-field"
          type="text"
          placeholder="Enter subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          required
        />
        <button className="button" type="submit">Add Subject</button>
      </form>

      {/* SUBJECT LIST */}
      <div className="card-grid">
        {subjects.length === 0 ? (
          <p className="empty-text">
            You have no subjects added yet. Start by creating one!
          </p>
        ) : (
          subjects.map((sub) => (
            <Card key={sub._id} title={sub.title} />
          ))
        )}
      </div>
    </div>
  );
}
