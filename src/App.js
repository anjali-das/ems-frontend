import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Edit from './Pages/Edit';
import Pnf from './Pages/Pnf';
import Header from './Components/Header';
import Footer from './Components/Footer';





function App() {
  return (
    <>
    {/* <h1> <i class="fa-solid fa-layer-group fa-flip"></i> EMS Application</h1> */}
    {/* header */}
    
    <Header/>
    <Routes>
         <Route path='/'element={<Home/>} />
         <Route path='/profile/:id' element={<Profile/>} />
         <Route path='/register'element={<Register/>} />
         <Route path='/edit/:id'element={<Edit/>} />
         <Route path='*'element={<Pnf/>} />
   </Routes>
   <Footer/>
    




    {/* footer */}
    </>
  );
}

export default App;
