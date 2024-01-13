import React, { useState } from "react";
import "../Login/Login.css";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    const { user } = await res.json();

    if (res.status == 200) {
      setForm({
        email: "",
        password: "",
      });
      toast.success(`Welcome ! ${user.name}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => navigate("/"), 700);
    } else {
      toast.error("Wrong password/email", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Let Connect
        </Typography>
        <input
          type="email"
          placeholder=" email"
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder=" password"
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          required
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
        <Link to="/register">
          <Typography>new User?</Typography>
        </Link>
      </form>
    </div>
  );
}

export default Login;
