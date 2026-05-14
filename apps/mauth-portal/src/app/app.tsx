import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import { ApiProvider } from './providers/ApiContext';
import { Validate } from './pages/Validate';
import Dash from './pages/Dash';

export function App() {
  return (

    <div className='bg-base flex items-center justify-center h-dvh'>
      <ApiProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/dash' element={<Dash />} />
          <Route path='/validate' element={<Validate />} />
          <Route path='*' element={<Validate  />} />
        </Routes>
      </ApiProvider>
    </div>
  );
}

export default App;
