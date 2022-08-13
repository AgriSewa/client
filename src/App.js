import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import VerifyRegister from './components/VerifyRegister'
import VerifyLogin from './components/VerifyLogin'
import NavBar from './components/Navbar'
import ViewAppointment from './components/ViewAppointment'
import ViewExpert from './components/ViewExpert'
import Home from './components/Home' 
import Results from './components/Results' 
import BookExpert from './components/BookExpert'
import './App.css'
import './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Feedback from './components/Feedback';


const App=()=>{
  return (
    <>
      <BrowserRouter>       
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/farmer/viewResults' element={<Results />}></Route>
          <Route exact path='/api/auth/login' element={<Login />}></Route>
          <Route exact path='/api/auth/register' element={<Register />}></Route>
          <Route exact path='/api/auth/verifyRegister/:phone' element={<VerifyRegister />}></Route>
          <Route exact path='/api/auth/verifyLogin/:phone' element={<VerifyLogin />}></Route>
          <Route exact path='/farmer/appointments' element={<ViewAppointment />}></Route>
          <Route exact path='/feedback/:id' element={<Feedback />}></Route>
          <Route exact path='/farmer/viewexperts' element={<ViewExpert />}></Route>
          <Route exact path='/farmer/bookexperts/:expid' element={<BookExpert />}></Route>
        </Routes>
      </BrowserRouter> 
    </>           
  )
}

export default App;