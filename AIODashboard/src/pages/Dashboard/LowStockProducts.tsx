import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function DenseTable({ lowStockProducts }) {
  const navigate = useNavigate();
  console.log("lowStockProducts:", lowStockProducts);
  const sortedByLowest = lowStockProducts.sort((a, b) => a.stock - b.stock);
  const handleProductInfoClick = (id: number) => {
    navigate(`/products/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="a dense table"
        // sx={{ minWidth: 650 }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="left" width={5}>
              Stock
            </TableCell>
            <TableCell
              sx={{
                // minWidth: "250px",
                fontWeight: "bold",
              }}
              //   width={"100%"}
            >
              Product name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: { xs: "none", md: "table-cell" },
              }}
              align="right"
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: { xs: "none", sm: "table-cell" },
              }}
              align="right"
            >
              Weight&nbsp;(g)
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: { xs: "none", sm: "table-cell" },
              }}
              align="right"
            >
              Price&nbsp;(USD)
            </TableCell>

            <TableCell
              sx={{ fontWeight: "bold" }}
              align="right"
              width={5}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedByLowest.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="right"
                sx={{ color: row.stock < 5 ? "red" : "" }}
              >
                {row.stock}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", md: "table-cell" } }}
                align="right"
              >
                {row.category}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {row.weight}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "table-cell" } }}
                align="right"
              >
                {row.price.toLocaleString()}
              </TableCell>

              <TableCell align="right" onClick={(e) => e.preventDefault()}>
                <Tooltip title="Product Detail">
                  <IconButton
                    sx={{ padding: "5px" }}
                    onClick={() => handleProductInfoClick(row.id)}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
