import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { setUserSession } from "../../service";
import { useNavigate } from "react-router-dom";
const loginUrl = "https://qkp9pp4j67.execute-api.us-east-1.amazonaws.com/dev/login";
export const Login = (props:any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSignup = (e:any) => {
    e.preventDefault();
    navigate('/register')
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('login');

    if(username.trim() === '' && password.trim() === ''){
      setError("All fields are required.");
      return
    }
    setError('')
    const requestBody = {
      username: username,
      password:password
  }

  const registerConfig = {
    headers: {
      mode: "no-cors",
      "X-Api-Key": "XPi9gj7e2E6wCVHpgqHjj5ZPK0jVsOnJVQJaGK01",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "POST",
    },
  };

    axios.post(loginUrl,requestBody, registerConfig).then(res => {
        console.log('res == ', res);
        setUserSession(res.data.user, res.data.token)
        navigate('/')
    }).catch(error => {
      console.log('error', error.response)
      if(error.response?.status === 401 || error.response?.status === 403){
          setError(error.response.data.message)
      }else{
          setError("sorry.... the server is down")
      }
    })
  }
  return (
    <Box
      className="form"
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <div className="register-field">
        <label>Username:</label>
        <TextField
          id="filled-basic"
          value={username}
          className="text-field"
          onChange={e => setUsername(e.target.value)}
          variant="outlined"
        />
      </div>
      <div className="register-field">
        <label>Password:</label>
        <TextField
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="standard-basic"
          className="text-field"
          variant="outlined"
        />
      </div>
      <div className="register-field">
        <Button variant="contained" className="sign-upbtn" type="submit">
          Login
        </Button>
        <Button variant="outlined" onClick={handleSignup}>Sign up</Button>
      </div>
      {error && <div>{error}</div>}
    </Box>
  );
};
