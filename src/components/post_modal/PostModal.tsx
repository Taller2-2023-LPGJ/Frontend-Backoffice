import { CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./postmodal.scss";

interface PostModalProps {
  open: boolean;
  post: PostInfo;
  onClose: () => void;
}

type PostInfo = {
  id: string;
  author: string;
  displayName: string;
  body: string;
  creationDate: string;
  editingDate: string | null;
  likes: string;
  tags: string[];
  postImage: string | null;
};

const PostModal: React.FC<PostModalProps> = ({ open, post, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal className="modal" open={open} onClose={onClose}>
      <div className="post-modal-content">
        <div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <IconButton className="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="infoContainer">
            <Typography variant="h5" className="infoHeader">
              <span className="label">Post Id: </span>
              <span className="label-info">{post.id}</span>
            </Typography>
            <Typography variant="h5" className="infoHeader">
              <span className="label">Author's Username: </span>
              <span className="label-info">{post.author}</span>
            </Typography>
            <Typography variant="h5" className="infoHeader">
              <span className="label">Author's Display Name: </span>
              <span className="label-info">{post.displayName}</span>
            </Typography>

            <Typography variant="h5" className="infoHeader">
              <span className="label">
                Post Body:
                <br />
              </span>
              <span className="label-info">{post.body}</span>
            </Typography>

            {post.postImage ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ width: "50%", height: "50%" }}
                  src={post.postImage}
                />
              </div>
            ) : (
              <div></div>
            )}
            <br />
            <Typography variant="h5" className="infoHeader">
              <span className="label">Creation Date: </span>
              <span className="label-info">{post.creationDate}</span>
            </Typography>

            {post.editingDate ? (
              <Typography variant="h5" className="infoHeader">
                <span className="label">Editing Date: </span>
                <span className="label-info">{post.editingDate}</span>
              </Typography>
            ) : (
              <div></div>
            )}

            <Typography variant="h5" className="infoHeader">
              <span className="label">Likes: </span>
              <span className="label-info">{post.likes}</span>
            </Typography>

            {post.tags.length ? (
              <Typography variant="h5" className="infoHeader">
                <span className="label">Tags: </span>
                <span className="label-info">{post.tags.join(", ")}</span>
              </Typography>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="modal-backdrop" onClick={handleClose}></div>
      </div>
    </Modal>
  );
};

export default PostModal;
