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
import SearchIcon from "@mui/icons-material/Search";
import "./users.scss";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

const MAX_ROWS = 8;

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

  const handleEffect = async () => {
    try {
      const result = await axios.get(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/users?amountperpage=${MAX_ROWS}&currentpage=1`,
        {}
      );

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
    } catch (e) {
    }
  };

  useEffect(() => {
    handleEffect();
  }, []);

  const [inputSearch, setInputSearch] = useState("");
  const [email, setEmail] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isLoading, setisLoading] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    // if is empty --> nada
    alert(`Filtering username: ${inputSearch} and email: ${email}`);
  };
  return (
    <div className="users">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Users</h1>
        <div className="searchBar">
          <TextField
            onChange={(e) => setInputSearch(e.target.value)}
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
          <div className="refresh">
            <Button
              sx={{ width: "50px", height: "50px" }}
              onClick={handleRefresh}
              color="primary"
              size="large"
              startIcon={<RefreshIcon />}
            ></Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"50vh"}}>
          <CircularProgress color="primary" />
        </div>
      ) : (
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
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Block</MenuItem>
                      <MenuItem onClick={handleClose}>Unblock</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
