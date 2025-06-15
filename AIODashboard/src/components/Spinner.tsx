import { CircularProgress, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

interface SpinnerProps {
  text?: String;
}

export default function Spinner({ text }: SpinnerProps) {
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
        {text ? text : "LOADING DATA"}
      </Typography>
    </Box>
  );
}
