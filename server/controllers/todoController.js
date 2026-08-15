const { getDb } = require('../config/db');

// Helper to format SQLite 1/0 integers into JavaScript booleans
const formatTodo = (todo) => (todo ? { ...todo, completed: Boolean(todo.completed) } : null);

// GET /api/todos - Fetch all tasks
exports.getTodos = async (req, res, next) => {
  try {
    const db = getDb();
    const todos = await db.all('SELECT * FROM todos ORDER BY id ASC');
    res.json(todos.map(formatTodo));
  } catch (err) {
    next(err);
  }
};

// POST /api/todos - Create new task
exports.createTodo = async (req, res, next) => {
  try {
    const { text, dueDate } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text field is required' });
    }

    const db = getDb();
    const trimmedText = text.trim();
    const result = await db.run(
      'INSERT INTO todos (text, completed, dueDate) VALUES (?, ?, ?)',
      trimmedText,
      0,
      dueDate || null
    );

    const newTodo = {
      id: result.lastID,
      text: trimmedText,
      completed: false,
      dueDate: dueDate || null,
    };

    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
};

// PUT /api/todos/:id - Update existing task
exports.updateTodo = async (req, res, next) => {
  try {
    const { completed, text, dueDate } = req.body;
    const db = getDb();

    const completedValue = completed !== undefined ? (completed ? 1 : 0) : null;
    const textValue = text !== undefined ? text.trim() : null;
    const dueDateValue = dueDate !== undefined ? dueDate : null;

    await db.run(
      `UPDATE todos 
       SET text = COALESCE(?, text),
           completed = COALESCE(?, completed),
           dueDate = COALESCE(?, dueDate)
       WHERE id = ?`,
      textValue,
      completedValue,
      dueDateValue,
      req.todoId
    );

    const updatedTodo = await db.get('SELECT * FROM todos WHERE id = ?', req.todoId);
    res.json(formatTodo(updatedTodo));
  } catch (err) {
    next(err);
  }
};

// DELETE /api/todos/:id - Delete task
exports.deleteTodo = async (req, res, next) => {
  try {
    const db = getDb();
    await db.run('DELETE FROM todos WHERE id = ?', req.todoId);
    res.status(200).json({ message: 'To-Do item deleted successfully' });
  } catch (err) {
    next(err);
  }
};