import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Tooltip from "@mui/material/Tooltip";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function KPICards({
  totalRevenue,
  avgOrderValue,
  repeatPurchaseRatio,
  lowStockProducts,
}: {
  totalRevenue: string;
  avgOrderValue: string;
  repeatPurchaseRatio: number;
  lowStockProducts: number;
}) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  //   console.log(
  //     "KPICards props:",
  //     totalRevenue.toLocaleString(),
  //     avgOrderValue,
  //     repeatPurchaseRatio,
  //     lowStockProducts
  //   );
  //   console.log(
  //     "KPICards props 2:",
  //     totalRevenue.toLocaleString(),
  //     avgOrderValue,
  //     (repeatPurchaseRatio * 100).toFixed(1) + "%",
  //     lowStockProducts
  //   );
  const cards = [
    {
      id: 1,
      value: "$ " + Number(totalRevenue).toLocaleString(),
      description: "Total Revenue",
      color: "#673ab7",
      //   "#64b5f6",
      explanation: "Total revenue generated from all orders.",
    },
    {
      id: 2,
      value: "$ " + Number(avgOrderValue).toLocaleString(),
      description: "Average Order Value.",
      color: "#42a5f5",
      //   "#81c784",
      explanation: "Average value of each order placed.",
    },
    {
      id: 3,
      value: repeatPurchaseRatio,
      description: "Repeat Purchase Ratio",
      color: "#ffd54f",
      explanation: "Measures how many customers placed more than one order.",
    },
    {
      id: 4,
      value: lowStockProducts,
      description: "Low Stock Products",
      color: "#ffcdd2",
      explanation: "Number of products with low stock levels.",
    },
  ];

  const setDynamicColor = (id: number, value: any, color: string) => {
    // console.log("setDynamicColor called with:", id, value, color);
    if (id === 4) {
      if (value <= 10) return "#81c784";
      if (value > 10 && value <= 25) return "#ffd54f";
      if (value > 25) return "#ef5350";
    } else if (id === 3) {
      if (value <= 0.1) return "#ef5350"; // if less than/equal 10%
      if (value > 0.1 && value <= 0.25) return "#ffd54f"; // if 11 - 25%
      if (value > 0.25) return "#81c784"; // if 26% or more
    } else return color;
  };

  return (
    <>
      <h2>Key Performace Indicators</h2>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          // gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 column for xs screens (<600px)
            sm: "repeat(2, 1fr)", // 2 columns for sm (600px+)
            lg: "repeat(4, 1fr)", // 4 columns for lg (1200px+)
          },
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.id}>
            <Tooltip title={card.explanation}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  height: "100%",
                  color: card.id === 1 ? "white" : "text.primary",
                  backgroundColor: setDynamicColor(
                    card.id,
                    card.value,
                    card.color
                  ),
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                    cursor: card.id === 4 ? "pointer" : "default",
                  },
                }}
              >
                <CardContent sx={{ height: "100%" }}>
                  <Typography variant="h5" component="div">
                    {card.id !== 3
                      ? card.value
                      : (card.value * 100).toFixed(1) + "%"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={card.id === 1 ? "white" : "text.secondary"}
                  >
                    {card.id === 4 ? (
                      <a
                        href="#lowStockProducts"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "-4px",
                        }}
                      >
                        {card.description} <ArrowOutwardIcon />
                      </a>
                    ) : (
                      card.description
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Tooltip>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default KPICards;
