import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

import styles from "./IntroBackdrop.module.scss";

import Button from "@mui/material/Button";

import {
  SiReact,
  SiTypescript,
  SiVite,
  SiMui,
  SiReactrouter,
  // SiRecharts,
  SiStyledcomponents,
  SiSass,
  SiEslint,
  SiNetlify,
  SiGithub,
  SiSimpleicons,
} from "react-icons/si";
import { Box, Container, Typography } from "@mui/material";

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: "10px", left: "10px", zIndex: 10000 }}
        className={styles.button}
      >
        TECH STACK
      </Button>
      <Backdrop
        sx={(theme) => ({
          backgroundColor: "#171717ce",
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Container className={styles.container}>
          {[
            { Icon: SiReact, label: "React", color: "#61DAFB" },
            { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
            { Icon: SiGithub, label: "GitHub", color: "#181717" },
            { Icon: SiMui, label: "Material UI", color: "#007FFF" },
            { Icon: SiReactrouter, label: "React Router", color: "#CA4245" },
            {
              Icon: SiStyledcomponents,
              label: "Styled Components",
              color: "#DB7093",
            },
            { Icon: SiVite, label: "Vite", color: "#646CFF" },
            { Icon: SiSass, label: "Sass", color: "#CC6699" },
            { Icon: SiEslint, label: "ESLint", color: "#4B32C3" },
            { Icon: SiNetlify, label: "Netlify", color: "#00C7B7" },

            { Icon: SiSimpleicons, label: "Simpleicons", color: "#181717" },
          ].map(({ Icon, label, color }) => (
            <Box
              key={label}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Icon color={color} size={48} title={label} />
              <Typography variant="caption" mt={1}>
                {label}
              </Typography>
            </Box>
          ))}

          {/* Custom Recharts text fallback */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <Typography
              // fontSize={48}
              color="#22b5bf"
              sx={{
                fontSize: {
                  sm: 24,
                  md: 48,
                },
              }}
            >
              {`<Recharts />`}
            </Typography>
            <Typography variant="caption" mt={1}>
              Recharts
            </Typography>
          </Box>
        </Container>
      </Backdrop>
    </div>
  );
}
