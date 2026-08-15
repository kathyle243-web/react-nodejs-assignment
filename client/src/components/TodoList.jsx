import React from 'react';
import TodoItem from './TodoItem';


/**
 * TodoList component renders the list of to-do items.
 * Handles the display of child TodoItem components or an empty state message
 * when no tasks are present.
 */
function TodoList({ todos, onToggle, onDelete }) {
  // Gracefully handle empty state when there are no to-do items available
  if (todos.length === 0) {
    return <p className="empty-message">No to-do items available. Add one above!</p>; 
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;