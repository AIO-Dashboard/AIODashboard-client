import styles from "./Header.module.scss";

import { useAuth } from "../../context/AuthContext/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  // const navigate = useNavigate();
  const handleLogout = () =>
    // e: React.MouseEventHandler<HTMLButtonElement>
    {
      // localStorage.removeItem("token");
      logout();
      // navigate("/login");
    };
  return (
    <header className={styles.header}>
      <h1>AIO Dashboard</h1>

      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </header>
  );
}
