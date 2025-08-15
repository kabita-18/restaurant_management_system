import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const order = location.state?.order || {};
  useEffect(() => {
    if (order.orderType?.toUpperCase() === "DELIVERY") {
      setLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await res.json();
              setAddress(data.display_name || "");
            } catch (err) {
              console.error("Error fetching address:", err);
            }
            setLoadingLocation(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLoadingLocation(false);
          }
        );
      } else {
        console.error("Geolocation not supported");
        setLoadingLocation(false);
      }
    }
  }, [order.orderType]);

  const handleProceed = () => {
    console.log("Order before navigate:", order);
    navigate("/checkout", {
      state: {
        order: {
          orderid: order.orderid,
          tprice: order.tprice,
          customerName: order.customerName,
          email: order.email,
        },
      },
    });
  };
  console.log("location state", location.state);
  console.log("location state", order.customerName);
  console.log("location state", order.email);
  console.log("location state", order.mobileno);
  console.log("location state", order.orderType);
  console.log("location state", order.orderid);
  console.log("location state", order.orderinfo);

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "20px auto",
        padding: 2,
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        🧾 Order Summary
      </Typography>

      {/* Customer Info */}
      <Typography
        variant="body1"
        sx={{ color: "text.primary", padding: "20px" }}
      >
        <strong>Customer Order Id:</strong> &nbsp;&nbsp;{order.orderid}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", padding: "20px" }}
      >
        <strong>Customer Name:</strong>&nbsp;&nbsp; {order.customerName}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", padding: "20px" }}
      >
        <strong>Email:</strong> &nbsp;&nbsp;{order.email}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", padding: "20px" }}
      >
        <strong>Mobile:</strong> &nbsp;&nbsp;{order.mobileno}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", padding: "20px" }}
      >
        <strong>Table No:</strong> &nbsp;&nbsp;{order.tableno}
      </Typography>
      <Typography sx={{ color: "text.primary", padding: "20px" }}>
        <strong>Order Type:</strong> &nbsp;&nbsp;
        {order.orderType?.toUpperCase()}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Items */}
      <Typography variant="h6" gutterBottom>
        Selected Dishes
      </Typography>
      {order.orderinfo && order.orderinfo.length > 0 ? (
        order.orderinfo.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "black",
                flex: "unset",
                padding: 0,
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {item.dishname} (x{item.quantity})
            </Typography>
            <Typography
              sx={{
                color: "black",
                flex: "unset",
                padding: 0,
                whiteSpace: "normal",
                wordBreak: "break-word",
                textAlign: "right",
              }}
            >
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No items selected.</Typography>
      )}
      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Typography
        variant="h5"
        sx={{
          color: "black",
          flex: "unset",
          padding: 0,
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "right",
        }}
      >
        Total: ₹{order.tprice}
      </Typography>

      {/* Delivery Address */}
      {order.orderType?.toUpperCase() === "DELIVERY" && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Delivery Address</Typography>
          {loadingLocation ? (
            <Typography>Fetching location...</Typography>
          ) : (
            <TextField
              fullWidth
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      )}

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/order/addorder")}>
          ← Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleProceed}>
          Proceed to Payment →
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
