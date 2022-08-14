import React,{useState, useEffect} from "react";
import axios from "axios";
import { connect } from 'twilio-video';


const ViewAppointment = () => {

  const [appointmentdata,setAppointmentdata] =useState([]);
  const [curdate,setCurdate]= useState();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.twilio.com/js/video/releases/2.15.2/twilio-video.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const startRoom = async (roomName) => {
      
      // fetch an Access Token from the join-room route
      const response = await axios({
          url: "/join-room" ,
          method: "POST",
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          },
          data: { roomName: roomName },
      });
      const { token } = await response.data;

      console.log(token);
      // //join the video room with the token
      connect(`${token}`, { name:roomName }).then(room => {
        console.log(`Successfully joined a Room: ${room}`);
        room.on('participantConnected', participant => {
          console.log(`A remote Participant connected: ${participant}`);
        });
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      });
      // console.log(room);
      // localParticipant=room.localParticipant;
      // handleConnectedParticipant(room.localParticipant,"red");
      // room.participants.forEach((participant)=>handleConnectedParticipant(participant,"yellow"));
      // room.on("participantConnected", (participant)=>handleConnectedParticipant(participant,"yellow"));

      // //for disabling video
      // // room.localParticipant.videoTracks.forEach(publication => {
      // //     console.log(publication);
      // //     publication.track.disable();
      // // });
      

      // // handle cleanup when a participant disconnects
      // room.on("participantDisconnected", handleDisconnectedParticipant);
      // window.addEventListener("pagehide", () => room.disconnect());
      // window.addEventListener("beforeunload", () => room.disconnect());
  };

  useEffect(() =>{
     const config = {
      headers: {
        auth: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

  
    axios.get('/farmer/upcoming',config).then((res)=>{
      console.log(res.data);
      setCurdate(convert(new Date()));

   

      setAppointmentdata(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    

  },[])


   function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  return (
    <>
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
                    appointmentdata.map((appointment,index)=>{
                      
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
                                <button className="btn btn-primary btn-sm" onClick={()=>startRoom(appointment.link)}>
                                  Join
                                </button>
                              }
                              {
                                appointment.mode!=="audio" &&
                                <a href={appointment.link} classtarget="_blank"><button
                                  className="btn btn-primary btn-sm"
                                >
                                  Join
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

       
    </>
  );
};

export default ViewAppointment;
