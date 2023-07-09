import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  // hook
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    // fragment : return function can't return 2 elements - wrap in div or use fragment
    <>
      <form
        onSubmit={handleSubmit}
        className="new-item-form"
        autocomplete="off"
      >
        <div className="form-row">
          <label htmlFor="item"> Add Tasks:</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add To Do </button>
      </form>
      <h1 className="header">To-Do List:</h1>
      <ul className="list">
        {todos.length === 0 && "No Tasks"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete Item
              </button>
            </li>
          );
        })}
      </ul>

      <footer className="footer"> Weston Potgieter </footer>
    </>
  );
}
