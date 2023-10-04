import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Menu } from "../components/menu/Menu";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Home } from "../pages/home/Home";
import { Users } from "../pages/users/Users";
import { Admins } from "../pages/admins/Admins";
import { Posts } from "../pages/posts/Posts";
import { Login } from "../pages/login/Login";

export default function PublicRouter() {
    
  const publicRouter = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return publicRouter;
}
