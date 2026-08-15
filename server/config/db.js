const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../database.db');
let db;

/**
 * Initializes SQLite database connection and sets up initial schema & seed data.
 */
const initDb = async () => {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  // Enable Write-Ahead Logging for improved concurrency
  await db.exec('PRAGMA journal_mode = WAL;');

  // Create table if missing
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      dueDate TEXT
    )
  `);

  // Seed default data if database is empty
  const { count } = await db.get('SELECT COUNT(*) as count FROM todos');
  if (count === 0) {
    const seedStmt = await db.prepare(
      'INSERT INTO todos (text, completed, dueDate) VALUES (?, ?, ?)'
    );
    await seedStmt.run('Complete React-Node assignment', 0, '2026-08-15');
    await seedStmt.run('Review capstone project deliverables', 1, '2026-08-20');
    await seedStmt.finalize();
  }

  return db;
};

/**
 * Returns active database instance.
 */
const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDb first.');
  }
  return db;
};

/**
 * Gracefully closes database connection.
 */
const closeDb = async () => {
  if (db) {
    await db.close();
  }
};

module.exports = { initDb, getDb, closeDb };