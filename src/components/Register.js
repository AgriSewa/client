import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register=()=>{
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [phone,setPhone]=useState("")
    const [position,setPosition]=useState({
        lat:"",
        long:""
    })
    useEffect(()=>{
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  
        if(position.lat!==0){
            const d={
                username:username,
                phone:phone,
                lat:position.lat,
                long:position.long
            }
            axios({
                url:'/api/auth/register',
                method:'POST',
                data: d
            }).then((res)=>{
                setUsername("");
                if(res.data.success) {
                    navigate(`/api/auth/verifyRegister/${phone}`)
                    console.log("Data submitted");
                } 
                setPhone("");
                setPosition({lat:"",long:""})          
            }).catch((e)=>{
                console.log("Internal Server error");
            });
        }
    },[position])
    const getPosition = async () => {
        navigator.geolocation.getCurrentPosition(
          pos => {
            setPosition({lat:pos.coords.latitude,long:pos.coords.longitude})
          }, 
          err => alert('Unable to fetch location')
        );
    }
    const submit=(e)=>{
        e.preventDefault()
        
        getPosition();
    }
    return(
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Register</h2>
                <form onSubmit={submit}> 
                    <input type="text" placeholder='Name' value={username} onChange={(e)=>setUsername(e.target.value)} required />
                    <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
                    <button className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3" type='submit'>Submit</button>
                </form>
                <br/><h7><Link to="/api/auth/login">Already have an account(Login)</Link></h7>
            </div>
        </div>
    )
}

export default Register