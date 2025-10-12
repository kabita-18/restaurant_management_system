import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
    Stepper,
  Step,
  StepLabel

} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { subscribeOrderStatus } from "../Service/service";
import  { useState, useEffect } from "react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
   const order = location.state?.order || {};
    const steps = ["CREATED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

   const [status, setStatus] = useState("CREATED");

   useEffect(() => {
    if (!order?.orderid) return;

    // Mock SSE connection
    const eventSource = subscribeOrderStatus(
      order.orderid,
      (data) => {
        if (data?.status) {
          setStatus(data.status);

          // stop listening once delivered
          if (data.status === "DELIVERED") {
            eventSource.close();
          }
        }
      },
      (err) => console.error("Mock SSE error:", err)
    );

    // Cleanup
    return () => {
      eventSource.close();
    };
  }, [order]);

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          ⚠️ No order details found.
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const activeStep = steps.indexOf(status);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fceabb, #f8b500)",
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 4,
          background: "white"
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 70, color: "green", mb: 2 }} />
        <Typography variant="h4" gutterBottom color="green">
          🎉 Congratulations!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your order has been placed successfully.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: "left", mb: 2, }}>
          <Typography variant="body1" sx={{paddingTop:"0", color:"black", }}>
            <strong>Order ID:</strong> &nbsp;&nbsp;{order.orderid}
          </Typography>
          
          <Typography variant="body1" sx={{paddingTop:"0", color:"black" }}>
            <strong>Name:</strong> {order.customerName}
          </Typography>
          <Typography variant="body1" sx={{paddingTop:"0", color:"black" }}>
            <strong>Email:</strong> {order.email}
          </Typography>
          <Typography variant="body1" sx={{paddingTop:"0", color:"black" }}>
            <strong>Total Amount:</strong> ₹{order.tprice}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Real-time status tracker */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order Status: <span style={{ color: "blue" }}>{status}</span>
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label.replaceAll("_", " ")}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate("/order-summary")}
        >
          View Orders
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderSuccess;
