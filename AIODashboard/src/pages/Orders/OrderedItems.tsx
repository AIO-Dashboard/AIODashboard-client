import { Divider, Grid, Stack, Box, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";

import type { OrderItem } from "../../types/Orders";
import { Fragment } from "react/jsx-runtime";

interface OrderedItemsProps {
  items: OrderItem[];
  currency: string;
}

export default function OrderedItems({ items, currency }: OrderedItemsProps) {
  return (
    <Grid size={{ xs: 12 }} sx={{ paddingRight: { xs: "10px", md: "30px" } }}>
      <Typography variant="overline" gutterBottom>
        <h2>Items</h2>
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Stack direction={{ xs: "column" }} spacing={1}>
          {items.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <Divider orientation="horizontal" flexItem />}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Box
                      component="img"
                      src={item.thumbnail || "/react.svg"}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/react.svg";
                      }}
                      sx={{
                        width: "100%",
                        maxWidth: 200,
                        height: "auto",
                        borderRadius: 0,
                        objectFit: "cover",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <Stack>
                  <ListItemText
                    primary={item.title}
                    secondary={`SKU: ${item.sku} | Category: ${item.category}`}
                  />
                  <ListItemText
                    secondary={`Quantity: ${
                      item.quantity
                    } | Unit Price: ${item.unitPrice.toFixed(
                      2
                    )}${currency} | Total Price: ${item.totalPrice.toFixed(
                      2
                    )}${currency}`}
                    sx={{ marginTop: "-5px" }}
                  />
                </Stack>
              </ListItem>
            </Fragment>
          ))}
        </Stack>
      </List>
    </Grid>
  );
}
