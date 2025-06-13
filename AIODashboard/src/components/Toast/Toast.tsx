import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message="I love snacks"
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Operation successful!
      </Alert>
    </Snackbar>
  );
}
