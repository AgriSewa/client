import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Loader from './Loader'
import M from "materialize-css";
 
const ViewAppointment = () => {
 
  const navigate = useNavigate();
  const [appointmentdata,setAppointmentdata] =useState([]);
  const [curdate,setCurdate]= useState();
  const [curtime,setCurtime]=useState();
  const [load,setLoad]=useState(true);
 
  useEffect(() =>{  
    axios({
      url: '/farmer/upcoming',
      method: 'GET',
      headers: {
        auth: `Bearer ${localStorage.getItem("jwt")}`
      }}).then((res)=>{
      console.log(res.data);
      setCurdate(convert(new Date()));
      setCurtime(convert_time(new Date()));
      setAppointmentdata(res.data);
      setLoad(false);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
 
  function convert_time(str) {
    return new Date(str).toTimeString().slice(0,8);
  }
  
   function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
 
 
  return (
    <>
    { load==false ?
      <section>
          <div className="container ">
            <div className="row">
              <div className="col">
                <p className="h3 text-teal text-center mt-5">Upcoming Appointments</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-hover text-center table-success table-striped ">
                    <thead className="thead-dark text-secondary">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        {/* <th>Expert Name</th> */}
                        <th>Mode</th>
                     
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      appointmentdata && appointmentdata.map((appointment,index)=>{
                     
                      if(convert(new Date(appointment.book_date))>=curdate)
                      return(
                       
                         <tr key={appointment.id}>
                            <td className="text-center"><strong>{convert(new Date(appointment.book_date))}</strong></td>
                            <td className="text-center"><strong>{appointment.book_time}</strong></td>
                            {/* <td className="text-center"></td> */}
                             <td className="text-center"><strong>{appointment.mode}</strong></td>
                           
                            <td className="text-center">
                            { 
                                appointment.mode==="audio" && 
                                <button className="btn btn-primary btn-sm" onClick={()=>(convert(new Date(appointment.book_date))==curdate && curtime>=appointment.book_time)?navigate(`/meet/audio/${appointment.link}`):M.toast({html: "Cannot join before time",classes: "#f44336 red",})}>
                                  Join
                                </button>
                              }
                              { 
                                appointment.mode==="video" && 
                                <button className="btn btn-primary btn-sm" onClick={()=>(convert(new Date(appointment.book_date))==curdate && curtime>=appointment.book_time)?navigate(`${appointment.link}`):M.toast({html: "Cannot join before time",classes: "#f44336 red",})}>
                                  Join
                                </button>
                              }
                              {
                                appointment.mode==="physical" &&
                                <a href={appointment.link} classtarget="_blank"><button
                                  className="btn btn-primary btn-sm"
                                >
                                  Address
                                </button></a>
                              }
                            </td>
                          </tr>
                         
                    )})}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/* )} */}
      </section>
 
          :<Loader/>                  }
    </>
  );
};
 
export default ViewAppointment;