import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Resources() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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
    if (!subjectId) return;

    axios
      .get(`${BASE_URL}/resources/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setResources(res.data))
      .catch((err) => console.log(err));
  }, [subjectId]);

  const addResource = async () => {
    if (!title || !url) return;

    const res = await axios.post(
      `${BASE_URL}/resources`,
      { subjectId, title, url },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setResources([...resources, res.data]);
    setTitle("");
    setUrl("");
  };

  const deleteResource = async (id) => {
    await axios.delete(`${BASE_URL}/resources/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResources(resources.filter((r) => r._id !== id));
  };

  return (
    <div className="page-container">
      <h2>Resources</h2>

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

      <div className="resource-form">
        <input
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Resource URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addResource}>Add Resource</button>
      </div>

      <ul className="resource-list">
        {resources.map((r) => (
          <li key={r._id} className="resource-item">
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.title}
            </a>
            <br />
            <button className="delete-btn" onClick={() => deleteResource(r._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
