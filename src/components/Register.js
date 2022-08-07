import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register=()=>{
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [phone,setPhone]=useState(0)
    const [lat,setLat]=useState(0)
    const [long,setLong]=useState(0)
    const submit=(e)=>{
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(function(pos){
            setLat(pos.coords.latitude)
            setLong(pos.coords.longitude)
        }),function(){
            alert('Unable to fetch location');
        }
        const d={
            username:username,
            phone:phone,
            lat:lat,
            long:long
        }
        axios({
            url:'/register',
            method:'POST',
            data: d
        }).then((res)=>{
            setUsername("");
            if(res.data.success) {
                navigate(`/verifyRegister/${phone}`)
                console.log("Data submitted");
            } 
            setPhone(0);          
        }).catch((e)=>{
            console.log("Internal Server error");
        })
    }
    return(
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Register</h2>
                <form onSubmit={submit}> 
                    <input type="text" placeholder='Name' value={username} onChange={(e)=>setUsername(e.target.value)} required />
                    <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
                    <button className="btn waves-effect waves-light #2b67ab blue darken-3" type='submit'>Submit</button>
                </form>
                <br/><h7><Link to="/login">Already have an account(Login)</Link></h7>
            </div>
        </div>
    )
}

export default Register