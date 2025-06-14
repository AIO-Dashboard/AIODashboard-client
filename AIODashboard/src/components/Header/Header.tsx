import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

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
      <Button onClick={handleSidebarToggle}>
        <MenuIcon />
      </Button>
      <span>AIO Dashboard</span>

      <span>
        {isLoggedIn && <Button onClick={handleLogout}>Log out</Button>}
      </span>
    </header>
  );
}
