# 📚 Study Planner – Full Stack MERN App

A modern study management app that helps students organize subjects, create flashcards, store resources, track study sessions, and take quizzes — all in one place.

---

## 🚀 Features

### 🔐 Authentication
- Secure JWT login & signup
- Protected routes per user

### 🧠 Flashcards
- Create, edit, delete flashcards by subject
- Responsive design
- Stored in MongoDB

### 🔗 Resources
- Save useful external links by subject
- Open links in new tab
- Clean card UI

### ⏱ Study Sessions
- Log study time with duration tracking
- View past session history

### ❓ Quizzes
- Multiple-choice quizzes by topic
- Score calculation & result summary

---

## 🛠 Tech Stack

Frontend: React + Vite  
Backend: Node + Express  
Database: MongoDB (Mongoose)  
Auth: JWT  
Deployment: Render + Vercel/Netlify  

---

## 📂 Folder Structure

StudyPlanner/
 ├─ backend/
 │   ├─ models/
 │   ├─ controllers/
 │   ├─ routes/
 │   ├─ middleware/
 │   └─ Server.js
 └─ frontend/
     ├─ src/components/
     ├─ src/pages/
     ├─ src/data/quizzes.js
     └─ App.jsx

---

## 🔧 Environment Variables

### Backend .env

MONGO_URI=your_mongo_connection  
JWT_SECRET=your_secret_key  
PORT=5000  

### Frontend .env

VITE_API_BASE_URL=https://your-backend.onrender.com

Make sure `.env` is included in `.gitignore`.

---

## ▶ Running Locally

### Backend

cd backend  
npm install  
npm start  

### Frontend

cd frontend  
npm install  
npm run dev  

---

## 🌍 Deployment

### Backend on Render

1. Push code to GitHub  
2. Create Web Service  
3. Build command: npm install  
4. Start command: node Server.js  
5. Add environment variables  
6. Deploy

### Frontend Deployment

Deploy on **Vercel or Netlify** and set environment variable:

VITE_API_BASE_URL=https://your-backend.onrender.com

---

## 🧪 API Routes Summary

Auth:
POST /api/auth/register  
POST /api/auth/login  

Subjects:
GET /api/subjects  
POST /api/subjects  

Flashcards:
GET /api/flashcards/:subjectId  
POST /api/flashcards  
DELETE /api/flashcards/:id  

Resources:
GET /api/resources/:subjectId  
POST /api/resources  
DELETE /api/resources/:id  

Sessions:
POST /api/session  
GET /api/session  

---

## ❤️ Contributing

Pull requests are welcome. Open an issue first for major changes.

---

## 📝 License

MIT License

---

### 🚧 Status

Actively in development — more features coming soon 🚀

