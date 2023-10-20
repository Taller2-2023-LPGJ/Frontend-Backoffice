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
  email: string;
  status: string;
}

type UserInfo = {
  // profile picture?
  username: string;
  displayName: string;
  location: string;
  biography: string;
  dateOfBirth: string;
};

// TODO: fetch pp from profile
const default_pp =
  "https://firebasestorage.googleapis.com/v0/b/snapmsg-399802.appspot.com/o/default_avatar.png?alt=media&token=2f003c2c-19ca-491c-b6b1-a08154231245";

const UserModal: React.FC<UserModalProps> = ({
  open,
  username,
  onClose,
  email,
  status,
}) => {
  const userSkeleton = {
    username: "",
    displayName: "",
    location: "",
    biography: "",
    dateOfBirth: "",
    // following, followers, profilePic
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(userSkeleton);
  const [isLoading, setIsLoading] = useState(true);

  // Usar este state para manejar la carga de la imagen
  const [imageLoading, setImageLoading] = useState(false);

  const handleEffect = async () => {

    try {
      const result = await axios.get(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/profile/${username}`,
        {}
      );

      setUserInfo(result.data);
      setIsLoading(false);
    } catch (e) {
      //alert((e as any).response.data.message);
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
              {imageLoading ? (
                <CircularProgress
                  style={{ width: "100%", height: "100%" }}
                  color="primary"
                />
              ) : (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={default_pp}
                />
              )}

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
                  <span className="label">Email: </span>
                  <span className="label-info">{email}</span>
                </Typography>
                <Typography variant="h5" className="infoHeader">
                  <span className="label">Status: </span>
                  <span className="label-info">{status}</span>
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
