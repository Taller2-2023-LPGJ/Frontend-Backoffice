import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const usersCard = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 18 }}
        style={{ marginRight: "1%" }}
        color="text.secondary"
        gutterBottom
      >
        Users
      </Typography>

      <Typography variant="body2">
        • View users list.
        <br />
        • View user profile.
        <br />• Block/Unblock user.
        <br />• Verify user.
      </Typography>
    </CardContent>
  </React.Fragment>
);

const postsCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Posts
      </Typography>
      <Typography variant="body2">
        • View posts list.
        <br />• View post information.
      </Typography>
    </CardContent>
  </React.Fragment>
);

const adminsCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Admins
      </Typography>
      <Typography variant="body2">
        • View admins list.
        <br />• Register a new admin.
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  const navigate = useNavigate();

  return (
    <div className="cardContainer">
      <div onClick={() => navigate("/users")}>
        <Card className="card" style={{ marginBottom: "1%" }}>
          {usersCard}
        </Card>
      </div>
      <div onClick={() => navigate("/posts")}>
        <Card className="card" style={{ marginBottom: "1%" }}>
          {postsCard}
        </Card>
      </div>
      <div onClick={() => navigate("/admins")}>
        <Card className="card">{adminsCard}</Card>
      </div>
    </div>
  );
}
