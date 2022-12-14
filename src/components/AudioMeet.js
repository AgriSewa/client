import React,{useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from './logo.png';
import axios from "axios";
import { connect } from 'twilio-video';


const AudioMeet = () => {
    const { link } = useParams();
    const navigate = useNavigate();
    const [token,setToken]=useState("")
    useEffect(() => {
        if(token){
            // join the video room with the token
            connect(`${token}`, { name:link }).then(room => {
                console.log(`Successfully joined a Room: ${room}`);
                console.log(room)
                // Log your Client's LocalParticipant in the Room
                handleConnectedParticipant(room.localParticipant,"orange","Farmer");
                room.participants.forEach((participant)=>handleConnectedParticipant(participant,"blue","Expert"));
                room.on("participantConnected", (participant)=>handleConnectedParticipant(participant,"blue","Expert"));
                room.localParticipant.videoTracks.forEach(publication => {
                    publication.track.disable();
                });
    
                // handle cleanup when a participant disconnects
                room.on("participantDisconnected", handleDisconnectedParticipant);
                window.addEventListener("pagehide", () => room.disconnect());
                window.addEventListener("beforeunload", () => room.disconnect());
                window.addEventListener("abort",() => room.disconnect());
                window.addEventListener("popstate",() => room.disconnect());
                }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
        }
    }, [token])

    useEffect(() => {
        if (!localStorage.getItem("user")) {
          navigate("/api/auth/login");
        }
        // fetch an Access Token from the join-room route
        axios({
            url: "/join-room" ,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'auth': `Bearer ${localStorage.getItem("jwt")}`
            },
            data: { roomName: link },
        }).then((res)=>{
            console.log(res.data)
            setToken(res.data.token);
        }).catch(err=>console.log("Error in connecting to Audio Call"))
      }, []);

    const handleConnectedParticipant = (participant,color,text) => {
        // create a div for this participant's tracks
        const container=document.getElementById('video-container');
        const participantDiv = document.createElement("div");
        // participantDiv.classList.add("hello");
        participantDiv.style.height='100px';
        participantDiv.style.width='100px';
        participantDiv.style.margin="1rem";
        participantDiv.innerHTML=text;
        participantDiv.style.color="white";
        participantDiv.style.paddingLeft="25px";
        participantDiv.style.backgroundColor=color;
        participantDiv.setAttribute("id", participant.identity);
        container.appendChild(participantDiv);
    
        // iterate through the participant's published tracks and
        // call `handleTrackPublication` on them
        participant.audioTracks.forEach((trackPublication) => {
            handleTrackPublication(trackPublication, participant);
        });
    
        // listen for any new track publications
        participant.on("trackPublished", handleTrackPublication);
    };
    
    const handleTrackPublication = (trackPublication, participant) => {
        function displayTrack(track) {
            // append this track to the participant's div and render it on the page
            const participantDiv = document.getElementById(participant.identity);
            // track.attach creates an HTMLVideoElement or HTMLAudioElement
            // (depending on the type of track) and adds the video or audio stream
            participantDiv.append(track.attach());
        }
    
        // check if the trackPublication contains a `track` attribute. If it does,
        // we are subscribed to this track. If not, we are not subscribed.
        //console.log(trackPublication+"yo");
        if (trackPublication.track) {
            displayTrack(trackPublication.track);
        }
    
        // listen for any new subscriptions to this track publication
        trackPublication.on("subscribed", displayTrack);
    };
    
    const handleDisconnectedParticipant = (participant) => {
        // stop listening for this participant
        participant.removeAllListeners();
        // remove this participant's div from the page
        const participantDiv = document.getElementById(participant.identity);
        participantDiv.remove();
    };

    return(
        <>
    <div id="video-container"></div>
    <div className="Icon" style={{overflow:"hidden"}}>
      <header className="Icon-header">
        <img src={logo} className="Icon-logo" alt="phone-icon" />
      </header>
    </div>
        </>
    )
}

export default AudioMeet;