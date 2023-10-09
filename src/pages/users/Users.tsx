import { InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./users.scss";
import { useState } from "react";

function createData(
  username: string,
  email: string,
  status: string,
  action: string,
) {
  return { username, email, status, action};
}

const rows = [
  createData('lucas123', "lucasgrati@gmail.com", "Unblocked", "..."),
  createData('lucas123', "lucasgrati@gmail.com", "Unblocked", "..."),
  createData('lucas123', "lucasgrati@gmail.com", "Unblocked", "..."),
  createData('lucas123', "lucasgrati@gmail.com", "Unblocked", "..."),
  createData('lucas123', "lucasgrati@gmail.com", "Unblocked", "..."),

];


export const Users = () => {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <div className="users">
      <div style={{marginBottom:"1%"}}>
        <h1 className="title">Manage users</h1>
        <TextField
          onChange={(e) => setInputSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
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
            <TableRow
              key={row.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="center">{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
