import React, { useState } from 'react';


/**
 * AddTodo component renders a form for users to enter a new task
 * and an optional due date.
 */
function AddTodo({ onAdd }) {
    // Local state for tracking form input values
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    /**
     * Handles form submission: validates title, invokes parent callback,
     * and resets input fields back to empty strings.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default full-page submit refresh

        // Prevent submitting empty tasks or pure whitespace
        if (!title.trim()) return;

        // Call the parent callback with the new task data
        onAdd(title, dueDate);

        // Reset input fields
        setTitle('');
        setDueDate('');
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            {/* Input field for task description */}
            <input
                type="text"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* Input field for optional due date */}
            <input
                type="date"
                className="date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}   

export default AddTodo;