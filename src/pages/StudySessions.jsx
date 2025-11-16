import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function StudySessions() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const token = localStorage.getItem("token");
  const BASE_URL = "https://study-planner-backend-3kmg.onrender.com/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/session`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSessions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addSession = async () => {
    if (!subjectId || !startTime || !endTime)
      return alert("Fill all fields!");

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMinutes = Math.floor((end - start) / 60000);

    if (durationMinutes <= 0)
      return alert("End time must be after start time");

    const res = await axios.post(
      `${BASE_URL}/session`,
      {
        subjectId,
        startTime,
        endTime,
        durationMinutes,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSessions([...sessions, res.data]);
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="page-container">
      <h2>Study Sessions</h2>

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

      <div className="session-form">
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button onClick={addSession}>Add Session</button>
      </div>

      <h3>Your Sessions</h3>
      <ul className="session-list">
        {sessions.map((s) => (
          <li key={s._id} className="session-item">
            <b>
              {subjects.find((sub) => sub._id === s.subjectId)?.title ||
                "Unknown Subject"}
            </b>
            <br />
            {new Date(s.startTime).toLocaleString()} →{" "}
            {new Date(s.endTime).toLocaleString()}
            <br />
            ⏱ {s.durationMinutes} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}
