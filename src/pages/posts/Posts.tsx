import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type PostInfo = {
  id: string;
  author: string;
  private: boolean;
  displayName: string;
  picture: string;
  verified: boolean;
  body: string;
  creationDate: string;
  editingDate: string | null;
  likes: string;
  shares: string;
  replies: string;
  tags: string[];
  blocked: boolean;
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
  displayName: "",
  picture: "",
  verified: false,
  shares: "",
  replies: "",
  blocked: false,
};

export const Posts = () => {
  const [usernameSearch, setUsernameSearch] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRowPost, setSelectedRowPost] = useState(emptyPost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleRefresh = () => {
    setCurrentPage(0);
    setisLoading(true);
    handleEffect();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedID("");
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRefresh();
    }
  };

  const [selectedID, setSelectedID] = useState("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedID(id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowPost(emptyPost);
    setIsModalOpen(false);
  };

  const handleAction = async (id: string, action: boolean) => {
    try {
      await axios.put(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/content/admin/${id}`,
        { blocked: action }
      );
      handleClose();
      setisLoading(true);
      handleEffect();
    } catch (e) {
      alert((e as any).response.data.message);
      handleClose();
    }
  };

  const handleRowClick = (post: PostInfo) => {
    setSelectedRowPost(post);
    handleOpenModal();
  };

  const handleEffect = async () => {
    try {
      console.log(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/content/admin?page=${currentPage}&size=${MAX_ROWS}&author=${usernameSearch}&body=${content}`
      );
      const result = await axios.get(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/content/admin?page=${currentPage}&size=${MAX_ROWS}&author=${usernameSearch}&body=${content}`,
        {}
      );

      const posts = result.data.posts;
      console.log(posts);
      console.log(result.data.count);
      console.log(Math.ceil(result.data.count / MAX_ROWS));
      setTotalPages(Math.ceil(result.data.count / MAX_ROWS));

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
                    style={{
                      fontWeight: "bolder",
                      backgroundColor: "#222b3c",
                      width: 200,
                      minWidth: 200,
                    }}
                  >
                    Post Id
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      backgroundColor: "#222b3c",
                      width: 200,
                      minWidth: 200,
                    }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      backgroundColor: "#222b3c",
                      width: 600,
                      minWidth: 600,
                    }}
                    align="left"
                  >
                    Post
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="right"
                  >
                    Blocked
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.post.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.post.id} </TableCell>
                    <TableCell component="th" scope="row">
                      {row.post.author}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="clickable-row"
                      onClick={() => handleRowClick(row.post)}
                    >
                      {row.post.body.length > 50
                        ? `${row.post.body.substring(0, 50)}...`
                        : row.post.body}
                    </TableCell>
                    <TableCell align="right">
                      {row.post.blocked ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => handleClick(e, row.post.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={
                          Boolean(anchorEl) &&
                          selectedID === row.post.id
                        }
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => handleAction(row.post.id, true)}
                        >
                          Block
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleAction(row.post.id, false)}
                        >
                          Unblock
                        </MenuItem>
                      </Menu>
                    </TableCell>
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
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                variant="outlined"
                style={{ margin: "3px" }}
                key={index}
                onClick={() => setCurrentPage(index + 1 - 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
