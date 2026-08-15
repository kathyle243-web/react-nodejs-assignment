const { getDb } = require('../config/db');

/**
 * Middleware to verify that a requested todo exists in the database.
 */
const findTodoMiddleware = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }

    const db = getDb();
    const todo = await db.get('SELECT id FROM todos WHERE id = ?', id);

    if (!todo) {
      return res.status(404).json({ error: 'To-Do item not found' });
    }

    req.todoId = id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = findTodoMiddleware;