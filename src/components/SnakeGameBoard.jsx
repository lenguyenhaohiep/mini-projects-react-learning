function SnakeGameBoard({score, highestScore}) {
    return <>
        <div className="game-title">
            <span>Snake Game</span>
        </div>
        <div className="board">
            <div className="high-score">
                <span>Highest Score</span>
                <span>{highestScore}</span>
            </div>
            <div className="score">
                <span>Score</span>
                <span>{score}</span>
            </div>
        </div>
    </>
}

export default SnakeGameBoard;