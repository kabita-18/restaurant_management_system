import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Modal,
} from "@mui/material";
import { createPaymentIntent, downloadInvoice } from "../Service/service";
import { useLocation, useNavigate } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || {};
  console.log("Received order data:", order);
  // const { orderid, tprice, customerName, email } = location.state?.order;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setModalMsg("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are not entered.");
      setProcessing(false);
      return;
    }
    console.log(order.orderId);
    let isMounted = true;

    try {
      const { clientSecret, paymentId } = await createPaymentIntent({
        orderid: order.orderid,
        amount: order.tprice,
      });
      if (!isMounted) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: order.customerName || "Guest",
            email: order.email || "guest@email.com",
          },
        },
      });

      if (result.error) {
        setModalMsg(`❌ Payment Failed: ${result.error.message}`);
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setModalMsg("✅ Payment Successful!");

        await downloadInvoice(paymentId);

        cardElement.clear();
        navigate("/order/addorder");
      }
    } catch (err) {
      console.error("Stripe Payment Error:", err);
      setModalMsg("❌ Payment was not successful.");
      setError("❌ Payment failed. Please try again.");
    } finally {
      setProcessing(false);
      setOpen(true);
    }
  };

  return (
    <>
      <Paper elevation={4} sx={{ maxWidth: 480, mx: "auto", p: 4, mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Pay for Order #{order.orderid}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: 2,
              mb: 3,
              backgroundColor: "#fafafa",
            }}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!stripe || processing}
            startIcon={
              processing && <CircularProgress size={18} color="inherit" />
            }
            sx={{ mb: 2 }}
          >
            {processing ? "Processing..." : `Pay ₹${order.tprice || 0}`}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/order-summary")}
          >
            Cancel
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal"
        aria-describedby="payment-status"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {modalMsg}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CheckoutForm;
