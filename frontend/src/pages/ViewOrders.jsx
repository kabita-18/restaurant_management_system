import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Service/service";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableContainer,
  Button, 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">All Orders</Typography>
        <Button
           variant="contained"
            color="primary"
            onClick={() => {
              const role = localStorage.getItem("role"); 
              if (role === "ADMIN") {
                navigate("/ownerhome");
              } else if (role === "MANAGER") {
                navigate("/managerhome");
              } else {
                navigate("/"); 
              }
            }}
        >
          Back
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 550, overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Table No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderid}>
                <TableCell>{order.orderid}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.mobileno}</TableCell>
                <TableCell>{order.tableno}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>{order.tprice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewOrders;
