import React,{useState,useContext} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import {UserContext} from '../App'
import axios from 'axios'
import M from 'materialize-css'

const VerifyLogin=()=>{
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    const {phone}=useParams()
    const [code,setCode]=useState("")
    const submit=(e)=>{
        e.preventDefault()
        axios({
            url:`/api/auth/verifyLogin/${phone}`,
            method:'POST',
            data: {code:code}
        }).then((res)=>{
            if(res.data.success) {
                localStorage.setItem('jwt',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                dispatch({type:'USER',payload:res.data.user})
                M.toast({html: res.data.message,classes:'#64dd17 light-green accent-4'})
                navigate('/')
                console.log("Data submitted");
            }
            else {                
                M.toast({html: 'Invalid OTP',classes:'#f44336 red'})
                navigate('/api/auth/login')
            } 
            setCode(0);          
        }).catch((e)=>{
            console.log("Internal Server error");
        })
    }
    return(
        <div className='mycard'>
            <div className="card auth-card">
                <h2>OTP Verification</h2>
                <form onSubmit={submit}> 
                    <input type="number" placeholder='OTP' value={code} onChange={(e)=>setCode(e.target.value)} required />
                    <button className="btn waves-effect waves-light #2b67ab blue darken-3" type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyLogin