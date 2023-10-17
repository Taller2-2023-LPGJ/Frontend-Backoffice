import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import "./login.scss";
import { useState } from "react";

export const Login = () => {
  const { login } = useAuth();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // valid inputs
    if (mail === "" || pass === "") {
      alert("Empty input fields");
      return;
    }
    setIsLoading(true);
    const result = await login(mail, pass);

    if (result && result.error) {
      setIsLoading(false);
      alert(result.message);
      return;
    } else {
      setIsLoading(false);
      // console.log("Logged in")
      return;
    }
  };

  return (
    <div className="loginHbox">
      {isLoading ? (
        <CircularProgress
          color="primary"
        />
      ) : (
        <div className="loginVbox">
          <Typography variant="h2" className="title">
            SnapMsg Admin
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="input"
            onChange={(e) => setMail(e.target.value)}
            style={{ marginBottom: "10px", marginTop: "15%" }}
          />
          <TextField
            id="outlined-basic2"
            label="Password"
            type="password"
            variant="outlined"
            className="input"
            hidden
            required
            onChange={(e) => setPass(e.target.value)}
            style={{ marginBottom: "25px" }}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};
