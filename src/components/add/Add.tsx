import "./add.scss";

import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import axios from "axios";

interface Add {
  open: boolean;
  handleClose: () => void;
}

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,32}$/;
const usernameRegex = /^[a-zA-Z0-9_]{4,15}$/;

const Add: React.FC<Add> = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const validInputs = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPass === ""
    ) {
      alert("Empty input fields.");
      return false;
    }

    if (username.length > 15 || username.length < 4) {
      alert("Username length must be between 4 and 15.");
      return false;
    }

    if (!usernameRegex.test(username)) {
      alert(
        "Username can consist of only alphanumeric characters and underscores."
      );
      return false;
    }

    if (password.length > 32 || password.length < 7) {
      alert("Password length must be between 7 and 32.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 1 uppercase letter and one digit.");
      return false;
    }

    if (password !== confirmPass) {
      alert("Passwords must match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validInputs()) {
      return;
    }

    try {
      await axios.post(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/admins/signup`,
        { username: username, email: email, password: password }
      );
    } catch (e) {
      alert((e as any).response.data.message);
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPass("");

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modalContainer">
        <div className="modalContent">
          <div className="title-row">
            <Typography className="customTypography" variant="h5" gutterBottom>
              Register a new admin:
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="inputRow1">
            <TextField
              label="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ marginTop: "1%" }}
              label="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputRow2">
            <TextField
              label="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              style={{ marginTop: "1%", marginBottom: "2%" }}
              label="Confirm Password"
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Add;
