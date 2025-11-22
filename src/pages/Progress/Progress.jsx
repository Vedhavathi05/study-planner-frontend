import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./Progress.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Progress() {
  const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API_BASE}/api/study-sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const subRes = await axios.get(`${API_BASE}/api/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSessions(res.data);
      setSubjects(subRes.data);
    };

    load().catch(console.error);
  }, []);


  const totalMinutes = sessions.reduce((a, b) => a + b.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  const subjectData = subjects.map((s) => ({
    subject: s.title,
    minutes: sessions
      .filter((ses) => ses.subjectId === s._id)
      .reduce((a, b) => a + b.durationMinutes, 0),
  }));

  const dateData = sessions.map((s) => ({
    date: new Date(s.startTime).toLocaleDateString(),
    minutes: s.durationMinutes,
  }));

  return (
    <div className="progress-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Progress</h1>
          <p className="page-subtitle">
            Track your long-term learning achievements.
          </p>
        </div>
      </div>

      <div className="progress-summary-grid">
        <Card title="Total Study Time">
          <p className="summary-value">{totalHours} hrs</p>
          <p className="summary-label">{totalMinutes} minutes logged</p>
        </Card>

        <Card title="Total Sessions">
          <p className="summary-value">{sessions.length}</p>
          <p className="summary-label">Completed study sessions</p>
        </Card>

        <Card title="Subjects Covered">
          <p className="summary-value">{subjects.length}</p>
          <p className="summary-label">Active learning subjects</p>
        </Card>
      </div>

      <Card title="Study Over Time" subtitle="Session-wise duration tracking">
        <div className="progress-chart">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dateData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="#7c5cff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Time Spent Per Subject">
        <div className="progress-chart">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={subjectData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="subject" width={80} />
              <Tooltip />
              <Bar dataKey="minutes" fill="#a58dff" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

export default Progress;
