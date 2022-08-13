import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Results=()=>{
    const navigate = useNavigate();
    const [results,setResults]=useState([]);
    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate("/login");
        }
        else {
            axios({
                url:'/farmer/viewResults',
                method:'GET',
                headers: {
                    'auth': `Bearer ${localStorage.getItem("jwt")}`,
                }
            }).then(res=>{
                setResults(res.data.results)
            })
        }        
    },[])

    return(
        <div className='gallery'>
            {
                results.map((result)=>{
                return(
                    <div className='card home-card' key={result.id}>                     
                        <div className='card-image'>
                            <img src={result.image} style={{height:'300px'}}/>
                        </div>
                        <div className='card-content'>
                            <h6>{result.problem}</h6>
                            <p>{result.advice}</p>
                            {result.update_farmer==0 && <button className="btn waves-effect waves-light #00bcd4 cyan white-text text-lighten-3" onClick={()=>navigate(`/feeback/${result.id}`)}>Give Rating</button>}
                        </div>
                    </div>
                )
            })
            }                       
        </div>
    )
}

export default Results;