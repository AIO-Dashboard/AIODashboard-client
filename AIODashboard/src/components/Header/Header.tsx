import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import { useAuth } from "../../context/AuthContext/AuthContext";
import { Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

interface HeaderProps {
  setisSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}

export default function Header({
  setisSidebarOpen,
  isSidebarOpen,
}: HeaderProps) {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
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

  const [baseSection, setbaseSection] = useState("");

  function setBaseSectionFromPath(pathname: string): void {
    const sections = ["dashboard", "orders", "customers", "products"] as const;

    for (const section of sections) {
      if (pathname.startsWith(`/${section}`)) {
        // console.log("setBaseSectionFromPath", section);
        setbaseSection(section);
        return;
      }
    }
  }

  useEffect(() => {
    // console.log("useEffect", location);
    setBaseSectionFromPath(location.pathname);
  }, [location]);

  return (
    <header className={styles.header}>
      {!isLoggedIn && (
        <Typography
          variant="overline"
          margin={"auto"}
          sx={{
            fontSize: "18px",
          }}
        >
          AIO Dashboard
        </Typography>
      )}
      {isLoggedIn && (
        <>
          <Button
            onClick={handleSidebarToggle}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </Button>
          <Typography
            variant="overline"
            marginLeft={2}
            sx={{
              fontSize: "18px",
              display: {
                md: "none",
              },
            }}
          >
            AIO Dashboard
          </Typography>
          <Box
            sx={{
              // width: "100%",
              typography: "body1",
              display: {
                xs: "none",
                md: "inline-block",
              },
            }}
          >
            <TabContext value={baseSection}>
              <Box
              // sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <TabList onChange={() => {}} aria-label="lab API tabs example">
                  <Tab
                    label="Dashboard"
                    value="dashboard"
                    to="/dashboard"
                    component={Link}
                  />

                  <Tab
                    label="Products"
                    value="products"
                    to="/products"
                    component={Link}
                  />
                  <Tab
                    label="Orders"
                    value="orders"
                    to="/orders"
                    component={Link}
                  />
                  <Tab
                    label="Customers"
                    value="customers"
                    to="/customers"
                    component={Link}
                  />
                </TabList>
              </Box>
            </TabContext>
          </Box>
          <span>
            {isLoggedIn && <Button onClick={handleLogout}>Log out</Button>}
          </span>
        </>
      )}
    </header>
  );
}
