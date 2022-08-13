import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    axios({
      url: "/api/auth/login",
      method: "POST",
      data: { phone: phone },
    })
      .then((res) => {
        if (res.data.success) {
          navigate(`/api/auth/verifyLogin/${phone}`);
          setPhone("");
          console.log("Data submitted");
        }
      })
      .catch((e) => {
        console.log("Internal Server error");
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
            type="submit"
          >
            Login
          </button>
        </form>
        <br />
        <h7>
          <Link to="/api/auth/register">Don't have an account(Register)</Link>
        </h7>
      </div>
    </div>
  );
};

export default Login;
