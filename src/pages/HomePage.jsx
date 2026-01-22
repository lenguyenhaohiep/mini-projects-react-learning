import { Link } from "react-router-dom";

function HomePage() {
    return <>
        <ul>
            <li><Link to="/todo">Todo List</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/snake">Snake Game</Link></li>
        </ul>
    </>
}

export default HomePage;