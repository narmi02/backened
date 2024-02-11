
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Notestate from './context/note/Notestate';

function App() {
  return (
    <>
    <Notestate>
      <BrowserRouter>
        <Navbar/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    </Notestate>
     </>
  )
}

export default App;
