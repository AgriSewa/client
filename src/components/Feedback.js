import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Star from '@material-ui/icons/StarBorder';

const Feedback = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [img, setImg]= useState('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg');

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  const uploadImage=async(e)=>{
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const submit = async (e) => {
    e.preventDefault();
    let inputElem = document.getElementById("imgfile");
    let file = inputElem.files[0];
    console.log(file);
    let postid = uuidv4();
    let blob = file.slice(0, file.size, "image/jpeg");
    
    let newFile = new File([blob], `${postid}_post.jpeg`, {
      type: "image/jpeg",
    });
    let formData = new FormData();
    formData.append("imgfile", newFile);
    formData.append("feedback", feedback);
    axios({
      url: `/feedback/${id}`,
      method: "POST",
      data: formData ,
      headers: {
        "auth": `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((res) => {
        if (res.data.success) {
          setFeedback("");
          console.log("Data submitted");
          navigate('/');
        }
    })
    .catch((e) => {
        console.log("Internal Server error");
    });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h3>Upload image of crop</h3>
        <img src={img} style={{margin:"auto", height:"50%", width:"50%"}}/>
        <form onSubmit={submit}>                                                                                        
            <label htmlFor="imgfile">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <input type="file" id="imgfile" name="imgfile" onChange={(e)=>{uploadImage(e)}}  style={{display:"none"}} />
            <br />
            <h3>Provide Feedback for Expert</h3>
            <Button onClick={()=>setFeedback("1")}><Star fontSize="large" /></Button>
            <Button onClick={()=>setFeedback("2")}><Star fontSize="large" /></Button>
            <Button onClick={()=>setFeedback("3")}><Star fontSize="large" /></Button>
            <Button onClick={()=>setFeedback("4")}><Star fontSize="large" /></Button>
            <Button onClick={()=>setFeedback("5")}><Star fontSize="large" /></Button>
            <br /><br />
            <button
                className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
                type="submit">
                Submit
            </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
