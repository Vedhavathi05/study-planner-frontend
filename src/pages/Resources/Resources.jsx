import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./Resources.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Resources() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Error loading subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubject) return;

    const fetchResources = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE}/api/resources/${selectedSubject}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResources(res.data);
      } catch (err) {
        console.error("Error loading resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedSubject]);

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !selectedSubject) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/resources`,
        { title, url, subjectId: selectedSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResources((prev) => [...prev, res.data]);
      setTitle("");
      setUrl("");
    } catch (err) {
      console.error("Error adding resource:", err);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
    }
  };

  return (
    <div className="resources-page">
      <h1 className="page-title">Resources</h1>
      <p className="page-subtitle">Save useful links by topic.</p>

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
        <p className="no-selection">Select a subject to view resources.</p>
      )}

      {selectedSubject && (
        <>
          <div className="resources-grid">
            {loading ? (
              <p className="loading-text">Loading resources...</p>
            ) : resources.length === 0 ? (
              <p className="no-data">No resources yet. Add one below.</p>
            ) : (
              resources.map((res) => (
                <Card key={res._id} className="resource-card">
                  <button
                    className="resource-delete"
                    onClick={() => handleDeleteResource(res._id)}
                  >
                    ✕
                  </button>
                  <h3 className="resource-title">{res.title}</h3>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Open Link →
                  </a>
                </Card>
              ))
            )}
          </div>

          <Card title="Add Resource">
            <form onSubmit={handleAddResource} className="resource-form">
              <input
                type="text"
                placeholder="Resource Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button type="submit">Add Resource</Button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
}

export default Resources;
