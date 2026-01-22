import { useState } from "react";

function TodoBar({ onClickAdd }) {
    const [inputText, setText] = useState('');

    const addItem = () => {
        if (inputText !== "") {
            onClickAdd(inputText);
            setText('');
        }
    }

    const handleKeydown = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <>
        <div className="input-section">
            <input
                type="text"
                id="add-item"
                value={inputText}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeydown}
                placeholder="Add todo item" />
            <button onClick={addItem}>Add</button>
        </div>
    </>;
}

export default TodoBar;