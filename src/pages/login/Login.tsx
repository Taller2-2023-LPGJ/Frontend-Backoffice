import { Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import "./login.scss";
import { useState } from "react";

export const Login = () => {

  const { login } = useAuth();
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")

  const handleLogin = () => {
    // valid inputs
    console.log("logging in...");
    if (mail === "" || pass === "") {
      alert("Empty input fields")
      return
    }
    login(mail,pass);
  };

  return (
    <div className="loginHbox">
      <div className="loginVbox">
        <Typography variant="h2" className="title">
          SnapMsg Admin
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="filled"
          className="input"
          onChange={(e)=>setMail(e.target.value)}
          style={{ marginBottom: "10px", marginTop: "15%" }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="filled"
          className="input"
          hidden
          onChange={(e)=>setPass(e.target.value)}
          style={{ marginBottom: "25px" }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
