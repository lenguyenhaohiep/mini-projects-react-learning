import { useState } from "react";
import TodoBar from "./TodoBar";
import TodoItem from "./TodoItem";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [displayDoneOnly, setDisplayDone] = useState(false);

    const addTask = (value) => {
        setTasks([...tasks, { task: value, done: false, id: crypto.randomUUID() }]);
    }

    const countDone = tasks.filter(i => i.done).length;

    const handleToogle = (index) => {
        setTasks(
            tasks.map(item =>
                item.id === index ? ({ ...item, done: !item.done }) : item
            )
        );
    }

    const handleDoneOnly = (e) => {
        setDisplayDone(e.target.checked);
    }

    const handleRemove = (index) => {
        setTasks(
            tasks.filter(i => i.id != index)
        )
    }

    return <>
        <h1>Todo List</h1>
        <TodoBar onClickAdd={addTask} />
        <div className="stats">
            <p>Total tasks: {tasks.length}</p>
            <p>Total done: {countDone}</p>
        </div>
        <div className="filter-section">
            <input type="checkbox" onChange={handleDoneOnly} /> <span>Not done only</span>
        </div>
        <ul className="todo-list">
            {
                tasks.filter(i => !displayDoneOnly || i.done == !displayDoneOnly)
                    .map((item, index) => (
                        <li key={index} id={`item-${index}`}
                            className={`todo-item ${item.done ? 'completed' : ''}`}
                        >
                            <TodoItem
                                task={item.task}
                                done={item.done}
                                onToggle={() => handleToogle(item.id)}
                                onRemove={() => handleRemove(item.id)}
                            />
                        </li>))
            }
        </ul>
    </>
}

export default TodoList;