import { Divider, Grid, Stack, Box } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AllInboxIcon from "@mui/icons-material/AllInbox";

import type { StatusHistory } from "../../types/Orders";
import { Fragment } from "react/jsx-runtime";

interface StatusHistoryProps {
  statusHistory: StatusHistory[];
}

export default function StatusHistory({ statusHistory }: StatusHistoryProps) {
  return (
    <Grid size={{ xs: 12 }} sx={{ paddingRight: { xs: "10px", md: "30px" } }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          {statusHistory.map((history, index) => (
            <Fragment key={index}>
              {index > 0 && <Divider orientation="vertical" flexItem />}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {/* <ImageIcon /> */}
                    {history.status === "Processing" && <AccountTreeIcon />}
                    {history.status === "Shipped" && <LocalShippingIcon />}
                    {history.status === "Delivered" && <AllInboxIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={history.status}
                  secondary={new Date(history.timestamp).toLocaleString()}
                />
              </ListItem>
            </Fragment>
          ))}
        </Stack>
      </List>
    </Grid>
  );
}
