import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Menu } from "../components/menu/Menu";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Home } from "../pages/home/Home";
import { Users } from "../pages/users/Users";
import { Admins } from "../pages/admins/Admins";
import { Posts } from "../pages/posts/Posts";

export default function PrivateRouter() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const privateRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/admins",
          element: <Admins />,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
      ],
    },
  ]);

  return privateRouter
}
