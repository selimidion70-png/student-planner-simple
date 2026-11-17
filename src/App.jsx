import { useState } from "react";

const initialTasks = [
  { id: 1, title: "React basics", time: "09:00", done: true },
  { id: 2, title: "Git practice", time: "11:00", done: false },
  { id: 3, title: "Team meeting", time: "14:00", done: false }
];

let nextId = initialTasks.length + 1;

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) cancelForm();
  }

  function startAdd() {
    setEditingId(null);
    setTitle("");
    setTime("");
    setIsAdding(true);
  }

  function startEdit(task) {
    setIsAdding(false);
    setEditingId(task.id);
    setTitle(task.title);
    setTime(task.time);
  }

  function cancelForm() {
    setIsAdding(false);
    setEditingId(null);
    setTitle("");
    setTime("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId
            ? { ...task, title: trimmedTitle, time }
            : task
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { id: nextId++, title: trimmedTitle, time, done: false }
      ]);
    }

    cancelForm();
  }

  const isFormOpen = isAdding || editingId !== null;

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Mon planning est bien remplie de journe dans la semmaine</p>
        <h1>Student Planner</h1>
        <p className="subtitle">
          Le projet est bien fait pour etudier en informatique.
        </p>
      </header>

      <section className="card">
        <div className="card-header">
          <div>
            <p className="label">AUJOURD'HUI</p>
            <h2>Mardi</h2>
          </div>
          <span className="badge">
            {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="tasks">
          {tasks.map((task) => (
            <article className="task" key={task.id}>
              <button
                type="button"
                className={task.done ? "check done" : "check"}
                onClick={() => toggleDone(task.id)}
                aria-label={
                  task.done ? "Marquer comme non terminée" : "Marquer comme terminée"
                }
              >
                ✓
              </button>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.time}</p>
              </div>
              <div className="task-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => startEdit(task)}
                  aria-label="Modifier la tâche"
                >
                  ✎
                </button>
                <button
                  type="button"
                  className="icon-btn danger"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Supprimer la tâche"
                >
                  ✕
                </button>
              </div>
            </article>
          ))}
          {tasks.length === 0 && (
            <p className="empty">Aucune tâche pour le moment.</p>
          )}
        </div>

        {isFormOpen ? (
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <div className="form-actions">
              <button type="button" className="secondary" onClick={cancelForm}>
                Annuler
              </button>
              <button type="submit">
                {editingId !== null ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </form>
        ) : (
          <button type="button" onClick={startAdd}>
            + Ajouter une tâche
          </button>
        )}
      </section>

      <footer>
        Projet entre git et gitub dans le future travaille en inoformatique
      </footer>
    </main>
  );
}
