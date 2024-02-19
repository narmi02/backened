
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
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
    <Notestate>
      <BrowserRouter>
        <Navbar/>
        <Alert/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    </Notestate>
     </>
  )
}

export default App;
