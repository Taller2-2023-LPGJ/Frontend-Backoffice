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
      <div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30vh",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="modal-content">
            <div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <IconButton className="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>

              <div className="infoContainer">
                <Typography variant="h5" className="infoHeader">
                  <span className="label">Username: </span>
                  <span className="label-info">{userInfo.username}</span>
                </Typography>
                <Typography variant="h5" className="infoHeader">
                  <span className="label">Display Name: </span>
                  <span className="label-info">{userInfo.displayName}</span>
                </Typography>
                <Typography variant="h5" className="infoHeader">
                  <span className="label">Location: </span>
                  <span className="label-info">{userInfo.location}</span>
                </Typography>
                <Typography variant="h5" className="infoHeader">
                  <span className="label">Bio: </span>
                  <span className="label-info">{userInfo.biography}</span>
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserModal;
