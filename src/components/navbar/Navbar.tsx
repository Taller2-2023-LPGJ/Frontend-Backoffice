import React from "react";
import "./navbar.scss";
import { useAuth } from "../../context/AuthContext";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const {user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="logo" onClick={()=>navigate("/")}>
        <img src="logo.svg" alt="" />
        <span>SnapMsg Admin</span>
      </div>
      <div className="icons">
        <span>Logged in as: {user?.mail}</span>
        <span>|</span>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};
