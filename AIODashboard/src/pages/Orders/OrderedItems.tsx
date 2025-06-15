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
}

export default function OrderedItems({ items }: OrderedItemsProps) {
  return (
    <Grid size={{ xs: 12 }} sx={{ paddingRight: { xs: "10px", md: "30px" } }}>
      <Typography variant="overline" gutterBottom>
        Items
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
              {index > 0 && <Divider orientation="vertical" flexItem />}
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
                <ListItemText
                  primary={item.title}
                  secondary={`SKU: ${item.sku} | Category: ${
                    item.category
                  } | Quantity: ${
                    item.quantity
                  } | Unit Price: ${item.unitPrice.toFixed(
                    2
                  )} | Total Price: ${item.totalPrice.toFixed(2)}`}
                />
              </ListItem>
            </Fragment>
          ))}
        </Stack>
      </List>
    </Grid>
  );
}
