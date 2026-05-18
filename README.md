# 🚀 GigFlow – Smart Leads Dashboard

**GigFlow** is a full‑stack CRM‑style lead management dashboard built using the **MERN stack with TypeScript**. It was developed as part of the **ServiceHive Full Stack Development Internship Assignment**.

---

## ✨ Features

- 🔐 **User Authentication** – Register and login securely  
- 🛡️ **JWT‑protected routes** – Authenticated API access  
- 📋 **CRUD for Leads** – Create, edit, and delete leads  
- 🔍 **Search & Filter** – Quickly find the right leads  
- 📤 **CSV Export** – Export leads data to CSV  
- 📊 **Lead Analytics Dashboard** – Visual insights and metrics  
- 📱 **Responsive UI** – Works smoothly on mobile and desktop  
- 🐳 **Docker Support** – Containerized setup for easy deployment  

---

## 🛠️ Tech Stack

### Frontend

- **React** + **TypeScript**
- **Tailwind CSS** – Utility‑first styling
- **Zustand** – State management
- **Axios** – HTTP client
- **Recharts** – Data visualization

### Backend

- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication** – Secure sessions
- **Zod** – Runtime validation

---

## 📁 Project Structure

```bash
gigflow/
├── backend/               # Node.js + Express + Mongoose
├── frontend/              # React + TypeScript + Tailwind
├── docker-compose.yml     # Docker orchestration
└── README.md              # This file
```

---

## ⚙️ Environment Variables

### Backend (create `backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend (create `frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Your app will start at `http://localhost:5173` (Vite default) and talk to the backend at `http://localhost:5000/api`.

---

## 🐳 Docker Setup

To run the entire project in Docker:

```bash
docker-compose up --build
```

This spins up:
- Backend service  
- Frontend development server (or build + serve if configured)  
- Optional database container (if added later)

---

## 🔗 Main API Routes

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/auth/register`    | Register a new user            |
| POST   | `/api/auth/login`       | Login and receive JWT          |
| GET    | `/api/leads`            | Fetch all leads                |
| POST   | `/api/leads`            | Create a new lead              |
| PUT    | `/api/leads/:id`        | Update an existing lead        |
| DELETE | `/api/leads/:id`        | Delete a lead                  |

Routes are protected with JWT for authenticated actions.

---

## ☁️ Deployment

- **Frontend**: Deployed on **Vercel**  
- **Backend**: Hosted on **Render** or **Railway**  
- **Database**: **MongoDB Atlas** (cloud‑managed MongoDB)

---

## 👨‍💻 Author

**Tushar Rana**  
---