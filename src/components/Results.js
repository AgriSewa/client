import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Results=()=>{
    const navigate = useNavigate();
    const [results,setResults]=useState([]);
    const curdate=new Date();
    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate("/api/auth/login");
        }
        else {
            axios({
                url:'/farmer/viewResults',
                method:'GET',
                headers: {
                    'auth': `Bearer ${localStorage.getItem("jwt")}`,
                }
            }).then(res=>{
                console.log(res.data.results);
                setResults(res.data.results)
            })
        }        
    },[])

    return(
        <div className='gallery'>
            {
                results==null &&
                <h1>No Results to display</h1>
            }
            {
                results &&
                results.map((result)=>{
                    var date=new Date(result.book_date.split('T')[0])
                    date.setDate(date.getDate()+1)
                    return(
                        <div className='card home-card' key={result.id}>                     
                            <div className='card-image'>
                                <img src={result.image} style={{height:'300px'}}/>
                            </div>
                            <div className='card-content' style={{textAlign:'center'}}>
                                <h6><strong>Expert Name:</strong> {result.expertName}</h6>
                                <h6><strong>Appointment Date:</strong> {date.toDateString()}</h6>
                                <h6><strong>Problem:</strong> {result.problem}</h6>
                                <p><strong>Advice:</strong> {result.advice}</p>
                                {result.update_farmer==0 && <button className="btn waves-effect waves-light #00bcd4 cyan white-text text-lighten-3" onClick={()=>navigate(`/feedback/${result.id}`)}>Upload image of Problem</button>}
                                {result.update_expert==1 &&<a href=
                                {`https://www.google.com/maps/place/?q=nearby farmshop for ${result.problem}`}><button
                                  className="btn btn-primary btn-sm"
                                >
                                  Nearby Stores
                                </button></a>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Results;