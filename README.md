## Survey Form Application

A full-stack survey form application built with **Node.js, Express, Prisma, PostgreSQL** on the backend and **React/Next.js, TypeScript, TailwindCSS** on the frontend.  
This app allows users to answer survey questions of multiple types (text, number, radio) with proper validation and persistence in the database.

---

## Features

- User authentication (login/logout)
- Backend validation with **Zod**
- Transactional database writes using **Prisma**
- Responsive UI with **TailwindCSS**
- Single-question display format
- Navigation between questions (Next/Previous)
- Progress indicator
- Form Validation (e.g., required fields, input constraints)

---

## Tech Stack

**Backend**: Node.js, Express.js, Prisma, PostgreSQL, Zod 
- dotenv - for environment
- express - routing differrent end points
- cookie-parser - storing cookies
- cors - interating frontend urls and backend urls
- bcrypt - hashing 
- jsonwebtoken - create token at the time signIN JWT auth
- Zod - structure of the resposnse from the front end 
- @prisma/client - interact with database.
  
**Frontend**: Next.js (React + TypeScript), TailwindCSS, Axios  

**Database**: Postgres SQL based
  - User - Gather basic users data - email and password, createdAT
  - Questions - store all the questions
  - Resposnes - value and submittedAt

---

## Setup Instructions

### 1️) Backend
- cd backend
- npm install
- npm install -g prisma
- npx prisma migrate dev --name init
- npx prisma generate
- npm run dev

### 2) Frontend
- cd frontend
- npm install
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- npm run dev

---

## API Endpoints

POST /auth/login → user login

POST /auth/logout → user logout

GET /questions → fetch all survey questions

POST /responses/upsert → save/update answers

---

## Future Improvements

- Admin dashboard to add questions

- Multi-select survey questions - radio, number, text inputs

- Docker deployment


