import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Progress() {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  // Load subjects
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Load sessions
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/session", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSessions(res.data);
        calculateStats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateStats = (sessions) => {
    const totals = {};

    sessions.forEach((s) => {
      if (!totals[s.subjectId]) totals[s.subjectId] = 0;
      totals[s.subjectId] += s.durationMinutes;
    });

    setStats(totals);
  };

  return (
    <div className="page-container">
      <h2>Your Study Progress</h2>

      <div className="progress-container">
        {subjects.map((sub) => (
          <div key={sub._id} className="progress-item">
            <h3>{sub.title}</h3>
            <p>
              Total Time:{" "}
              <strong>{stats[sub._id] ? stats[sub._id] : 0} minutes</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
