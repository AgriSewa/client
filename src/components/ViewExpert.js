import React, { useEffect, useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios"
import M from "materialize-css"
const ViewExpert = () => {
  const navigate = useNavigate();
  const [expert,setExpert] = useState([]);
  const [flag,setFlag] = useState(true)
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/login");
    }
    setInterval(function () {
      let temp=localStorage.getItem("time")?localStorage.getItem("time").valueOf():0;
      let hours = Math.abs(new Date().getTime() - temp) / 3600000;
     if(hours<24){
      setFlag(false);
     }
    }, 1000);
   
  }, []);
 
  useEffect(() => {
    axios({
      url: '/get/nearby',
      method: "GET",
      headers: {
        "auth": `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((res)=>{
      console.log(res.data);
      setExpert(res.data);
    }).catch((err)=>{
      console.log("unable to fetch")
    })
  },[])
 
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
 
{ expert && expert.length>0 &&
 
    expert.map((ex)=>{
      return (
           <div className="card my-2 bg-info" key={ex._id}>
              <div className="card-body bg-success text-white">
                <p className="h3">{ex.name}</p>
 
                <button onClick={()=>{
                  if(flag==true){
                      navigate(`/farmer/bookexperts/${ex._id}`)
                  }else{
                       M.toast({ html: "Cannot book slot within 24 hours of one booking!", classes: "#f44336 red" });
                  }
                }}className=" ms-auto btn btn-secondary btn-sm">
                  Book Appointment
                </button>
              </div>
            </div>
      )
    })}
 
 
 
 
               {/* <div className="card my-2 bg-info">
              <div className="card-body bg-success text-white">
                <p className="h3">name</p>
 
                <button className=" ms-auto btn btn-secondary btn-sm">
                  Join
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
 
export default ViewExpert;
