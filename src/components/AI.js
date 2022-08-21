import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AI=()=>{
    const navigate = useNavigate();
    const {airesult} = useLocation().state;
    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate("/api/auth/login");
        }       
    },[])

    return(
        <div className='gallery'>
            <div className='card home-card'>                     
                <div className='card-image'>
                    <img src={airesult.image} style={{height:'300px'}}/>
                </div>
                <div className='card-content' style={{textAlign:'center'}}>
                    <h6><strong>Problem:</strong> {airesult.problem}</h6>
                    <p><strong>Advice:</strong> {airesult.advice}</p>
                </div>
            </div>
        </div>
    )
}

export default AI;