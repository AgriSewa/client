import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [img,setImg]= useState('')
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
      
  const onSubmit = async (data) => {
    let postid = uuidv4();
    console.log(data)
    let file = data.file[0];
    console.log(file);
    let blob = file.slice(0, file.size, "image/jpeg");
    
    let newFile = new File([blob], `${postid}_post.jpeg`, {
      type: "image/jpeg",
    });
    let formData = new FormData();
    formData.append("imgfile", newFile);

    axios({
      url: "/uploadimg",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: formData,
    }).then((res) => {
      console.log("Success")
    }).catch((err) => {
        console.log("Error");
    });
  };

  return (
    <div>
      <h2>Home page</h2>
      <img src={img} style={{height:"100px", width:"100px"}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} onChange={(e)=>{uploadImage(e)}}  id="icon" style={{display:"none"}} />
        <label htmlFor="icon">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Home;
