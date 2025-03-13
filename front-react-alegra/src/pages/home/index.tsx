import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { Refresh } from "@mui/icons-material";

interface IStock {
  name: string;
  quantity: number;
}

interface IOrder {
  id: number;
  recipeId: number;
  recipeName: string;
  createdAt: string;
  history: { status: string; createdAt: string }[];
}
interface IPlaza {
  id: number;
  orderId: number;
  ingredientName: string;
  quantity: number;
  createdAt: string;
}
const ordersUrl = "http://45.55.49.40/api/orders";
const stockUrl = "http://45.55.49.40/api/storage/stock";
const plazaUrl = "http://45.55.49.40/api/storage/plaza";
export const Home = () => {
  const [loadingStock, setLoadingStock] = useState<boolean>(true);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [loadingPlaza, setLoadingPlaza] = useState<boolean>(true);
  const [ordersList, setOrdersList] = useState<IOrder[]>([]);
  const [stockList, setStockList] = useState<IStock[]>([]);
  const [plazaList, setPlazaList] = useState<IPlaza[]>([]);

  const fetchStockData = useCallback(async () => {
    try {
      setLoadingStock(true);
      const {
        data: { data },
      } = await axios.get(stockUrl);
      if (Array.isArray(data)) {
        setStockList(data);
      } else {
        console.error("Expected an array but got:", data);
        setStockList([]);
      }
      setLoadingStock(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockList([]);
      setLoadingStock(false);
    }
  }, []);

  const fetchPlazaData = useCallback(async () => {
    try {
      setLoadingPlaza(true);
      const {
        data: { data },
      } = await axios.get(plazaUrl);
      if (Array.isArray(data)) {
        setPlazaList(data);
      } else {
        console.error("Expected an array but got:", data);
        setPlazaList([]);
      }
      setLoadingPlaza(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setPlazaList([]);
      setLoadingPlaza(false);
    }
  }, []);

  const fetchOrdersData = useCallback(async () => {
    try {
      setLoadingOrders(true);
      const {
        data: { data },
      } = await axios.get(ordersUrl);
      if (Array.isArray(data)) {
        setOrdersList(data);
      } else {
        setOrdersList([]);
      }
      setLoadingOrders(false);
    } catch (error) {
      console.error("Error fetching orders data:", error);
      setOrdersList([]);
      setLoadingOrders(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchOrdersData();
    fetchStockData();
    fetchPlazaData();
  }, [fetchOrdersData, fetchStockData, fetchPlazaData]);

  const handleSubmitOrder = async () => {
    try {
      const response = await axios.post(ordersUrl);
      console.log("Order submitted:", response.data);
      refreshData();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  useEffect(() => {
    fetchOrdersData();
    fetchStockData();
    fetchPlazaData();
  }, [fetchStockData, fetchOrdersData, fetchPlazaData]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1, pb: 3 }}>
        <Typography variant="h3">Alegra Almuerzos</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
        <Typography variant="h5">Stock</Typography>
        <IconButton aria-label="refresh" onClick={refreshData}>
          <Refresh />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <Button variant="contained" onClick={handleSubmitOrder}>
          Pedir
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
        columns={5}
        sx={{ pt: 2, pb: 5, px: 5 }}
        textAlign="center"
      >
        {loadingStock &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => (
            <Grid key={key} size={{ xs: 12, md: 1 }}>
              <Skeleton variant="rounded" height={80} />
            </Grid>
          ))}
        {!loadingStock &&
          stockList.map((item: IStock) => (
            <Grid key={item.name} size={{ xs: 12, md: 1 }}>
              <Paper elevation={3} sx={{ py: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="h5">{item.quantity}</Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
      {loadingPlaza && (
        <Box sx={{ px: 5 }}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      )}
      <Box sx={{ flex: "center", textAlign: "center" }}>
        <Typography variant="h5">Historial de compras</Typography>
      </Box>
      {!loadingPlaza && (
        <Box sx={{ px: 5, py: 5 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Orden</TableCell>
                  <TableCell align="center">Ingrediente</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Fecha de compra</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plazaList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.orderId}</TableCell>
                    <TableCell align="center">{row.ingredientName}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      {DateTime.fromISO(row.createdAt).toFormat(
                        "dd/LL/yyyy TT"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {loadingOrders && (
        <Box sx={{ px: 5 }}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      )}
      {!loadingOrders && (
        <Box sx={{ px: 5 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                {ordersList.map((row) => (
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
                      {DateTime.fromISO(row.createdAt).toFormat(
                        "dd/LL/yyyy TT"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.history.map((e) => (
                        <Box sx={{ p: 1 }}>
                          <Tooltip
                            title={DateTime.fromSQL(e.createdAt).toFormat(
                              "dd-MM-yyyy HH:mm:ss"
                            )}
                          >
                            <Chip label={e.status} color="primary" />
                          </Tooltip>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};
