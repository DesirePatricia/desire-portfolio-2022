import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './common/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
