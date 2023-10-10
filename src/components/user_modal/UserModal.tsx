import "./usermodal.scss";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";

interface UserModalProps {
  open: boolean;
  username: string;
  onClose: () => void;
}

type UserInfo = {
  // profile picture?
  username: string;
  displayName: string;
  location: string;
  biography: string;
  dateOfBirth: string;
};

const UserModal: React.FC<UserModalProps> = ({ open, username, onClose }) => {
  const userSkeleton = {
    username: "",
    displayName: "",
    location: "",
    biography: "",
    dateOfBirth: "",
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(userSkeleton);
  const [isLoading, setIsLoading] = useState(true);

  const handleEffect = async () => {
    try {
      const result = await axios.get(
        `https://t2-profile-snap-msg-auth-profile-julianquino.cloud.okteto.net/${username}`,
        {}
      );
      setUserInfo(result.data);
      setIsLoading(false);
    } catch (e) {
      alert((e as any).response.data.message);
    }
  };

  const handleClose = () => {
    setIsLoading(true);
    onClose();
  };

  useEffect(() => {
    if (username === "") {
      return;
    }

    handleEffect();
  }, [username]);

  return (
    <Modal className="modal" open={open} onClose={onClose}>
      <div className="modal-content">
        <IconButton className="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="infoContainer">
            <Typography variant="h5" className="infoHeader">
              Username: {userInfo.username}
            </Typography>
            <Typography variant="h5" className="infoHeader">
              Display Name: {userInfo.displayName}
            </Typography>
            <Typography variant="h5" className="infoHeader">
              Location: {userInfo.location}
            </Typography>
            <Typography variant="h5" className="infoHeader">
              Biography: {userInfo.biography}
            </Typography>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserModal;
