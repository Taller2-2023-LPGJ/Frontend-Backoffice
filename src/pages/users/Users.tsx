import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./users.scss";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

const MAX_ROWS = 5;

type User = {
  username: string;
  email: string;
  isBlocked: boolean;
};

type Row = {
  username: string;
  email: string;
  status: string;
};

function createData(username: string, email: string, status: string) {
  return { username, email, status };
}

export const Users = () => {
  const emptyRow = [createData("", "", "")];
  const [rows, setRows] = useState<Row[]>(emptyRow);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEffect = async () => {
    if (statusFilter === "all") {
      setStatusFilter("");
    }

    try {
      const result = await axios.get(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/users?email=${email}&username=${inputSearch}&amountperpage=${MAX_ROWS}&isBlocked=${statusFilter}&currentpage=${currentPage}`,
        {}
      );

      setTotalPages(Math.ceil(result.data.totalcount / MAX_ROWS));
      const users = result.data.paginateData;
      let newRows: Row[] = [];
      users.map((user: User) => {
        const newRow = createData(
          user.username,
          user.email,
          user.isBlocked ? "Blocked" : "Unblocked"
        );
        newRows = [...newRows, newRow];
      });
      setRows(newRows);
      setisLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    handleEffect();
  }, [currentPage]);

  const [inputSearch, setInputSearch] = useState("");
  const [email, setEmail] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isLoading, setisLoading] = useState(true);

  const handleBlock = async (username: string) => {
    try {
      const result = await axios.post(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/admins/blockuser`,
        { username: username }
      );
      handleClose();
      setisLoading(true);
      handleEffect();
    } catch (e) {
      alert((e as any).response.data.message);
      handleClose();
    }
  };

  const handleUnblock = async (username: string) => {
    try {
      const result = await axios.post(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/admins/unlockuser`,
        { username: username }
      );
      handleClose();
      setisLoading(true);
      handleEffect();
    } catch (e) {
      alert((e as any).response.data.message);
      handleClose();
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    username: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUsername(username);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUsername("");
  };

  const handleRefresh = () => {
    setisLoading(true);
    handleEffect();
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRefresh();
    }
  };

  const [statusFilter, setStatusFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };

  const [selectedUsername, setSelectedUsername] = useState("");

  return (
    <div className="users">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Users</h1>
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
          <div className="searchBar">
            <TextField
              onChange={(e) => setInputSearch(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEnter}
              label="Email"
              style={{ marginLeft: "10px", width: "20%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl style={{ marginLeft: "10px", width: "20%" }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="All" onChange={handleChange}>
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"false"}>Unblocked</MenuItem>
                <MenuItem value={"true"}>Blocked</MenuItem>
              </Select>
            </FormControl>

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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleClick(e, row.username)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={
                          Boolean(anchorEl) && selectedUsername === row.username
                        }
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleBlock(row.username)}>
                          Block
                        </MenuItem>
                        <MenuItem onClick={() => handleUnblock(row.username)}>
                          Unblock
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
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
      )}
    </div>
  );
};
