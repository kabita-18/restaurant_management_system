import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key
const stripeProvider = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY)
export default stripeProvider;