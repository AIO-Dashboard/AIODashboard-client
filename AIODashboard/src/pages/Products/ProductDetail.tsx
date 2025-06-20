import * as React from "react";
import { useParams } from "react-router";
import { useProductDetail } from "../../hooks/index";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import type { Review } from "../../types/Products";
import Spinner from "../../components/Spinner";

export default function ProductDetail() {
  const { id } = useParams(); // take id from url

  console.log("ProductDetail id:", id);

  const { data, isLoading, isError } = useProductDetail(id ? id : "");
  console.log("ProductDetail:", data, isLoading, isError);

  if (isLoading) {
    return <Spinner text="Loading product info..." />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" sx={{ m: 4 }}>
        Failed to load product details. Please try again later.
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" color="warning.main" sx={{ m: 4 }}>
        No product data found.
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: {
          xs: "5vw",
        },
      }}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          component="img"
          src={data.images[0] || "/react.svg"}
          alt={data.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/react.svg";
          }}
          sx={{
            width: "100%",
            maxWidth: 400,
            height: "auto",
            borderRadius: 2,
            objectFit: "cover",
            backgroundColor: "#f0f0f0",
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack direction="column" spacing={1}>
          <h1>{data.title}</h1>

          <Stack direction="row" spacing={1}>
            <Chip label={data.category} size="small" variant="outlined" />
            <Divider orientation="vertical" flexItem />
            {data.tags.map((tag: string) => (
              <Chip label={tag} size="small" variant="outlined" key={tag} />
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Rating
              name="read-only"
              value={data.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="caption">{data.rating}</Typography>
          </Stack>
          <p>{data.description}</p>
          <Typography variant="h6" component="data" value={data.price}>
            ${data.price.toFixed(2)}{" "}
            {data.discountPercentage > 0 && (
              <Typography variant="caption">
                ({data.discountPercentage}% discount)
              </Typography>
            )}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              Weight: {data.weight}g
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              Dimensions: {data.dimensions.width} × {data.dimensions.height} ×{" "}
              {data.dimensions.depth}cm
            </Typography>
          </Stack>

          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            Stock: {data.stock} {data.availabilityStatus.toLowerCase()}
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "flex" }}>
            <LocalShippingIcon sx={{ marginRight: "10px" }} />{" "}
            {data.shippingInformation}
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "flex" }}>
            <WorkspacePremiumIcon sx={{ marginRight: "10px" }} />{" "}
            {data.returnPolicy}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack direction="row" spacing={1}>
          <Box
            component="img"
            src={data.meta.qrCode || "/react.svg"}
            alt={data.title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/react.svg";
            }}
            sx={{
              width: "100%",
              maxWidth: 100,
              height: "auto",
              borderRadius: 0,
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
            }}
          />
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              {data.meta.barcode}
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              SKU {data.sku}
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              {data.warrantyInformation}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          Created at {new Date(data.meta.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          Last updated on {new Date(data.meta.updatedAt).toLocaleString()}
        </Typography>
      </Grid>
      <Grid size={12}>
        <section>
          <h2>Customer Reviews</h2>
          <List
            sx={{
              width: "100%",
              // maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {data.reviews.map((review: Review) => (
              <span
                key={
                  Math.random() * 1000 +
                  Math.random() * 1000 +
                  review.date +
                  review.reviewerName +
                  data.title
                }
              >
                <ListItem alignItems="flex-start">
                  <Tooltip
                    title={review.reviewerName + "  |  " + review.reviewerEmail}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={review.reviewerName}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                  </Tooltip>
                  <ListItemText
                    primary={review.comment}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          <Tooltip title={review.reviewerEmail}>
                            <span>{review.reviewerName}</span>
                          </Tooltip>
                        </Typography>
                        {" — "}
                        {
                          // " — I'll be in your neighborhood doing errands this…"
                          new Date(review.date).toLocaleString()
                        }
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </span>
            ))}
          </List>
        </section>
      </Grid>
    </Grid>
  );
}
