import SEO from "../components/SEO";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // load todos from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mca_todos_v1");
      if (raw) setTodos(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // save todos on change
  useEffect(() => {
    try {
      localStorage.setItem("mca_todos_v1", JSON.stringify(todos));
    } catch (e) {}
  }, [todos]);

  function addTodo(e) {
    e?.preventDefault();
    const value = text.trim();
    if (!value) return;
    const newTodo = { id: Date.now(), text: value, done: false };
    setTodos((s) => [newTodo, ...s]);
    setText("");
  }

  function toggleDone(id) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id) {
    setTodos((s) => s.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((s) => s.filter((t) => !t.done));
  }

  return (
    <>
      <SEO
        title="MCA Next — Todo App"
        description="Small, local Todo app for MCA course — stores items in your browser."
        url=""
      />

      <div className="page-root">
        <header className="hero">
          <div className="hero-inner">
            <h1>MCA Todo</h1>
            <p className="muted">
              A small, local Todo app — saves in your browser.
            </p>
          </div>
        </header>

        <main className="container">
          <section className="card">
            <form
              className="todo-form"
              onSubmit={addTodo}
              aria-label="Add todo"
            >
              <input
                className="todo-input"
                placeholder="What would you like to do today?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" className="btn primary">
                Add
              </button>
            </form>

            <div className="meta">
              <span>
                {todos.length} item{todos.length !== 1 ? "s" : ""}
              </span>
              <div>
                <button
                  className="btn link"
                  onClick={clearCompleted}
                  type="button"
                >
                  Clear completed
                </button>
              </div>
            </div>

            <ul className="todo-list">
              {todos.length === 0 && (
                <li className="empty">No todos yet — add one above ✨</li>
              )}

              {todos.map((t) => (
                <li key={t.id} className={`todo-item ${t.done ? "done" : ""}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleDone(t.id)}
                    />
                    <span className="todo-text">{t.text}</span>
                  </label>
                  <button
                    className="btn danger small"
                    onClick={() => removeTodo(t.id)}
                    aria-label={`Remove ${t.text}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
