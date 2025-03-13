import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TablePagination,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { DateTime } from "luxon";

interface IOrder {
  id: number;
  recipeId: number;
  recipeName: string;
  createdAt: string;
  history: { status: string; createdAt: string }[];
}
interface TableOrdersProps {
  data: IOrder[];
}

export const TableOrders = ({ data }: TableOrdersProps) => {
  const ordersList: IOrder[] = data;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{ p: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" title="Ordenes">
          <TableHead>
            <TableRow>
              <TableCell align="center">Orden</TableCell>
              <TableCell align="center">
                <Typography variant="body1">Receta</Typography>
              </TableCell>
              <TableCell align="center">Fecha de creacion</TableCell>
              <TableCell align="center">Historial</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    {row.recipeName ?? "No Definido"}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(row.createdAt, {
                      zone: "utc",
                    }).toFormat("dd/LL/yyyy TT")}
                  </TableCell>
                  <TableCell align="center">
                    {row.history.map((e, index) => (
                      <Box
                        key={row.id + index}
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: 1,
                          p: 1,
                        }}
                      >
                        <Tooltip
                          title={DateTime.fromISO(e.createdAt, {
                            zone: "utc",
                          }).toFormat("dd/LL/yyyy TT")}
                        >
                          <Chip
                            label={e.status}
                            color="primary"
                            key={row.id + index}
                          />
                        </Tooltip>
                      </Box>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
        component="div"
        count={ordersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Registros por página"
      />
    </Box>
  );
};
