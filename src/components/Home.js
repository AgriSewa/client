import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import M from "materialize-css";

const Home = () => {
  const navigate = useNavigate();
  const [img,setImg]= useState('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg')
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/login");
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
    if(img==='https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'){
      M.toast({
        html: "Image cannot be empty",
        classes: "#f44336 red",
      });
      return;
    }
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
    axios({
      url: '/uploadimg',
      method: "POST",
      data: formData ,
      headers: {
        "auth": `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((res) => {
        if (res.data.success) {
          console.log("Data submitted");
          M.toast({
            html: 'Image uploaded successfully',
            classes: "#64dd17 light-green accent-4",
          });
        }
        else{
          M.toast({
            html: 'Image upload failed',
            classes: "#f44336 red",
          });
        }
        setImg('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg')
    })
    .catch((e) => {
        console.log("Internal Server error");
    });
  };

  return (
    <>
    <div className="myCard">
      <div className="auth-card">
        <img src={img} style={{marginLeft:"auto", marginRight:"auto", marginTop:"0px", height:"80%", width:"80%"}}/>
        <form onSubmit={submit}>
        <label htmlFor="imgfile">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span">
                    <PhotoCamera />
                </IconButton>
        </label>
        <input type="file" id="imgfile" name="imgfile" accept=".jpeg,.jpg,.png" onChange={(e)=>{uploadImage(e)}}  style={{display:"none"}} />
        <button
            className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
            type="submit">
            Submit
        </button>
      </form>
    </div>
  </div>
  <div>
    <button style={{border:"none", background:"grey", borderRadius:"50%", color:"#006400", position: "fixed", bottom:"2%", left:"2%"}}>
      <i className="large material-icons">android</i>
    </button>
    <Link to="/farmer/viewexperts">
      <button style={{border:"none", background:"grey", borderRadius:"50%", color:"black", position: "fixed", bottom:"2%", right:"2%"}}>
      <i className="large material-icons">add_to_queue</i>
      </button>
    </Link>
  </div>
  </>
  );
};

export default Home;
