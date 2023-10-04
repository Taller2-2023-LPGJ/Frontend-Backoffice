import React from "react";
import "./navbar.scss";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {

  const { logout } = useAuth();

  const handleLogout = () => {

    // popup confirm logout?
    console.log("logging out...")
    logout()

  }

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>SnapMsg Admin</span>
      </div>
      <div className="icons">
        <span>Logged in as: admin@admin.com</span>
        <span>|</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
