import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Login from './components/Login'
import Register from './components/Register'
import VerifyRegister from './components/VerifyRegister'
import VerifyLogin from './components/VerifyLogin'
import './App.css'
import { BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom'
import {reducer,initialState} from './reducer/userReducer'

export const UserContext=createContext()

const Routings=()=>{
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'USER',payload:user})
    }      
    else 
      navigate('/login')
  },[])
  return(
    <>  
        <Routes>
          {/* <Route exact path='/' element={<Home />}></Route> */}
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/verifyRegister/:phone' element={<VerifyRegister />}></Route>
          <Route exact path='/verifyLogin/:phone' element={<VerifyLogin />}></Route>
        </Routes>
    </>
  )     
}

const App=()=>{
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>       
        <NavBar />
        <Routings />   
      </BrowserRouter> 
    </UserContext.Provider>           
  )
}

export default App;