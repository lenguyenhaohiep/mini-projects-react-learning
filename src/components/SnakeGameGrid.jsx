import { useEffect, useRef, useState } from "react";
import SnakeGameCell from "./SnakeGameCell";

function SnakeGameGrid({ level, direction, state, onGameOver, onEat }) {
    const DIRECTION_MAP = {
        "ArrowUp": [-1, 0],
        "ArrowDown": [1, 0],
        "ArrowLeft": [0, -1],
        "ArrowRight": [0, 1],
    }
    const LEVEL_TO_SPEED_MAP = {
        1: 200,
        2: 150,
        3: 100
    }
    const rows = 20;
    const cols = 20;
    const matrix = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => ({
            row: rowIndex,
            col: colIndex
        }))
    );
    const INITIAL_SNAKE = [[1, 2], [1, 1], [1, 0]];
    const INITIAL_FOOD = [rows / 2, cols / 2];
    const INITIAL_GAME = {
        "snake": INITIAL_SNAKE,
        "food": INITIAL_FOOD,
        "score": 0,
        "isOver": false
    }

    const randomNumber = () => Math.floor(Math.random() * 20);
    const inRange = (num, start, end) => num >= start && num <= end;

    const drawSnake = (snake) => {
        snake.forEach(([r, c]) => {
            const key = `${r}-${c}`;
            if (cellRefs.current[key]) {
                cellRefs.current[key].className = 'cell snake';
            }
        });
    }

    const drawFood = (food) => {
        const foodKey = `${food[0]}-${food[1]}`;
        if (cellRefs.current[foodKey]) {
            cellRefs.current[foodKey].className = 'cell target';
        }
    }

    const generateNewFood = (currentSnake) => {
        let newTarget = [randomNumber(), randomNumber()];
        while (currentSnake.find(post => post[0] === newTarget[0] && post[1] === newTarget[1])) {
            newTarget = [randomNumber(), randomNumber()];
        }
        return newTarget;
    }

    const [game, setGame] = useState(INITIAL_GAME);
    const directionRef = useRef(direction);
    const cellRefs = useRef({});

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    const moveSnake = (prevGame) => {
        const prevSnake = prevGame.snake;
        const prevFood = prevGame.food;
        const prevScore = prevGame.score;
        const head = prevSnake[0];
        const [dr, dc] = DIRECTION_MAP[directionRef.current] || [0, 1];
        const newHead = [head[0] + dr, head[1] + dc];

        if (!inRange(newHead[0], 0, rows - 1) || !inRange(newHead[1], 0, cols - 1) || prevSnake.find(post => post[0] === newHead[0] && post[1] === newHead[1])) {
            return {
                "isOver": true
            }
        }
        const ateTarget = newHead[0] === prevFood[0] && newHead[1] === prevFood[1];
        if (ateTarget) {
            return {
                "snake": [newHead, ...prevSnake],
                "food": generateNewFood([newHead, ...prevSnake]),
                "score": prevScore + 1
            }
        }
        return {
            "snake": [newHead, ...prevSnake.slice(0, -1)]
        }
    }

    useEffect(() => {
        if (state === "NEW") {
            setGame(INITIAL_GAME);
            return;
        }
        if (state === "PAUSE" || state === "OVER") {
            return;
        }
        const interval = setInterval(() => {
            setGame(prevGame => ({ ...prevGame, ...moveSnake(prevGame) }))
        }, LEVEL_TO_SPEED_MAP[level]);
        return () => clearInterval(interval);
    }, [state, level])

    useEffect(() => {
        Object.values(cellRefs.current).forEach(cell => {
            if (cell.className.includes("snake")) cell.className = 'cell';
        });
        drawSnake(game.snake);
    }, [game.snake]);

    useEffect(() => {
        Object.values(cellRefs.current).forEach(cell => {
            if (cell.className.includes("target")) cell.className = 'cell';
        });
        drawFood(game.food);
        onEat?.(game.score);
    }, [game.food]);

    useEffect(() => {
        if (game.isOver) {
            onGameOver?.();
        }
    }, [game.isOver])

    return <>
        <div className="container">
            <div className="matrix">
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => {
                            return <SnakeGameCell
                                key={`${rowIndex}-${colIndex}`}
                                cellKey={`${rowIndex}-${colIndex}`}
                                cellRefs={cellRefs}
                            />
                        }
                        )}
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default SnakeGameGrid;