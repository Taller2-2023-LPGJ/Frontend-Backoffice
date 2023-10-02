import React from "react";
import "./navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>SnapMsg Admin</span>
      </div>
      <div className="icons">
        <span>Logged in as: admin@admin.com</span>
        <img src="gear.svg" alt="" />
      </div>
    </div>
  );
};
