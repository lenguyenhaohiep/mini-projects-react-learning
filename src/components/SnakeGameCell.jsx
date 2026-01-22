function SnakeGameCell({cellKey, cellRefs}) {
    return <>
        <div
            className="cell"
            ref={(el)=> cellRefs.current[cellKey]=el}
        >
        </div>
    </>
}

export default SnakeGameCell;