import { useEffect } from "react";

function SnakeGameModal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null;
    }

    return <>
        <div className="modal-overlay" 
        onClick={(e) => {
            e.stopPropagation();
            onClose();
        }}
        >
            <div className="modal">
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    </>
}

export default SnakeGameModal;