import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
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

  const onSubmit = async (data) => {
    let postid = uuidv4();
    let file = data.file[0];
    let blob = file.slice(0, file.size, "image/jpeg");
    let newFile = new File([blob], `${postid}_post.jpeg`, {
      type: "image/jpeg",
    });
    let formData = new FormData();
    formData.append("imgfile", newFile);

    fetch("/uploadimg", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log("Success"))
      .catch((err) => {
        console.log("Error");
      });
  };

  

  return (
    <div>
      <h2>Home page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Home;
