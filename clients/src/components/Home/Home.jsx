import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, Typography } from "@mui/material";
import Record from "../Record/Record";
const Home = () => {
  const [query, setQuery] = useState("");
  const [user1, setUser1] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/api/v1/user/getAll/${query}`,
      {
        method: "GET",
      }
    );
    const { user } = await res.json();
    setUser1(user);
  };
  const allUser = async () => {
    const res = await fetch("http://localhost:8000/api/v1/user/all");
    const { user } = await res.json();
    setUser1(user);
  };
  useEffect(() => {
    allUser();
    return () => {};
  }, []);
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h4">Search user</Typography>

        <input
          type="text"
          placeholder="Enter Search Name"
          required
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
        <div className="searchResults">
          <Record data={user1} />
        </div>
      </form>
    </div>
  );
};

export default Home;
