import React,{useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {UserContext} from '../App'

const NavBar=()=>{
    const navigate=useNavigate()
    const {state,dispatch}=useContext(UserContext)
    const renderList=()=>{
        if(state){
            return [
                <li><Link to="/farmer/appointments">Appointments</Link></li>,
                <li><button className="btn waves-effect waves-light #f44336 red" style={{marginRight:'10px'}} onClick={()=>{
                    localStorage.clear()
                    dispatch({type:'CLEAR'})
                    navigate('/login')
                }}>Logout</button></li>
            ]
        }
        else{
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/register">Register</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper black">
                <Link to={state?"/":'/login'} className="brand-logo left" style={{marginLeft:"10px"}}>AgriSewa</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;