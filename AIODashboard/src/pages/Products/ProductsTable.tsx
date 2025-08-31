import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";

import type { ProductsResponse } from "../../types/Products.ts";
import type {
  TableProduct,
  ProductsHeadCell,
  ProductsEnhancedTableProps,
} from "../../types/Products.ts";
import type {
  EnhancedTableToolbarProps,
  Sort,
} from "../../types/EnhancedTable.ts";
import { useNavigate } from "react-router";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Sort,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// TODO dynamic columns like in Low Stock Products
const headCells: readonly ProductsHeadCell[] = [
  // add stock no.
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
    display: { xs: "none", md: "table-cell" },
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Brand",
    display: { xs: "none", md: "table-cell" },
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "Stock",
    display: { xs: "none", sm: "table-cell" },
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    display: { xs: "none", lg: "table-cell" },
  },
  {
    id: "rating",
    numeric: false,
    disablePadding: false,
    label: "Rating",
    display: { xs: "none", md: "table-cell" },
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props: ProductsEnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof TableProduct) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              display: headCell.display || "table-cell", // default fallback
              // ...(headCell.display || {}), // only spread if defined
            }}
            // xs: headCell.id === "description" ? "none" : "",
            // lg: "table-cell",
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {props.visibleItemCount} displayed | {props.totalItemCount} total |{" "}
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          component="div"
        >
          {props.visibleItemCount} displayed | {props.totalItemCount} total
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable(props: ProductsResponse) {
  const navigate = useNavigate();
  const rows = props.products;
  const [order, setOrder] = React.useState<Sort>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TableProduct>("title");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableProduct
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // if (event.target.checked || event.target.indeterminate) {

      const newSelected = visibleRows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const handleProductInfoClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          totalItemCount={props.total}
          visibleItemCount={visibleRows.length}
        />
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      // padding="none"
                      align="left"
                    >
                      {row._id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      ${row.price}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {row.brand}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {row.stock} left
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <StarIcon sx={{ color: "#faaf00" }} />
                        {row.rating}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Tooltip title="Product Detail">
                        <IconButton
                          onClick={() => handleProductInfoClick(row._id)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100, props.total]}
          component="div"
          //   count={rows.length}
          count={props.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
