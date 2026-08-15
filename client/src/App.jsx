import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

// Base API URL pointing to the Express server
const API_URL = 'http://localhost:5000/api/todos';

function App() {
  // Main application state
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Fetch all tasks from the backend on component mount.
   * Defined inside useEffect to satisfy ESLint exhaustive-deps.
   */
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(null);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load tasks from server. Please check your backend connection.');
      }
    };

    fetchTodos();
  }, []);

  /**
   * Handler to create a new task.
   * Passed as a prop to AddTodo component.
   */
  const handleAddTodo = async (text, dueDate) => {
    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, dueDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new task');
      }

      const newTodo = await response.json();
      // Append the new task returned by the backend to state
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Could not add task. Please try again.');
    }
  };

  /**
   * Handler to toggle the completion status of a task.
   * Passed as a prop to TodoList -> TodoItem components.
   */
  const handleToggleTodo = async (id, completed) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTodo = await response.json();

      // Update state by replacing the matching item with the updated object
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Could not update task status.');
    }
  };

  /**
   * Handler to delete a task by ID.
   * Passed as a prop to TodoList -> TodoItem components.
   */
  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Filter out deleted task from local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Could not delete task. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Tasks</h1>
      </header>

      {/* Error notification banner */}
      {error && <div className="error-banner">{error}</div>}

      {/* Input form component */}
      <AddTodo onAdd={handleAddTodo} />

      {/* Task list display component */}
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;