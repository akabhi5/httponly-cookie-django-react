import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/`, data, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onLoginCheck = async (event) => {
    try {
      const res = await axios.get(`http://localhost:8000/`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async (event) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/logout/`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        Email: <input type="text" onChange={handleChange} name="email" /> <br />
        Password:{" "}
        <input type="password" onChange={handleChange} name="password" /> <br />
        <input type="submit" value="Submit" />
      </form>
      {JSON.stringify(data)}
      <br />
      <button onClick={onLoginCheck}>LoginCheck</button>
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default App;
