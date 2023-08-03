import CRUD from './workout/CRUD';
import CheatMealManage from './cheatmeal/CheatMealManage';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workoutManage" element={<CRUD />} />
        <Route path="/cheatMealManage" element={<CheatMealManage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
