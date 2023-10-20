import { Button, InputAdornment, TextField } from "@mui/material";
import "./posts.scss";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface PostCardProps {
  post: {
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
}

const default_pp_url =
  "https://firebasestorage.googleapis.com/v0/b/snapmsg-399802.appspot.com/o/default_avatar.png?alt=media&token=2f003c2c-19ca-491c-b6b1-a08154231245";

const dummyPost = {
  id: "7",
  author: "gstfrenkel",
  body: "hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola!",
  creationDate: "2023-10-14",
  editingDate: "2023-10-14",
  likes: "2",
  tags: ["Travel", "Sports"],
  displayName: "gstfrenkel",
  postImage: default_pp_url,
};

// main card
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card style={{ marginBottom: "10px" }}>
      <CardHeader
        avatar={
          <Avatar
            style={{ display: "inline-block", width: "40px", height: "40px" }}
          >
            <img
              src={default_pp_url}
              alt={`Avatar for ${post.author}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Avatar>
        }
        title={`@${post.author}`}
        subheader={post.displayName}
      />
      <CardContent>
        <Typography variant="body1">{`${post.body}`}</Typography>
      </CardContent>
    </Card>
  );
};

export const Posts = () => {
  const [usernameSearch, setUsernameSearch] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="posts">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Posts</h1>
      </div>
      <div className="searchBar">
        <TextField
          onChange={(e) => setUsernameSearch(e.target.value)}
          onKeyDown={() => console.log("a")} // si apreta enter...(handleKeyDown)
          label="Username"
          style={{ width: "20%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={() => console.log("a")} // si apreta enter...(handleKeyDown)
          label="Content"
          style={{ marginLeft: "10px", width: "20%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <div className="refresh">
          <Button
            sx={{ width: "50px", height: "50px" }}
            onClick={() => console.log("a")} // handle refresh
            color="info"
            size="large"
            startIcon={<RefreshIcon />}
          ></Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "90%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
            <div style={{ width: "30%" }}>
              <PostCard post={dummyPost} />
            </div>
          </div>
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: 5 }).map((_, index) => (
          <Button
            variant="outlined"
            style={{ margin: "3px" }}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
