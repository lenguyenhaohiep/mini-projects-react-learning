import { useEffect, useRef, useState } from "react";
import SnakeGameBoard from "./SnakeGameBoard";
import SnakeGameGrid from "./SnakeGameGrid";
import SnakeGameModal from "./SnakeGameModal";

function SnakeGame() {
    const VALID_DIRECTIONS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const [state, setState] = useState("NEW");
    const [direction, setDirection] = useState('ArrowRight')
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [level, setLevel] = useState(1);
    const directionRef = useRef(direction);
    const stateRef = useRef(state);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const handleCaseDown = (e) => {
        if (e.key === "Escape" && stateRef.current !== "OVER") {
            setState("PAUSE");
            return;
        }
        if (VALID_DIRECTIONS.includes(e.key)) {
            const currentDir = directionRef.current;
            if (
                (currentDir === "ArrowUp" && e.key === "ArrowDown") ||
                (currentDir === "ArrowDown" && e.key === "ArrowUp") ||
                (currentDir === "ArrowLeft" && e.key === "ArrowRight") ||
                (currentDir === "ArrowRight" && e.key === "ArrowLeft") ||
                (currentDir === e.key)
            ) {
                return;
            }
            setDirection(e.key);
        }
    }

    const handleClick = (e) => {
        if (state === "OVER") {
            setState("NEW");
        } else if (state == "NEW") {
            setState("PLAY");
        }
    }

    const handleGameOver = () => {
        setState("OVER");
        if (highestScore < score) {
            setHighestScore(score)
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleCaseDown);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("keydown", handleCaseDown);
            window.removeEventListener("click", handleClick);
        }
    }, []);

    const resetGame = () => {
        setScore(0);
        setState("NEW");
        setDirection("ArrowRight");
    }

    useEffect(() => {
        document.body.classList.add("snake-game");
        return () => document.body.classList.remove("snake-game");
    }, []);

    return <>
        <SnakeGameBoard score={score} highestScore={highestScore}></SnakeGameBoard>
        <div className="container">
            <button className={level == 1 ? "btn-selected" : ""} onClick={() => setLevel(1)}>Easy</button>
            <button className={level == 2 ? "btn-selected" : ""} onClick={() => setLevel(2)}>Medium</button>
            <button className={level == 3 ? "btn-selected" : ""} onClick={() => setLevel(3)}>Hard</button>
        </div>

        {state === "NEW" && (<p className="hint">Choose your level or click anywhere to play</p>)}
        {state === "PLAY" && (<p className="hint">Press ESC to pause</p>)}
        {state === "PLAY" &&
            (<SnakeGameGrid level={level} direction={direction} state={state} onGameOver={handleGameOver} onEat={(score) => setScore(score)}></SnakeGameGrid>)}
        <SnakeGameModal isOpen={state === "OVER"} onClose={() => resetGame()} title="Game Over">
            <p>Your Score {score}</p>
            <p>Click anywhere to replay</p>
        </SnakeGameModal>

        <SnakeGameModal isOpen={state === "PAUSE"} onClose={() => setState("PLAY")} title="Pause">
            <p>Click anywhere to resume playing</p>
        </SnakeGameModal>
    </>
}

export default SnakeGame;