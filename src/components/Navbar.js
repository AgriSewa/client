import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Home from '@material-ui/icons/Home';
import Monitor from '@mui/icons-material/Monitor';
import Poll from '@mui/icons-material/Poll';
import Logout from '@mui/icons-material/Logout';
import SpaIcon from '@mui/icons-material/Spa';
const NavBar=()=>{
    const navigate=useNavigate()
   
    const renderList=()=>{
        if(localStorage.getItem("user")){
            return [
                <li><Link to="/"><Home /></Link></li>,
                <li><Link to="/farmer/appointments"><Monitor /></Link></li>,
                <li><Link to="/farmer/viewResults"><Poll /></Link></li>,
                <li><Link to="/yield"><SpaIcon /></Link></li>,
                <li><button className="btn waves-effect waves-light #f44336 red" style={{marginRight:'10px', width:'20px'}} onClick={()=>{
                    localStorage.clear()
                    navigate('/api/auth/login')
                }}><Logout /></button></li>
            ]
        }
        else{
            return [
                <li><Link to="/api/auth/login">Login</Link></li>,
                <li><Link to="/api/auth/register">Register</Link></li>
            ]
        }
    }
    return(
        <>
        <div className='d-flex justify-content-end' style={{backgroundColor:'black'}}>
                <div id="google_translate_element"></div>
            </div>
           
        <nav>
            <div className="nav-wrapper black">
                <Link to={localStorage.getItem("user")?"/":'/api/auth/login'} className="brand-logo left" style={{marginLeft:"10px"}}>AgriSewa</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
 
 
                   
                </ul>
            </div>
        </nav>
        </>
    )
}
 
export default NavBar;
