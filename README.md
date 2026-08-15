# Simple To-Do Application

A full-stack, responsive To-Do Application built with **React** for the front-end and **Node.js with Express** for the back-end RESTful API.

---

## Features

- **View Tasks:** Retrieve and display all to-do items dynamically from the server API.
- **Add Tasks:** Create new tasks with an optional due date picker.
- **Complete Tasks:** Toggle completion status with immediate visual feedback (strikethrough styling).
- **Delete Tasks:** Remove items cleanly from the list in real-time.
- **Empty State Display:** Friendly UI indicator when no tasks remain in the list.
- **Error Handling:** Client-side notification banner for backend network or server errors.
- **Bonus Feature:** Support for task due dates rendered as badge pills on items.

---

## Project Structure
``` text
to-do-application/
├── server/                   # Express REST API Backend
│   ├── server.js             # Main server logic & endpoints
│   └── package.json          # Server dependencies & scripts
│
└── client/                   # React Frontend App 
    ├── src/
    │   ├── components/
    │   │   ├── AddTodo.jsx   # Form component for adding tasks & due dates
    │   │   ├── TodoItem.jsx  # Individual task item component
    │   │   └── TodoList.jsx  # Task list wrapper & empty state handler
    │   ├── App.jsx           # Main state management & API call handlers
    │   └── App.css           # Custom styling for UI/UX
    ├── index.html
    └── package.json          # Client dependencies & scripts
```
---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16+ recommended).
- npm (included in Node.js)

### 1. Setting up the Backend
```bash
cd server
npm install
npm start
```
The server will run on http://localhost:5000.

### 2. Setting up the Frontend
Open a new terminal window:
```bash
cd client
npm install
npm start
```
Your browser will open on http://localhost:3000.

## API Documentation
- GET /api/todos — Fetch all to-do items.

- POST /api/todos — Add a new to-do item (Payload: { "text": "Buy groceries", "dueDate": "2026-08-20" }).

- PUT /api/todos/:id — Update status (Payload: { "completed": true }).

- DELETE /api/todos/:id — Delete a task by ID.

## Technologies Used
- Front-End: React, JavaScript (ES6+), CSS3

- Back-End: Node.js, Express, CORS middleware, SQLite