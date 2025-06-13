import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../../context/AuthContext/AuthContext";

interface HeaderProps {
  setisSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}

export default function Header({
  setisSidebarOpen,
  isSidebarOpen,
}: HeaderProps) {
  const { isLoggedIn, logout } = useAuth();
  // const navigate = useNavigate();
  const handleLogout = () =>
    // e: React.MouseEventHandler<HTMLButtonElement>
    {
      // localStorage.removeItem("token");
      logout();
      // navigate("/login");
    };

  const handleSidebarToggle = () => {
    if (isSidebarOpen) setisSidebarOpen(false);
    else setisSidebarOpen(true);
  };
  return (
    <header className={styles.header}>
      <button onClick={handleSidebarToggle}>
        <MenuIcon />
      </button>
      <h1>AIO Dashboard</h1>

      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </header>
  );
}
