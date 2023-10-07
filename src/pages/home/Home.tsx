import { Card } from "@mui/material";
import "./home.scss";
import OutlinedCard from "./Cards";


export const Home = () => {
  return (
    <div className="home">
      <div>
        <h1 className="title">Welcome to the SnapMsg admin panel.</h1>
        <div style={{ margin: "1%" }}>
          <Card>{OutlinedCard()}</Card>
        </div>
      </div>
    </div>
  );
};
