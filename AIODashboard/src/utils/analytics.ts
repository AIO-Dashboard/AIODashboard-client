// getTotalRevenue
// Calculates the total revenue from all orders.
// - Loops through each order and sums up its `totalAmount`.
// - Assumes each order already contains the computed total amount.
// - Returns a number representing the total revenue.
// ✅ Good for KPI display like "Total Revenue".

// getTopProducts
// Returns the top N best-selling products by quantity sold.
// - Scans all orders and counts how many units were sold per productId.
// - Sorts the results in descending order by quantity sold.
// - Matches each productId back to the product object in `products`.
// - Returns an array of product objects with an added `sold` field.
// ✅ Good for "Top Products" lists, bar charts, or leaderboards.

// getSalesOverTime
// Groups total revenue per day.
// - Extracts the date (YYYY-MM-DD) from each order’s `createdAt` field.
// - Sums up `totalAmount` for each date.
// - Returns an array sorted by date with `{ date, amount }` objects.
// ✅ Good for line or bar charts showing daily sales trends.

// getTopCustomers
// Finds the top N customers based on total spend.
// - Loops through all orders and accumulates totalAmount per customer ID.
// - Groups and sums by customer name (from `order.customer`).
// - Returns a list of `{ name, total }` for the highest spenders.
// ✅ Useful for customer insights or reward targeting.

// getLowStockProducts
// Filters products that are low in stock.
// - Compares each product’s `stock` against a given `threshold` (default is 10).
// - Returns an array of products where `stock < threshold`.
// ✅ Ideal for inventory alerts or restock recommendations.

// getCategoryDistribution
// Groups and counts products by their `category`.
// - Loops through all products and tallies how many belong to each category.
// - Returns an array of `{ category, count }` objects.
// ✅ Use for pie or bar charts showing product category spread.

// getAverageOrderValue
// Calculates the average amount spent per order.
// - Uses `getTotalRevenue` divided by total number of orders.
// - Returns 0 if there are no orders.
// ✅ Important business metric (AOV - Average Order Value).

// getRepeatCustomerRatio
// Measures how many customers placed more than one order.
// - Loops through all orders, counting how many times each customer ID appears.
// - Computes the ratio of repeat customers to total unique customers.
// - Returns a number between 0 and 1 (e.g. 0.4 means 40% of customers returned).
// ✅ Useful for tracking loyalty and retention performance.

import type { Order, Product } from "../types/index";

// 1. Total Revenue
export function getTotalRevenue(orders: Order[]) {
  return orders.reduce((sum, order) => sum + order.totalAmount, 0);
}

// 2. Top Products by Quantity Sold
export function getTopProducts(orders: Order[], products: Product[], topN = 5) {
  const productSales: Record<number, number> = {};

  for (const order of orders) {
    for (const item of order.items) {
      productSales[item.productId] =
        (productSales[item.productId] || 0) + item.quantity;
    }
  }

  return Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([productId, qty]) => {
      const prod = products.find((p) => p._id === Number(productId));
      return prod ? { ...prod, sold: qty } : null;
    })
    .filter(Boolean);
}

// 3. Sales Over Time (Assumes order.createdAt exists)
export function getSalesOverTime(orders: (Order & { createdAt: string })[]) {
  const grouped: Record<string, number> = {};

  for (const order of orders) {
    const date = new Date(order.createdAt).toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + order.totalAmount;
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, amount]) => ({ date, amount }));
}

// 4. Top Customers by Total Spend
export function getTopCustomers(orders: Order[], topN = 5) {
  const customerTotals: Record<
    string,
    { id: string; name: string; email: string; total: number }
  > = {};

  for (const order of orders) {
    const { _id, firstName, lastName, email } = order.customerId;
    if (!customerTotals[_id]) {
      customerTotals[_id] = {
        id: _id,
        name: `${firstName} ${lastName}`,
        email,
        total: 0,
      };
    }
    customerTotals[_id].total += order.totalAmount;
  }

  return Object.values(customerTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, topN);
}

// 5. Low Stock Products
export function getLowStockProducts(
  products: Product[],
  threshold: number = 10
) {
  return products.filter((p) => p.stock < threshold);
}

// 6. Category Distribution
export function getCategoryDistribution(
  products: (Product & { category: string })[]
) {
  const result: Record<string, number> = {};
  for (const product of products) {
    result[product.category] = (result[product.category] || 0) + 1;
  }

  return Object.entries(result).map(([category, count]) => ({
    category,
    count,
  }));
}

// 7. Average Order Value
export function getAverageOrderValue(orders: Order[]) {
  if (orders.length === 0) return 0;
  return getTotalRevenue(orders) / orders.length;
}

// 8. Repeat Purchase Ratio
export function getRepeatCustomerRatio(orders: Order[]) {
  const customerOrderCount: Record<string, number> = {};

  for (const order of orders) {
    const id = order.customerId._id; // embedded customer _id
    customerOrderCount[id] = (customerOrderCount[id] || 0) + 1;
  }

  const repeaters = Object.values(customerOrderCount).filter(
    (count) => count > 1
  ).length;

  const total = Object.keys(customerOrderCount).length;
  return total === 0 ? 0 : repeaters / total;
}
