import "./admins.scss";

import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Add from "../../components/add/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

const MAX_ROWS = 8;

type Admin = {
  username: string;
  email: string;
};

type Row = {
  username: string;
  email: string;
};

function createData(username: string, email: string) {
  return { username, email };
}

export const Admins = () => {
  const [isLoading, setisLoading] = useState(true);
  const emptyRow = [createData("", "")];
  const [rows, setRows] = useState<Row[]>(emptyRow);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    handleRefresh();
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    setisLoading(true);
    handleEffect();
  };

  const handleEffect = async () => {
    try {
      const result = await axios.get(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/admins`,
        {}
      );

      setTotalPages(Math.ceil(result.data.totalcount / MAX_ROWS));
      const admins = result.data.paginateData;
      let newRows: Row[] = [];
      admins.map((admin: Admin) => {
        const newRow = createData(admin.username, admin.email);
        newRows = [...newRows, newRow];
      });
      setRows(newRows);
      setisLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    handleEffect();
  }, [currentPage]);

  return (
    <div className="users">
      <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage admins</h1>
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
          <div className="button-row">
            <Button
              style={{ marginBottom: "1%", width: "8%" }}
              variant="contained"
              onClick={handleOpenModal}
              endIcon={<PersonAddAlt1Icon />}
            >
              Add
            </Button>
            <Button
              style={{ marginBottom: "1%", width: "8%", marginLeft: "1%" }}
              variant="contained"
              onClick={handleRefresh}
              endIcon={<RefreshIcon />}
            >
              Refresh
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="left">Email</TableCell>
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
          <Add open={isModalOpen} handleClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};
