import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Adduser from './components/Adduser';
import Home from './components/Home';
import Edituser from './components/Edituser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adduser' element={<Adduser />} />
        <Route path='/edituser/:userid' element={<Edituser />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
