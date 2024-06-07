"use client";
import React from "react";
import NavBarLogin from "../component/nav-bar-Login/nav-bar-login";
import StripeCheckOut from "../component/stripeCheckout/stripe";
export default function StripeCheckoutPage() {
  return (
    <div>
      <NavBarLogin></NavBarLogin>
      <h1>Stripe checkout</h1>
      <StripeCheckOut></StripeCheckOut>
    </div>
  );
}
