import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface SidebarProps {
  isSidebarOpen: boolean;
  setisSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps) {
  //   const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    props.setisSidebarOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? "<InboxIcon />" : "<MailIcon />"}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? "<InboxIcon />" : "<MailIcon />"}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={props.isSidebarOpen} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
