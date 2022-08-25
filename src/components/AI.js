import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSpeechSynthesis } from 'react-speech-kit';
import SettingsVoice from '@mui/icons-material/SettingsVoice';

const AI=()=>{
    const navigate = useNavigate();
    const { speak,SpeechSynthesisVoice } = useSpeechSynthesis();
    const {airesult} = useLocation().state;
    // const arr = {
    //     default: true,
    //     lang: "hi-IN",
    //     localService: true,
    //     name: "Karen",
    //     voiceURI: "Karen"
    //   }
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
                    <p id="textarea"><strong>Advice:</strong> {airesult.advice}</p><br/>
                    <button className="btn btn-info" onClick={()=>speak({ text: airesult.advice })}><SettingsVoice/></button>
                </div>
            </div>
        </div>
    )
}

export default AI;