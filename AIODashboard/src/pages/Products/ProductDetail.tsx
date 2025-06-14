import { useParams } from "react-router";
import { useProductDetail } from "../../hooks/useProducts";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function ProductDetail() {
  const { id } = useParams(); // take id from url

  console.log("ProductDetail id:", id);

  const { data, isLoading, isError } = useProductDetail(id ? id : "");
  console.log("ProductDetail:", data, isLoading, isError);

  return (
    <>
      {/* <Box sx={{ width: "100%" }}> */}
      {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
      {data ? (
        <Grid container spacing={2}>
          <Grid size={6}>
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

          <Grid size={6}>
            <Stack direction="column" spacing={1}>
              <h1>{data.title}</h1>

              <Stack direction="row" spacing={1}>
                <Chip label={data.category} size="small" variant="outlined" />
                <Divider orientation="vertical" flexItem />
                {data.tags.map((tag: string) => (
                  <Chip label={tag} size="small" variant="outlined" key={tag} />
                ))}
              </Stack>

              <Rating
                name="read-only"
                value={data.rating}
                precision={0.5}
                readOnly
              />
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
                  Weight: {data.weight}
                </Typography>
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{ display: "block" }}
                >
                  Stock: {data.stock} {data.availabilityStatus.toLowerCase()}
                </Typography>
              </Stack>
              <Typography
                variant="caption"
                gutterBottom
                sx={{ display: "block" }}
              >
                Dimensions: {data.dimensions.width} × {data.dimensions.height} ×{" "}
                {data.dimensions.depth}cm
              </Typography>
              <Typography
                variant="caption"
                gutterBottom
                sx={{ display: "flex" }}
              >
                <LocalShippingIcon sx={{ marginRight: "10px" }} />{" "}
                {data.shippingInformation}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
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
              <Box>
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block" }}
                >
                  {data.meta.barcode}
                </Typography>
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block" }}
                >
                  SKU {data.sku}
                </Typography>
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block" }}
                >
                  {data.warrantyInformation}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={8}>
            <span>size=8</span>
          </Grid>
        </Grid>
      ) : (
        "loading..."
      )}
      {/* </Paper> */}
      {/* </Box> */}
    </>
  );
}
