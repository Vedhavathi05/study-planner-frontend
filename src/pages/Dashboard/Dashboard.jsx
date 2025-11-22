import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Dashboard() {
  const [stats, setStats] = useState({
    todayMinutes: 0,
    streak: 0,
    quizAccuracy: 0,
  });

  const [weeklyData, setWeeklyData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(true);

  const username = (localStorage.getItem("username") || "User").split(" ")[0];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [sessRes, subRes] = await Promise.all([
          axios.get(`${API_BASE}/api/session`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE}/api/subjects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const sessionsData = sessRes.data;
        const subjectsData = subRes.data;

        setSessions(sessionsData);
        setSubjects(subjectsData);

        
        const today = new Date().toDateString();
        const todayMinutes = sessionsData
          .filter((s) => new Date(s.startTime).toDateString() === today)
          .reduce((a, b) => a + b.durationMinutes, 0);

        const days = [
          ...new Set(sessionsData.map((s) => new Date(s.startTime).toDateString())),
        ];

        setStats({
          todayMinutes,
          streak: days.length,
          quizAccuracy: 0,
        });

        
        setWeeklyData(
          sessionsData.map((s) => ({
            day: new Date(s.startTime).toLocaleDateString(),
            minutes: s.durationMinutes,
          }))
        );

        setTopicsData(
          subjectsData.map((sub) => ({
            topic: sub.title,
            minutes: sessionsData
              .filter((s) => s.subjectId === sub._id)
              .reduce((a, b) => a + b.durationMinutes, 0),
          }))
        );
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/subjects`,
        { title: newSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubjects((prev) => [...prev, res.data]);
      setNewSubject("");
    } catch (err) {
      console.error("Error adding subject:", err);
    }
  };

 
  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  if (loading) return <Loader fullscreen />;

  return (
    <div className="dashboard-container">
      

      <div className="dashboard-page">
      
        <div className="dashboard-greeting">
          <h1>👋 Hi, {username}</h1>
          <p>Ready to grow your knowledge today?</p>
        </div>

        <div className="dashboard-summary-grid">
          <Card title="Today's Study" subtitle="Minutes spent">
            <span className="summary-value">{stats.todayMinutes} min</span>
          </Card>

          <Card title="Active Streak">
            <span className="summary-value">{stats.streak} days</span>
          </Card>

          <Card title="Quiz Accuracy">
            <span className="summary-value">{stats.quizAccuracy}%</span>
          </Card>
        </div>

        <Card
          title="Your Subjects"
          rightSection={
            <form onSubmit={handleAddSubject} className="subject-form">
              <input
                type="text"
                placeholder="New subject..."
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="subject-input"
              />
              <Button type="submit">Add</Button>
            </form>
          }
        >
          <div className="subjects-grid">
            {subjects.length === 0 && (
              <p className="no-subjects">Start by adding your first subject.</p>
            )}

            {subjects.map((sub) => (
              <div className="subject-card" key={sub._id}>
                <span className="subject-title">{sub.title}</span>

                <button
                  className="subject-delete"
                  onClick={() => handleDeleteSubject(sub._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="page-grid">
      
          <Card title="Weekly Study Time">
            <div className="chart-wrapper">
              {weeklyData.length === 0 ? (
                <p className="no-data">No study data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c5cff" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#7c5cff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stroke="#a58dff"
                      fill="url(#studyGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card title="Time Spent Per Subject">
            <div className="chart-wrapper">
              {topicsData.length === 0 ? (
                <p className="no-data">Add subjects to visualize progress.</p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={topicsData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="topic" width={80} />
                    <Tooltip />
                    <Bar dataKey="minutes" radius={[6, 6, 6, 6]} fill="#7c5cff" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
