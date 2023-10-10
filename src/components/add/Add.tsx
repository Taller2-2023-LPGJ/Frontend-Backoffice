import "./add.scss";

import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

interface Add {
  open: boolean;
  handleClose: () => void;
}

const Add: React.FC<Add> = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = () => {

    // Valid inputs (regex) --> alert (igual al register de usuarios)
    // axios post username, email, pass

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
            <Typography  className="customTypography" variant="h5" gutterBottom>
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
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ marginTop: "1%" }}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputRow2">
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              style={{ marginTop: "1%", marginBottom: "2%" }}
              label="Confirm Password"
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
