import React from "react";
import PolicyLayout from "../components/PolicyLayout";

const ShippingPolicy = () => {
  return (
    <PolicyLayout title="Shipping Policy">
      <p>We process and ship all orders within 1–3 business days. Delivery times may vary depending on your location.</p>
      <p>Shipping rates and estimated delivery dates will be calculated at checkout.</p>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
