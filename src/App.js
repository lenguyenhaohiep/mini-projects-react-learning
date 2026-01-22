import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import TodoBart from './components/TodoBar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import WeatherPage from  './pages/WeatherPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import SnakeGamePage from './pages/SnakeGamePage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/todo" element={<TodoListPage />}/>
        <Route path="/weather" element={<WeatherPage />}/>
        <Route path="/snake" element={<SnakeGamePage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
