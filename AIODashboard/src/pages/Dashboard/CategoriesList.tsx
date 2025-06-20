import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, type ListChildComponentProps } from "react-window";

interface CategoryItem {
  category: string;
  count: number;
}

function renderRow(props: ListChildComponentProps<CategoryItem[]>) {
  const { index, style, data } = props;
  const item = data[index];

  return (
    <ListItem
      style={style}
      key={item.category}
      component="div"
      disablePadding
      dense
    >
      <ListItemButton>
        <ListItemText
          primary={`${item.category
            .toLocaleUpperCase()
            .slice(0, 1)}${item.category.slice(1)} : ${item.count}`}
          //   secondary={`Count: ${item.count}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList({
  categoryDist,
}: {
  categoryDist: CategoryItem[];
}) {
  const sortedCategoryDist = [...categoryDist].sort(
    (a, b) => b.count - a.count
  );
  return (
    <>
      {/* <h2>Items per category</h2> */}
      <Box
        sx={{
          width: "100%",
          minHeight: "300px",
          maxWidth: { xs: 450, md: 280 },
          margin: "auto",
          marginTop: { xs: "50px", md: 0 },
          bgcolor: "background.paper",
        }}
      >
        <FixedSizeList
          height={400}
          width={"auto"}
          itemSize={30}
          itemCount={categoryDist.length}
          itemData={sortedCategoryDist}
          overscanCount={5}
          //   sx={{
          //     width: {
          //       sm: 360,
          //     },
          //   }}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </>
  );
}
