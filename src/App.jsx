import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import "./App.css";

const empty = { id: null, title: "", priority: "Medium", dueDate: "", done: false };

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Learn React", priority: "High", dueDate: "", done: false },
          { id: 2, title: "Build CRUD app", priority: "Medium", dueDate: "", done: true },
        ];
  });
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(empty);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const openAdd = () => {
    setForm(empty);
    setShow(true);
  };

  const openEdit = (todo) => {
    setForm(todo);
    setShow(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setTodos(todos.map((t) => (t.id === form.id ? form : t)));
    } else {
      setTodos([...todos, { ...form, id: Date.now() }]);
    }
    setShow(false);
  };

  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  // counts
  const today = new Date().toISOString().split("T")[0];
  const completedCount = todos.filter((t) => t.done).length;
  const pendingCount = todos.length - completedCount;
  const percent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const counts = { All: todos.length, Pending: pendingCount, Completed: completedCount };

  // filter + search
  const filteredTodos = todos.filter((t) => {
    const matchFilter =
      filter === "All" ||
      (filter === "Pending" && !t.done) ||
      (filter === "Completed" && t.done);
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="container todo-wrapper mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 todo-header">
        <h3>
          <i className="bi bi-check2-square me-2"></i>Todo List
        </h3>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg me-1"></i>Add Task
        </button>
      </div>

      {/* Progress */}
      <div className="stats-card">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-semibold">
            {completedCount} of {todos.length} tasks completed
          </span>
          <span className="fw-semibold">{percent}%</span>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <i className="bi bi-search"></i>
        <input
          className="form-control"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters + Clear */}
      <div className="filter-row">
        <div className="filter-bar">
          {["All", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
        <button className="clear-btn" onClick={clearCompleted} disabled={completedCount === 0}>
          <i className="bi bi-trash3 me-1"></i>Clear Completed
        </button>
      </div>

      {/* List */}
      <div className="todo-card">
        {filteredTodos.length === 0 ? (
          <div className="empty-box">
            <i className="bi bi-inbox"></i>
            No tasks found
          </div>
        ) : (
          filteredTodos.map((t) => {
            const overdue = t.dueDate && !t.done && t.dueDate < today;
            return (
              <div key={t.id} className={`todo-item ${t.done ? "done" : ""}`}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                />
                <div className="todo-text">
                  <div className="todo-title">{t.title}</div>
                  {t.dueDate && (
                    <div className={`due ${overdue ? "overdue" : ""}`}>
                      <i className="bi bi-calendar-event me-1"></i>
                      {t.dueDate} {overdue && "(Overdue)"}
                    </div>
                  )}
                </div>
                <span className={`priority ${t.priority}`}>{t.priority}</span>
                <button
                  className="btn btn-outline-primary btn-action"
                  onClick={() => openEdit(t)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-action"
                  onClick={() => handleDelete(t.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Offcanvas */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{form.id ? "Edit Task" : "Add Task"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              name="title"
              placeholder="Task name"
              value={form.title}
              onChange={handleChange}
              required
            />
            <select
              className="form-select mb-3"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input
              type="date"
              className="form-control mb-3"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
            <button className="btn btn-success w-100">
              <i className={`bi ${form.id ? "bi-check-lg" : "bi-save"} me-1`}></i>
              {form.id ? "Update" : "Save"}
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default App;