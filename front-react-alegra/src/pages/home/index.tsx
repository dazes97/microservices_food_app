import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Refresh } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { RecipeList, TableOrders, TablePlaza } from "./components";

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

const API_BASE_URL = "http://45.55.49.40/api";
const ENDPOINTS = {
  orders: `${API_BASE_URL}/orders`,
  stock: `${API_BASE_URL}/storage/stock`,
  plaza: `${API_BASE_URL}/storage/plaza`,
};

export const Home = () => {
  const [loading, setLoading] = useState({
    stock: true,
    orders: true,
    plaza: true,
  });

  const [ordersList, setOrdersList] = useState<IOrder[]>([]);
  const [stockList, setStockList] = useState<IStock[]>([]);
  const [plazaList, setPlazaList] = useState<IPlaza[]>([]);

  const fetchData = useCallback(async (type: keyof typeof ENDPOINTS) => {
    try {
      setLoading((prev) => ({ ...prev, [type]: true }));
      const { data } = await axios.get(ENDPOINTS[type]);

      if (Array.isArray(data?.data)) {
        if (type === "orders") setOrdersList(data.data);
        if (type === "stock") setStockList(data.data);
        if (type === "plaza") setPlazaList(data.data);
      } else {
        console.error(`Invalid data format for ${type}:`, data);
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchData("orders");
    fetchData("stock");
    fetchData("plaza");
  }, [fetchData]);

  const handleSubmitOrder = async () => {
    try {
      await axios.post(ENDPOINTS.orders);
      refreshData();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <>
      <RecipeList />
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1, pb: 3 }}>
        <Typography sx={{ fontSize: { xs: 30, md: 50 } }}>
          Alegra Almuerzos
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 1,
          gap: 2,
          alignContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: { xs: 20, md: 30 } }}>Stock</Typography>
        <IconButton aria-label="refresh" onClick={refreshData}>
          <Tooltip title="Actualizar datos..">
            <Refresh style={{ fontSize: 40 }} />
          </Tooltip>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <Tooltip title="Pedir comida..">
          <Button variant="contained" onClick={handleSubmitOrder}>
            Pedir
          </Button>
        </Tooltip>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ pt: 2, pb: 5, px: 5 }}
        textAlign="center"
      >
        {loading.stock
          ? Array.from({ length: 10 }).map((_, key) => (
              <Grid key={key} size={{ xs: 12, md: 3 }}>
                <Skeleton variant="rounded" height={80} />
              </Grid>
            ))
          : stockList.map((item) => (
              <Grid key={item.name} size={{ xs: 12, md: 2 }}>
                <Paper elevation={3} sx={{ py: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="h5">{item.quantity}</Typography>
                </Paper>
              </Grid>
            ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h5">Historial de compras a la plaza</Typography>
      </Box>

      {loading.plaza ? (
        <Box sx={{ px: 5 }}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      ) : (
        <TablePlaza data={plazaList} />
      )}

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h5">Historial de órdenes</Typography>
      </Box>

      {loading.orders ? (
        <Box sx={{ px: 5 }}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      ) : (
        <TableOrders data={ordersList} />
      )}
    </>
  );
};
