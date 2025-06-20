import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

function KPICards({
  totalRevenue,
  avgOrderValue,
  repeatPurchaseRatio,
  lowStockProducts,
}: {
  totalRevenue: string;
  avgOrderValue: string;
  repeatPurchaseRatio: string;
  lowStockProducts: number;
}) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  console.log(
    "KPICards props:",
    totalRevenue.toLocaleString(),
    avgOrderValue,
    repeatPurchaseRatio,
    lowStockProducts
  );
  const cards = [
    {
      id: 1,
      title: "$ " + Number(totalRevenue).toLocaleString(),
      description: "Total Revenue",
      color: "#673ab7",
      //   "#64b5f6",
    },
    {
      id: 2,
      title: "$ " + Number(avgOrderValue).toLocaleString(),
      description: "Average Order Value.",
      color: "#42a5f5",
      //   "#81c784",
    },
    {
      id: 3,
      title: repeatPurchaseRatio,
      description: "Repeat Purchase Ratio",
      color: "#ffd54f",
    },
    {
      id: 4,
      title: lowStockProducts,
      description: "Low Stock Products",
      color: "#ffcdd2",
    },
  ];

  return (
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
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              color: card.id === 1 ? "white" : "text.primary",
              backgroundColor: card.color,
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                color={card.id === 1 ? "white" : "text.secondary"}
              >
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default KPICards;
