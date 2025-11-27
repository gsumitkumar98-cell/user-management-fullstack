# User Management Full-Stack Application

A simple full-stack application using **Node.js + Express + TypeScript** (backend) and **React + TypeScript + Bootstrap** (frontend).  
Includes full CRUD, validation, and edit modal UI.

---

## Features

### Backend
- Express + TypeScript  
- Zod validation  
- Central error handling  
- In-memory database  
- CRUD operations  

### Frontend
- React + TypeScript  
- Bootstrap UI  
- Create user  
- Edit user in modal  
- Delete user  
- Axios API calls  

---

## Install & Run — Backend

```
cd backend
npm install
npm run dev
```

Backend runs at: **http://localhost:4000**

---

## API Endpoints

GET /api/users
→ Returns the list of all users.

GET /api/users/:id
→ Returns details of a single user by ID.

POST /api/users
→ Creates a new user (validated using Zod).

PUT /api/users/:id
→ Updates an existing user by ID (validated using Zod).

DELETE /api/users/:id
→ Deletes a user by ID.

---

##  Install & Run — Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Assumptions

- In-memory DB used  
- Zod for validation  
- Bootstrap for UI  
- Modal chosen for editing  

---

##  Time Spent

**~2.5 to 3 hours**

---

##  Summary

This project demonstrates:
- Clean full-stack design  
- Validation and error handling  
- React component structure  
- Simple and professional UI  
