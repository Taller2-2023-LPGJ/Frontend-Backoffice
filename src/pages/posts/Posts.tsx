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
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import PostModal from "../../components/post_modal/PostModal";
import axios from "axios";

type PostInfo = {
  id: string;
  author: string;
  private: boolean;
  displayName: {
    displayName: string;
    picture: string;
    verified: boolean;
  };
  body: string;
  creationDate: string;
  editingDate: string | null;
  likes: string;
  shares: string;
  replies: string;
  tags: string[];
};

type Row = {
  post: PostInfo;
};

function createData(post: PostInfo) {
  return { post };
}

const MAX_ROWS = 8;

const emptyPost: PostInfo = {
  id: "",
  author: "",
  body: "",
  private: false,
  creationDate: "",
  editingDate: null,
  likes: "",
  tags: [""],
  displayName: {
    displayName: "",
    picture: "",
    verified: false,
  },
  shares: "",
  replies: "",
};

export const Posts = () => {
  const [usernameSearch, setUsernameSearch] = useState(""); 
  const [content, setContent] = useState(""); 
  const [isLoading, setisLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowPost, setSelectedRowPost] = useState(emptyPost);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRefresh = () => {
    setisLoading(true);
    handleEffect();
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRefresh();
    }
  };

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

  const handleEffect = async () => {
    try {
      const result = await axios.get(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/content/admin?author=${usernameSearch}&body=${content}`,
        {}
      );

      setTotalPages(Math.ceil(result.data.totalcount / MAX_ROWS));
      const posts = result.data;
      let newRows: Row[] = [];
      newRows = posts.map((post: PostInfo) => {
        return createData(post);
      });
      setRows(newRows);
      setisLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    handleEffect();
  }, [currentPage]);

  const emptyRow = [createData(emptyPost)];
  const [rows, setRows] = useState<Row[]>(emptyRow);

  return (
    <div className="posts">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Posts</h1>
      </div>
      <div className="searchBar">
        <TextField
          onChange={(e) => setUsernameSearch(e.target.value)}
          onKeyDown={handleEnter}
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
          onKeyDown={handleEnter}
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
            onClick={handleRefresh}
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
                    onClick={() => handleRowClick(row.post)}
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
