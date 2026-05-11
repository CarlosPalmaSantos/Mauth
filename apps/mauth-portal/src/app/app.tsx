import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

export function App() {
  return (

    <div className='bg-base flex items-center justify-center h-dvh'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
