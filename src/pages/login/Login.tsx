import { useAuth } from "../../context/AuthContext";
import "./login.scss";

export const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    console.log("logging in...");
    login();
  };

  return (
    <div className="login">
      <h1>Login page!</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
