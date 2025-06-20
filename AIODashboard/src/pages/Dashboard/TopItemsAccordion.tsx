import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
// import type { Customer, Product } from "../../types";

export default function TopItemsAccordion({
  topItems,
  type,
}: {
  topItems:
    | { id: number; name: string; total: number }[]
    | { id: number; title: string; sold: number; description: string }[];
  type: string;
}) {
  if (!topItems || topItems.length === 0) {
    return (
      <Typography variant="h6" color="warning.main" sx={{ m: 4 }}>
        No items found.
      </Typography>
    );
  }
  return (
    <div id="top-items-accordion">
      <h2>
        Top {type.slice(0, 1).toLocaleUpperCase()}
        {type.slice(1)}
      </h2>
      {topItems.map((item) => (
        <Accordion
          key={item.id}
          sx={{
            // margin: "auto",
            marginRight: "10px",
            maxWidth: {
              xs: 450,
              //  md: 280
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            sx={{ margin: "auto" }}
          >
            {type === "products" && "title" in item && (
              <Typography component="span">
                {item.title}
                <Typography variant="overline" sx={{ marginLeft: "20px" }}>
                  {" "}
                  {item.sold} Sold
                </Typography>
              </Typography>
            )}
            {type === "customers" && "name" in item && (
              <Typography component="span">{item.name}</Typography>
            )}
          </AccordionSummary>

          {type === "products" && "description" in item && (
            <AccordionDetails sx={{ margin: "auto" }}>
              {item.description}
            </AccordionDetails>
          )}
          {type === "customers" && "total" in item && (
            <AccordionDetails sx={{ margin: "auto" }}>
              As of this date, {item.name} has spent a total of{" "}
              <Typography variant="overline">
                ${item.total.toLocaleString()}
              </Typography>{" "}
              in the platform.
            </AccordionDetails>
          )}

          <AccordionActions
            sx={{
              margin: "auto",
              maxWidth: {
                xs: 450,
                //  md: 280
              },
            }}
          >
            <NavLink
              to={
                type === "products"
                  ? `/products/${item.id}`
                  : `/customers/${item.id}`
              }
            >
              <Button>{type === "products" ? "Product " : "User"} info</Button>
            </NavLink>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
