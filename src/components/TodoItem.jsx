function TodoItem({ task, done, onToggle, onRemove }) {
    return <>
        <input type="checkbox" checked={done} onChange={onToggle} />
        <span style={
            {
                textDecoration: done ? 'line-through' : 'none'
            }
        }>{task}</span>
        <button onClick={onRemove}>Remove</button>
    </>
}

export default TodoItem;