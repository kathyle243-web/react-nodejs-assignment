import React from 'react';

/**
 * TodoItem component represents an individual task row.
 * Handles checkbox toggles and delete button clicks.
 */
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      {/* Label container allows clicking anywhere on text/checkbox to toggle */}
      <label className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
        />
        {/* Container for task title and optional due date badge */}
        <div className="todo-details">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
            {/* Conditionally render due date if provided */}
            {todo.dueDate && (
              <span className="due-date">Due: {todo.dueDate}</span>
            )}
          </div>
        </label>

        {/* Delete button */}
        <button 
          className="delete-btn" 
          onClick={() => onDelete(todo.id)} 
          aria-label="Delete todo"
        >
          ✕
        </button>
      </li>
    );
  }

  export default TodoItem;