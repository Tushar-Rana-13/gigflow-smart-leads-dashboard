# GigFlow – Smart Leads Dashboard

A modern full-stack CRM-style lead management dashboard built using the MERN stack with TypeScript.

This project was developed as part of the Full Stack Development Internship Assignment for ServiceHive.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Zustand Auth State Management

---

## Lead Management
- Create Lead
- Edit Lead
- Delete Lead
- Search Leads
- Filter Leads
- Pagination
- CSV Export

---

## Dashboard Analytics
- Total Leads
- Lead Status Statistics
- Interactive Pie Chart
- Responsive Dashboard UI

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Hook Form
- Axios
- Recharts
- React Hot Toast

---

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation

---

# Folder Structure

```bash
gigflow/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env.example
│
├── frontend/
│   ├── src/
│   ├── .env.example
│
├── docker-compose.yml
├── .gitignore
└── README.md

Backend (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api

Installation & Setup
1. Clone Repository
git clone <your-repository-url>
cd gigflow
Backend Setup
cd backend

npm install

npm run dev

Backend runs on:

http://localhost:5000
Frontend Setup
cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173
Docker Setup

Run complete project using Docker:

docker-compose up --build
API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
Lead Routes
Method	Endpoint	Description
GET	/api/leads	Get All Leads
GET	/api/leads/:id	Get Single Lead
POST	/api/leads	Create Lead
PUT	/api/leads/:id	Update Lead
DELETE	/api/leads/:id	Delete Lead
GET	/api/leads/export/csv	Export CSV
Lead Statuses
New
Contacted
Qualified
Converted
Lost
Lead Sources
Website
Facebook
LinkedIn
Instagram
Referral

