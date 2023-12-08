import React from "react";
import "./menu.scss";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from '@mui/icons-material/BarChart';

export const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <Link to="/" className="listItem">
          <HomeIcon fontSize="medium" />
          <span className="listItemTitle">Home</span>
        </Link>
        <Link to="/users" className="listItem">
          <GroupIcon fontSize="medium" />
          <span className="listItemTitle">Users</span>
        </Link>
        <Link to="/posts" className="listItem">
          <ArticleIcon fontSize="medium" />
          <span className="listItemTitle">Posts</span>
        </Link>
        <Link to="/admins" className="listItem">
          <ManageAccountsIcon fontSize="medium" />
          <span className="listItemTitle">Admins</span>
        </Link>
        <Link to="/user_metrics" className="listItem">
          <BarChartIcon fontSize="medium" />
          <span className="listItemTitle">User Analytics</span>
        </Link>
      </div>
    </div>
  );
};
