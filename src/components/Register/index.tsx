import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./register.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerUrl = "https://qkp9pp4j67.execute-api.us-east-1.amazonaws.com/dev/register";
export const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')

    const handleLogin = (e:any) => {
        e.preventDefault();
        navigate('/login');
      }

    const handleSignUp = (e: any) => {
        e.preventDefault()
        console.log('in signUp')
        if(name.trim() === '' && email.trim() === '' && username.trim() === '' && password.trim() === ''){
            setError('All fields are required.')
            return;
        }
        setError('')
        const requestBody = {
            name: name,
            email:email,
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

        // const response = await fetch(registerUrl, {
        //     method: 'post',
        //     headers: {
        //         mode: 'no-cors',        
        //         "X-Api-Key": "XPi9gj7e2E6wCVHpgqHjj5ZPK0jVsOnJVQJaGK01",
        //         "Access-Control-Allow-Origin": '*',
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Methods": "POST",
        //         "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        //     },
        //     body: JSON.stringify(requestBody)
        // });

        // const data = await response.json();
        // console.log('data == ', data)
        axios.post(registerUrl, requestBody, registerConfig).then(res => {
            console.log('res == ', res)
            setError('Registration Successful')
        }).catch(error => {
            console.log('error', error.response)
            if(error.response?.status === 401){
                setError(error.response.data.message)
            }else{
                setError("sorry.... the backend slow")
            }
        })
    }
    return (
        <Box
            className="form"
            onSubmit={handleSignUp}
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
        >
        <div className="register-field">
            <label>Name:</label>
            <TextField id="outlined-basic" value={name} onChange={e=> setName(e.target.value)} className="text-field" variant="outlined" />
        </div>
        <div className="register-field">
            <label>email:</label>
            <TextField id="outlined-basic" value={email} onChange={e=> setEmail(e.target.value)} className="text-field" variant="outlined" />
        </div>
        <div className="register-field">
            <label>Username:</label>
            <TextField id="filled-basic" value={username} onChange={e=> setUsername(e.target.value)} className="text-field" variant="outlined" />
        </div>
        <div className="register-field">
            <label>Password:</label>
            <TextField id="standard-basic" value={password} onChange={e=> setPassword(e.target.value)} className="text-field" variant="outlined" />
        </div>
        <div className="register-field">
            <Button variant="contained" className="sign-upbtn" type="submit">Register</Button>
            <Button variant="outlined" onClick={handleLogin}>Login</Button>
        </div>
        {error && <div>{error}</div>}
        </Box>
    );
};
