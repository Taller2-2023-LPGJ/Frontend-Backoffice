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
import UserModal from "../../components/user_modal/UserModal";
import Tooltip from "@mui/material/Tooltip";

const MAX_ROWS = 8;

type User = {
  username: string;
  email: string;
  isBlocked: boolean;
  verified: string;
};

type Row = {
  username: string;
  email: string;
  status: string;
  verified: string;
};

function createData(
  username: string,
  email: string,
  status: string,
  verified: string
) {
  return { username, email, status, verified };
}

export const Users = () => {
  const emptyRow = [createData("", "", "", "")];
  const [rows, setRows] = useState<Row[]>(emptyRow);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEffect = async () => {
    try {
      const result = await axios.get(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/users?email=${email}&username=${inputSearch}&amountperpage=${MAX_ROWS}&isBlocked=${statusFilter}&currentpage=${currentPage}&verified=${verifiedFilter}`,
        {}
      );

      setTotalPages(Math.ceil(result.data.totalcount / MAX_ROWS));
      const users = result.data.paginateData;
      let newRows: Row[] = [];
      newRows = users.map((user: User) => {
        return createData(
          user.username,
          user.email,
          user.isBlocked ? "Blocked" : "Unblocked",
          user.verified
        );
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
      await axios.post(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/users/admins/blockuser`,
        { user: username }
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
      await axios.post(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/users/admins/unlockuser`,
        { user: username }
      );
      handleClose();
      setisLoading(true);
      handleEffect();
    } catch (e) {
      alert((e as any).response.data.message);
      handleClose();
    }
  };

  const handleVerify = async (username: string) => {
    try {
      await axios.post(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/users/admins/verifyuser`,
        { user: username, action: "Yes" }
      );
      handleClose();
      setisLoading(true);
      handleEffect();
    } catch (e) {
      alert((e as any).response.data.message);
      handleClose();
    }
  };

  const handleRejectVerify = async (username: string) => {
    try {
      await axios.post(
        `https://t2-gateway-snap-msg-auth-gateway-julianquino.cloud.okteto.net/users/admins/verifyuser`,
        { user: username, action: "No" }
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

  const handleRowClick = (username: string, email: string, status: string) => {
    setSelectedRowUsername(username);
    setSelectedRowEmail(email);
    setSelectedRowStatus(status);
    handleOpenModal();
  };

  const [statusFilter, setStatusFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };

  const handleChangeVerifiedFilter = (event: SelectChangeEvent) => {
    setVerifiedFilter(event.target.value as string);
  };

  const [selectedUsername, setSelectedUsername] = useState("");

  const [selectedRowUsername, setSelectedRowUsername] = useState("");
  const [selectedRowEmail, setSelectedRowEmail] = useState("");
  const [selectedRowStatus, setSelectedRowStatus] = useState("");

  const closeModal = () => {
    setSelectedRowUsername("");
    setIsModalOpen(false);
  };

  return (
    <div className="users">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Users</h1>
      </div>
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
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"false"}>Unblocked</MenuItem>
            <MenuItem value={"true"}>Blocked</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ marginLeft: "10px", width: "20%" }}>
          <InputLabel>Verification</InputLabel>
          <Select
            value={verifiedFilter}
            label="All"
            onChange={handleChangeVerifiedFilter}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Yes"}>Verified</MenuItem>
            <MenuItem value={"No"}>Unverified</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
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
                    Username
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="left"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="left"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", backgroundColor: "#222b3c" }}
                    align="left"
                  >
                    Verified
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
                  <TableRow key={row.username}>
                    <TableCell
                      className="clickable-row"
                      onClick={() =>
                        handleRowClick(row.username, row.email, row.status)
                      }
                      component="th"
                      scope="row"
                    >
                      <Tooltip title="View user profile" placement="top">
                        <span className="tooltip-hover">{row.username}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.verified}</TableCell>
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
                        <MenuItem onClick={() => handleVerify(row.username)}>
                          Accept Verification
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleRejectVerify(row.username)}
                        >
                          Reject Verification
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <UserModal
            open={isModalOpen}
            username={selectedRowUsername}
            onClose={closeModal}
            email={selectedRowEmail}
            status={selectedRowStatus}
          />
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
