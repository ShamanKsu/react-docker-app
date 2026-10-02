import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false
      }
    ]);

    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>ToDo List</h1>
        <p className="subtitle">Список задач на день</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Введите новую задачу..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />

          <button onClick={addTask}>Добавить</button>
        </div>

        <div className="tasks">
          {tasks.length === 0 ? (
            <p className="empty">Задач пока нет</p>
          ) : (
            tasks.map(task => (
              <div className="task" key={task.id}>
                <span
                  className={task.completed ? 'completed' : ''}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>

                <button onClick={() => deleteTask(task.id)}>
                  Удалить
                </button>
              </div>
            ))
          )}
        </div>

        <div className="counter">
          Выполнено: {tasks.filter(task => task.completed).length} из {tasks.length}
        </div>
      </div>
    </div>
  );
}

export default App;