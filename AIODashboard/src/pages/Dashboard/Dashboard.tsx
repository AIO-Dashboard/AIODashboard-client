import styles from "./Dashboard.module.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <Link to="/products/create">
        <Button variant={"outlined"}>Create</Button>
      </Link>
    </div>
  );
}
