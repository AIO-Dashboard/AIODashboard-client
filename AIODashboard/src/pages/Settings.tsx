import React, { useState, type ReactNode } from "react";
import {
  Grid,
  List,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Tooltip,
} from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

export default function Settings() {
  const [isDark, setisDark] = useState(false);
  const handleChangeTheme = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    if (newAlignment !== null) {
      setisDark(newAlignment);
    }
  };

  const [displayLanguage, setDisplayLanguage] = useState("EN");
  const handledisplayLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setDisplayLanguage(newAlignment);
    }
  };

  const [exportClicked, setexportClicked] = useState({
    products: false,
    orders: false,
    customers: false,
  });
  const handleExportData = (type: string) => {
    setexportClicked((prev) => ({ ...prev, [type]: true }));

    const a = document.createElement("a");
    a.target = "_blank";

    if (type === "products") {
      a.href = "/products_and_users_responses_array.json";
      a.download = "products_and_users_responses_array.json";
    }
    if (type === "orders") {
      a.href = "/generated_orders_response.json";
      a.download = "generated_orders_response.json";
    }
    if (type === "customers") {
      a.href = "/products_and_users_responses_array.json";
      a.download = "products_and_users_responses_array.json";
    }

    a.click();

    setTimeout(() => {
      setexportClicked((prev) => ({ ...prev, [type]: false }));
    }, 500);
  };

  const CustomBox = ({ children }: { children: ReactNode }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <h1>Settings</h1>
        <List
          sx={{
            width: "100%",
            maxWidth: 500,
            margin: "auto",
            padding: 5,
            bgcolor: "background.paper",
          }}
        >
          <CustomBox>
            <Typography variant="overline">Theme</Typography>
            <ToggleButtonGroup
              color="primary"
              value={isDark}
              exclusive
              onChange={handleChangeTheme}
              aria-label="Platform"
            >
              <ToggleButton value={false}>LIGHT</ToggleButton>
              <ToggleButton value={true}>DARK</ToggleButton>
            </ToggleButtonGroup>
          </CustomBox>

          <CustomBox>
            <Typography variant="overline">Language</Typography>
            <ToggleButtonGroup
              color="primary"
              value={displayLanguage}
              exclusive
              onChange={handledisplayLanguage}
              aria-label="Platform"
            >
              <ToggleButton value={"EN"}>
                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="English"
                  width={24}
                  style={{ marginRight: "5px" }}
                />
                ENGLISH
              </ToggleButton>
              <ToggleButton value={"PH"}>
                <img
                  src="https://flagcdn.com/w40/ph.png"
                  alt="Filipino"
                  width={24}
                  style={{ marginRight: "5px" }}
                />
                TAGALOG
              </ToggleButton>
            </ToggleButtonGroup>
          </CustomBox>
          {/* </> */}
          {/* </CustomBox> */}
          <CustomBox>
            <Tooltip
              arrow
              title="Clicking opens a new tab for data download."
              sx={{
                display: "flex",
                alignItems: "center",
                // ":hover": { cursor: "pointer" }
              }}
            >
              <Typography variant="overline">
                export data{" "}
                <InfoOutlineIcon
                  sx={{
                    fontSize: "16px",
                    marginLeft: "10px",
                    marginBottom: "5px",
                  }}
                />
              </Typography>
            </Tooltip>

            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button
                loading={exportClicked.products}
                onClick={() => handleExportData("products")}
              >
                Products
              </Button>
              <Button
                loading={exportClicked.orders}
                onClick={() => handleExportData("orders")}
              >
                Orders
              </Button>
              <Button
                loading={exportClicked.customers}
                onClick={() => handleExportData("customers")}
              >
                Customers
              </Button>
              {/* <Button loading loadingPosition="start" startIcon={<SaveIcon />}> */}
              {/* Save */}
              {/* </Button> */}
            </ButtonGroup>
          </CustomBox>
        </List>
      </Grid>
    </>
  );
}
