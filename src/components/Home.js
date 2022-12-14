import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import M from "materialize-css";
import Loader from "./Loader";

const Home = () => {
  const navigate = useNavigate();
  const [cbot, setCbot] = useState(false);
  const [img, setImg] = useState(
    "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
  );
  const [base64, setBase64] = useState("");
  const [flag, setFlag] = useState(false);
  const [airesult, setAiresult] = useState({
    image: "",
    problem: "",
    remedy: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/login");
    }
    // axios({
    //     url: '/yield',
    //     method: "GET",
    //     headers: {
    //       "auth": `Bearer ${localStorage.getItem("jwt")}`,
    //     }
    //   }).then((res)=>{
    //     console.log(res.data);
    //   }).catch((e)=>{
    //     console.log("Internal Server error");
    //   })
  }, []);

  useEffect(() => {
    if (
      airesult.image !== "" &&
      airesult.problem !== "" &&
      airesult.advice !== ""
    ) {
      navigate("/airesult", { state: { airesult } });
      // axios({
      //   url: '/AI/result',
      //   method: "POST",
      //   data: airesult,
      //   headers: {
      //     "auth": `Bearer ${localStorage.getItem("jwt")}`,
      //   }
      // }).then((res)=>{
      //   if(res.data.success)
      //     navigate("/airesult",{state:{airesult}})
      // }).catch((e)=>{
      //   console.log("Internal Server error");
      // })
    }
  }, [airesult]);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  const uploadImage = async (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    var file = document.querySelector("input[type=file]")["files"][0];

    var reader = new FileReader();

    reader.onload = function () {
      setBase64(reader.result.replace("data:", "").replace(/^.+,/, ""));
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setFlag(true);
    if (
      img ===
      "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    ) {
      M.toast({
        html: "Image cannot be empty",
        classes: "#f44336 red",
      });
      return;
    }
    // let inputElem = document.getElementById("imgfile");
    // let file = inputElem.files[0];
    // let postid = uuidv4();
    // let blob = file.slice(0, file.size, "image/jpeg");

    // let newFile = new File([blob], `${postid}_post.jpeg`, {
    //   type: "image/jpeg",
    // });
    // let formData = new FormData();
    // formData.append("imgfile", newFile);
    // axios({
    //   url: '/uploadimg',
    //   method: "POST",
    //   data: formData ,
    //   headers: {
    //     "auth": `Bearer ${localStorage.getItem("jwt")}`,
    //   }
    // })
    // .then((res) => {
    //     if (res.data.success) {
    //       console.log("Data submitted");
    //       axios.get('https://api.sightengine.com/1.0/check.json', {
    //         params: {
    //           'url': res.data.image,
    //           'models': 'properties',
    //           'api_user': '65553899',
    //           'api_secret': 'suWqjY6YuRNmCTXqLckU',
    //         }
    //       })
    //       .then((res2)=>{
    //         if(res2.data.sharpness<0.7){
    //           M.toast({
    //             html: 'Image is blurry, Reupload',
    //             classes: "#f44336 red",
    //           });
    //           return;
    //         }
    //         if(res2.data.brightness<0.4){
    //           M.toast({
    //             html: 'Image has low brightness, Reupload',
    //             classes: "#f44336 red",
    //           });
    //           return;
    //         }
    //         if(res2.data.contrast<0.4){
    //           M.toast({
    //             html: 'Image has low contrast, Reupload',
    //             classes: "#f44336 red",
    //           });
    //           return;
    //         }
    //         axios({
    //           url: 'https://plant-disease-detector-pytorch.herokuapp.com/',
    //           method: "POST",
    //           data: {"image":base64}
    //         }).then((res1)=>{
    //           setAiresult({
    //             image:res.data.image,
    //             problem:res1.data.disease,
    //             advice:res1.data.remedy
    //           })
    //         }).catch((e)=>{
    //           console.log("Disease prediction error");
    //         })
    //         M.toast({
    //           html: 'Identifying disease please wait',
    //           classes: "#64dd17 light-green accent-4",
    //         });
    //       })
    //       .catch((error)=> {
    //         if (error.response) console.log(error.response.data);
    //         else console.log(error.message);
    //       });
    //     }
    //     else{
    //       M.toast({
    //         html: 'Image upload failed',
    //         classes: "#f44336 red",
    //       });
    //     }
    //     setImg('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg')
    // })
    // .catch((e) => {
    //     console.log("Internal Server error");
    // });
    const data = {
      api_key: "PGb25p26yPQl2LarFnny2xiC7Gjp7Eq5KrNpWRzjxq8zYc0MnY",
      images: [base64],
      modifiers: ["crops_fast", "similar_images"],
      language: "en",
      disease_details: [
        "cause",
        "common_names",
        "classification",
        "description",
        "treatment",
        "url",
      ],
    };
    axios
      .post("https://api.plant.id/v2/health_assessment", data)
      .then((res) => {
        const result=res.data;
        console.log(res.data)
        if(res.data.is_plant){
          if(res.data.health_assessment.is_healthy==false){
            const diseases=res.data.health_assessment.diseases;
            // diseases.sort((a, b) => b.probability - a.probability);
            // for(let d of diseases){
            //   if(d.probability>max){
            //     max=d.probabiity;
            //     str=d.name;
            //     rem=d.disease_details.treatment.prevention;
            //   }
            // }
            let d=(diseases.length >1)?diseases[1]:diseases[0];
            const rem=d.disease_details.treatment.prevention;
            const s=rem.join();
            setAiresult({
              image:base64,
              problem:d.name,
              advice:s
            })
          }
          else{
            setAiresult({
              image:base64,
              problem:'No Problem',
              advice:'Is healthy'
            })
          }
        }
        else{
           M.toast({
            html: "Disease cannot be predicted",
            classes: "#f44336 red",
          }); 
          setFlag(false)
          setImg('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg')
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        setFlag(false);
      });
    // axios({
    //   //url: 'https://plant-disease-detector-pytorch.herokuapp.com/',
    //   url: "https://api.plant.id/v2/health_assessment",
    //   method: "POST",
    //   data: {
    //     image: base64,
    //     modifiers: ["similar_images"],
    //     disease_details: ["description", "treatment"],
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Api-Key": "PGb25p26yPQl2LarFnny2xiC7Gjp7Eq5KrNpWRzjxq8zYc0MnY",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     // setAiresult({
    //     //   image:base64,
    //     //   problem:res1.data.disease,
    //     //   advice:res1.data.remedy
    //     // })
    //     setFlag(false);
    //   })
    //   .catch((e) => {
    //     console.log("Disease prediction error");
    //     M.toast({
    //       html: "Disease cannot be predicted",
    //       classes: "#f44336 red",
    //     });
    //   });
  };

  return (
    <>
      {flag === true && <Loader />}
      {flag == false && (
        <div>
          <div className="myCard">
            <div className="auth-card" style={{ zIndex: "-1" }}>
              <img
                src={img}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "0px",
                  height: "80%",
                  width: "80%",
                }}
              />
              <form onSubmit={submit}>
                <label htmlFor="imgfile">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <input
                  type="file"
                  id="imgfile"
                  name="imgfile"
                  accept=".jpeg,.jpg,.png"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  style={{ display: "none" }}
                />
                <button
                  className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div>
            {cbot && (
              <iframe
                style={{
                  position: "fixed",
                  top: "15vh",
                  left: "1%",
                  zIndex: "1",
                }}
                width="350"
                height="430"
                allow="microphone;"
                src="https://console.dialogflow.com/api-client/demo/embedded/aee8bee0-0d74-46a3-8856-c3db0c2224c8"
              ></iframe>
            )}
            <button
              style={{
                height: "10%",
                width: "15vh",
                border: "none",
                position: "fixed",
                bottom: "2%",
                left: "2%",
              }}
              onClick={() => setCbot(!cbot)}
            >
              <img
                src="https://www.cio.com/wp-content/uploads/2021/12/chatbot_ai_machine-learning_emerging-tech-100778305-orig-1.jpg?quality=50&strip=all"
                style={{ height: "100%", width: "100%", borderRadius: "50%" }}
              />
            </button>
            <Link to="/farmer/viewexperts">
              <button
                style={{
                  height: "10%",
                  width: "15vh",
                  border: "none",
                  position: "fixed",
                  bottom: "2%",
                  right: "2%",
                }}
              >
                <img
                  src="https://www.northernhealth.ca/sites/northern_health/files/health-information/health-topics/vaccine/images/immunization-book-appointment.jpg"
                  style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
