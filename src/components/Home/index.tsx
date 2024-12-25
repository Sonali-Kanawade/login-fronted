import React from "react"
import { getUser, resetUserSession } from "../../service"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const user = getUser();
    const navigate = useNavigate()
    const handleLogout = (e:any) => {
        e.preventDefault();
        resetUserSession();
        navigate('/login')
    }   
    return (<div>{user && <p>Welcome {user.username}</p> }
        <Button onClick={handleLogout}>Log out</Button>
        </div>)
}