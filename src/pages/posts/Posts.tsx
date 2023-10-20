import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import "./posts.scss"
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Posts = () => {

  const [inputSearch, setInputSearch] = useState("");
  const [email, setEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setisLoading] = useState(true);

  
  return (
    <div className="posts">
        <div style={{ marginBottom: "1%" }}>
        <h1 className="title">Manage Posts</h1>
      </div>
      <div className="searchBar">
        <TextField
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={()=> console.log("a")}
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
          onKeyDown={()=> console.log("a")}
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
          <Select value={"a"} label="All" onChange={()=> console.log("a")}>
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"false"}>Unblocked</MenuItem>
            <MenuItem value={"true"}>Blocked</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ marginLeft: "10px", width: "20%" }}>
          <InputLabel>Verification</InputLabel>
          <Select
            value={"a"}
            label="All"
            onChange={()=> console.log("a")}
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
            onClick={()=> console.log("a")}
            color="info"
            size="large"
            startIcon={<RefreshIcon />}
          ></Button>
        </div>
      </div>



    </div>
  )
}
