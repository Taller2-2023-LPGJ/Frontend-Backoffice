import {
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "./posts.scss";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import PostModal from "../../components/post_modal/PostModal";

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
}


type Row = {
  post: PostInfo
};

function createData(post:PostInfo) {
  return { post };
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
const dummyPost2 = {
  id: "72",
  author: "fafa",
  body: "fafafa",
  creationDate: "2023-10-14",
  editingDate: "2023-10-14",
  likes: "2",
  tags: ["Travel", "Sports"],
  displayName: "gstfrenkel",
  postImage: null
};

const emptyPost : PostInfo = {
  id: "",
  author: "",
  body: "",
  creationDate: "",
  editingDate: null,
  likes: "",
  tags: [""],
  displayName: "",
  postImage: null,
};


export const Posts = () => {

  const [usernameSearch, setUsernameSearch] = useState(""); // search filter
  const [content, setContent] = useState(""); // search filter
  const [isLoading, setisLoading] = useState(false); 
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowPost, setSelectedRowPost] = useState(emptyPost);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowPost(emptyPost);
    setIsModalOpen(false);
  };


  const handleRowClick = (post: PostInfo) => {
    setSelectedRowPost(post);
    handleOpenModal();
  };

  
  //const [rows, setRows] = useState<Row[]>(emptyRow);
  const dummy_row = [
    createData(dummyPost),
    createData(dummyPost2)
  ];
  const [rows, setRows] = useState<Row[]>(dummy_row);

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
            onClick={() => console.log("a")} // handle refresh (fetch data handle effect)
            color="info"
            size="large"
            startIcon={<RefreshIcon />}
          ></Button>
        </div>
      </div>

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
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                  >
                    Post Id
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="left"
                  >
                    Post
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    className="clickable-row"
                    key={row.post.id}
                    onClick={() =>
                      handleRowClick(row.post)
                    }
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.post.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.post.author}
                    </TableCell>
                    <TableCell align="left">{row.post.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PostModal
            open={isModalOpen}
            post={selectedRowPost}
            onClose={closeModal}
          />
          <div className="pagination">
            {Array.from({ length: totalPages /*!!!!!! fix*/ }).map(
              (_, index) => (
                <Button
                  variant="outlined"
                  style={{ margin: "3px" }}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
