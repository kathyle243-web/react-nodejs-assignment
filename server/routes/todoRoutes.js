const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const findTodoMiddleware = require('../middleware/findTodo');

// Base path: /api/todos
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', findTodoMiddleware, todoController.updateTodo);
router.delete('/:id', findTodoMiddleware, todoController.deleteTodo);

module.exports = router;