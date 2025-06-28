import styles from "./Login.module.scss";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Tooltip } from "@mui/material";

export default function Login() {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        // required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        // required
      />
      <Tooltip title="Click me!" open arrow>
        <Button type="submit" variant={"contained"}>
          {/* <Button type="submit" variant={"outlined"}> */}
          Login
        </Button>
      </Tooltip>
    </form>
  );
}
