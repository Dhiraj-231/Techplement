import React, { useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [form, setForm] = useState({
    name: "",
    age: undefined,
    email: "",
    password: "",
    image: null,
  });
  const navigate=useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status == 200) {
      setForm({
        name: "",
        age: "",
        email: "",
        password: "",
        image: null,
      });
      toast.success("Register successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => navigate("/login"), 700);
    } else {
      toast.error("Something went wrong...", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setForm({ ...form, image: Reader.result });
      }
    };
    Reader.readAsDataURL(file);
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h4">Sign Up</Typography>
        <Avatar
          src={form.image}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="registerFormInput"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Your Age"
          className="registerFormInput"
          required
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="registerFormInput"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="registerFormInput"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Link to="/">
          <Typography style={{ color: "black" }}>
            Already have an account? sign in
          </Typography>
        </Link>
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Register;
