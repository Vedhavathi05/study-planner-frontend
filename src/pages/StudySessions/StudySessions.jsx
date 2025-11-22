import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./StudySessions.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function StudySessions() {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subsRes = await axios.get(`${API_BASE}/api/subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sessionsRes = await axios.get(`${API_BASE}/api/session`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSubjects(subsRes.data);
        setSessions(sessionsRes.data);
      } catch (err) {
        console.error("Error loading sessions:", err);
      }
    };

    fetchData();
  }, []);

  const handleAddSession = async (e) => {
    e.preventDefault();
    if (!selectedSubject || !startTime || !endTime || !duration) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/session`,
        {
          subjectId: selectedSubject,
          startTime,
          endTime,
          durationMinutes: Number(duration),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessions((prev) => [...prev, res.data]);
      setStartTime("");
      setEndTime("");
      setDuration("");
    } catch (err) {
      console.error("Error adding session:", err);
    }
  };

  return (
    <div className="sessions-page">
      <h1 className="page-title">Study Sessions</h1>
      <p className="page-subtitle">Track your study time by subject.</p>

      <Card title="Log Study Session">
        <form onSubmit={handleAddSession} className="session-form">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select subject</option>
            {subjects.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.title}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Start time"
          />

          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="End time"
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <Button type="submit">Add Session</Button>
        </form>
      </Card>

      <div className="sessions-grid">
        {sessions.length === 0 ? (
          <p className="no-data">No study sessions logged yet.</p>
        ) : (
          sessions.map((s) => (
            <Card key={s._id} className="session-card">
              <h3>{subjects.find((sub) => sub._id === s.subjectId)?.title}</h3>
              <p>{new Date(s.startTime).toLocaleString()}</p>
              <p>{s.durationMinutes} min</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default StudySessions;
