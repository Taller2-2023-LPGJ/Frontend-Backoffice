import { Home } from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Users } from "./pages/users/Users";
import { Admins } from "./pages/admins/Admins";
import { Posts } from "./pages/posts/Posts";
import { Login } from "./pages/login/Login";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Menu } from "./components/menu/Menu";

import "./styles/global.scss"

function App() {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/users",
          element:<Users/>
        },
        {
          path:"/admins",
          element:<Admins/>
        },
        {
          path:"/posts",
          element:<Posts/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
