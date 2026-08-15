const express = require('express');
const cors = require('cors');
const { initDb, closeDb } = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

let server;

// Boot Server after DB is Ready
initDb()
  .then(() => {
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running with modular SQLite architecture on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

// Graceful Shutdown
const shutdown = async () => {
  console.log('\nShutting down server and closing database...');
  if (server) server.close();
  await closeDb();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);