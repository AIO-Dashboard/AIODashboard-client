const fs = require("fs");

// 👉 Replace this with your actual response array
const response = require("./products_and_users_responses_array.json"); // assuming array[0] = products, array[1] = users
// import * as response from "./products_and_users_responses_array.json"; // assuming array[0] = products, array[1] = users
console.log("////////////////////////////", response);
const products = response[1].products;
const users = response[0].users;

// 🔧 Helper to generate random date
function randomDateWithin(daysAgo = 60) {
  const now = new Date();
  const offset = Math.floor(Math.random() * daysAgo);
  return new Date(now.getTime() - offset * 24 * 60 * 60 * 1000);
}

// 🔧 Helper to create status history
function generateStatusHistory(createdAt, finalStatus) {
  const history = [
    { status: "Processing", timestamp: createdAt.toISOString() },
  ];
  if (["Shipped", "Delivered"].includes(finalStatus)) {
    const shippedAt = new Date(createdAt.getTime() + 1 * 86400000);
    history.push({ status: "Shipped", timestamp: shippedAt.toISOString() });
    if (finalStatus === "Delivered") {
      const deliveredAt = new Date(createdAt.getTime() + 2 * 86400000);
      history.push({
        status: "Delivered",
        timestamp: deliveredAt.toISOString(),
      });
    }
  }
  return history;
}

// 🔧 Helper to generate a random item list
function generateItems() {
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items = [];
  let total = 0;
  for (let i = 0; i < numItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = +(
      product.price *
      (1 - product.discountPercentage / 100)
    ).toFixed(2);
    const totalPrice = +(unitPrice * quantity).toFixed(2);
    total += totalPrice;

    items.push({
      productId: product.id,
      sku: product.sku || `SKU-${product.id}`,
      title: product.title,
      category: product.category,
      thumbnail: product.thumbnail || "",
      quantity,
      unitPrice,
      totalPrice,
      returnEligible: Math.random() < 0.7,
      reviewed: Math.random() < 0.5,
    });
  }
  return { items, totalAmount: +total.toFixed(2) };
}

// 🛒 Generate 300 orders
const orders = [];

for (let i = 0; i < 300; i++) {
  const id = i + 1;
  const orderNumber = `ORD-${1001 + i}`;
  const customer = users[Math.floor(Math.random() * users.length)];
  const createdAt = randomDateWithin();
  const status = ["Processing", "Shipped", "Delivered", "Cancelled"][
    Math.floor(Math.random() * 4)
  ];
  const statusHistory = generateStatusHistory(createdAt, status);
  const updatedAt = new Date(statusHistory[statusHistory.length - 1].timestamp);
  const { items, totalAmount } = generateItems();
  const taxAmount = +(totalAmount * 0.08).toFixed(2);
  const shippingCost = [0, 4.99, 7.99][Math.floor(Math.random() * 3)];
  const discount =
    Math.random() < 0.5
      ? { code: "WELCOME10", amount: 2.0, type: "percentage" }
      : null;

  orders.push({
    id,
    orderNumber,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    status,
    statusHistory,
    customer: {
      id: customer.id,
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      role: customer.role,
    },
    shippingAddress: customer.address,
    billingAddress: customer.address,
    items,
    totalAmount,
    taxAmount,
    shippingCost,
    discounts: discount ? [discount] : [],
    paymentMethod: ["Credit Card", "PayPal", "Cash on Delivery"][
      Math.floor(Math.random() * 3)
    ],
    paymentStatus: "Paid",
    transactionId: `TXN-${Math.floor(Math.random() * 1e9)}`,
    currency: "USD",
    carrier: ["FedEx", "UPS", "USPS"][Math.floor(Math.random() * 3)],
    trackingNumber: `TRK${Math.floor(Math.random() * 1e9)}US`,
    estimatedDelivery: new Date(
      updatedAt.getTime() + 2 * 86400000
    ).toISOString(),
    deliveredAt: status === "Delivered" ? updatedAt.toISOString() : null,
    gift: Math.random() < 0.3,
    giftMessage: Math.random() < 0.3 ? "Happy Birthday!" : "",
    riskScore: +(Math.random() * 0.2).toFixed(2),
    manualReview: Math.random() < 0.1,
    notes: "Leave at the front door if not home.",
    attachments: [`https://cdn.dummyjson.com/invoices/${orderNumber}.pdf`],
  });
}

// ✅ Save to file
const output = {
  orders,
  total: orders.length,
  skip: 0,
  limit: 300,
};

fs.writeFileSync(
  "generated_orders_response.json",
  JSON.stringify(output, null, 2)
);
console.log(
  "✅ 300 orders generated and saved to generated_orders_response.json"
);
