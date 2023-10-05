import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Posts } from "../pages/posts/Posts";
import { Admins } from "../pages/admins/Admins";
import { Users } from "../pages/users/Users";
import { Home } from "../pages/home/Home";
import { Navbar } from "../components/navbar/Navbar";
import { Menu } from "../components/menu/Menu";
import { Footer } from "../components/footer/Footer";
import { Login } from "../pages/login/Login";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

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

  const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    }
  ]);

  return isAuthenticated ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}
