import React, { useEffect, useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios"

const ViewExpert = () => {
  const navigate = useNavigate();
  const [expert,setExpert] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/login");
    }
  }, []);
  
  useEffect(() => {
    const config = {
      headers: {
        auth: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }
    axios.get('/get/nearest',config).then((res)=>{
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

                <Link to={`/farmer/bookexperts/${ex._id}`}><button className=" ms-auto btn btn-secondary btn-sm">
                  Join
                </button></Link>
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
