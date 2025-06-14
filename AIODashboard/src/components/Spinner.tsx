import { CircularProgress, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Spinner() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
      }}
    >
      <CircularProgress />
      <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
        LOADING DATA
      </Typography>
    </Box>
  );
}
