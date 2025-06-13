import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext/AuthContext";

interface SidebarProps {
  isSidebarOpen: boolean;
  setisSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const toggleDrawer = (newOpen: boolean) => () => {
    props.setisSidebarOpen(newOpen);
  };

  const sidebarItems1 = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { label: "Products", icon: <InventoryIcon />, path: "products" },
    { label: "Orders", icon: <CreditCardIcon />, path: "orders" },
    { label: "Customers", icon: <AccountBoxIcon />, path: "customers" },
  ];
  const sidebarItems2 = [
    { label: "Settings", icon: <SettingsIcon />, path: "settings" },
  ];
  const sidebarItems3 = [{ label: "Logout", icon: <LogoutIcon /> }];

  const handleLogout = () => {
    console.log("handleLogout");
    logout();
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <br />
      <br />
      <br />
      <List>
        {sidebarItems1.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            onClick={() => {
              navigate(item.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarItems2.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            onClick={() => {
              navigate(item.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isLoggedIn ? (
        <>
          <Divider />
          <List>
            {sidebarItems3.map((item) => (
              <ListItem key={item.label} disablePadding onClick={handleLogout}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <></>
      )}
    </Box>
  );

  return (
    <Drawer open={props.isSidebarOpen} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
