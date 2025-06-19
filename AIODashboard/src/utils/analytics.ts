type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  date: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  rating?: { rate: number; count: number };
};

type User = {
  id: number;
  name: string;
  email?: string;
  gender?: string;
  address?: {
    city: string;
    country: string;
  };
};

export function getTotalRevenue(orders: Order[], products: Product[]): number {
  return orders.reduce((sum, order) => {
    const product = products.find((p) => p.id === order.productId);
    return product ? sum + product.price * order.quantity : sum;
  }, 0);
}

export function getAverageOrderValue(
  orders: Order[],
  products: Product[]
): number {
  if (!orders.length) return 0;
  return getTotalRevenue(orders, products) / orders.length;
}

export function getTopProducts(orders: Order[], products: Product[]) {
  const productMap: Record<
    number,
    { title: string; revenue: number; quantity: number }
  > = {};

  for (let order of orders) {
    const product = products.find((p) => p.id === order.productId);
    if (!product) continue;

    if (!productMap[product.id]) {
      productMap[product.id] = {
        title: product.title,
        revenue: 0,
        quantity: 0,
      };
    }

    productMap[product.id].quantity += order.quantity;
    productMap[product.id].revenue += order.quantity * product.price;
  }

  return Object.entries(productMap)
    .map(([id, data]) => ({ id: Number(id), ...data }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getSalesOverTime(orders: Order[], products: Product[]) {
  const salesMap: Record<string, { date: string; revenue: number }> = {};

  for (let order of orders) {
    const product = products.find((p) => p.id === order.productId);
    if (!product) continue;

    const date = new Date(order.date).toISOString().split("T")[0];
    if (!salesMap[date]) {
      salesMap[date] = { date, revenue: 0 };
    }

    salesMap[date].revenue += product.price * order.quantity;
  }

  return Object.values(salesMap).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getLowStockProducts(
  products: Product[],
  threshold: number = 10
) {
  return products.filter((p) => p.stock < threshold);
}

export function getCategoryBreakdown(orders: Order[], products: Product[]) {
  const map: Record<
    string,
    { category: string; revenue: number; quantity: number }
  > = {};

  for (const order of orders) {
    const product = products.find((p) => p.id === order.productId);
    if (!product) continue;

    if (!map[product.category]) {
      map[product.category] = {
        category: product.category,
        revenue: 0,
        quantity: 0,
      };
    }

    map[product.category].revenue += product.price * order.quantity;
    map[product.category].quantity += order.quantity;
  }

  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}

export function getTopCustomers(
  orders: Order[],
  users: User[],
  products: Product[]
) {
  const map: Record<
    number,
    { name: string; totalSpent: number; orders: number }
  > = {};

  for (const order of orders) {
    const user = users.find((u) => u.id === order.userId);
    const product = products.find((p) => p.id === order.productId);
    if (!user || !product) continue;

    if (!map[user.id]) {
      map[user.id] = {
        name: user.name,
        totalSpent: 0,
        orders: 0,
      };
    }

    map[user.id].totalSpent += product.price * order.quantity;
    map[user.id].orders += 1;
  }

  return Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent);
}

export function getProductRatings(products: Product[]) {
  return products
    .filter((p) => p.rating)
    .map((p) => ({
      id: p.id,
      title: p.title,
      rating: p.rating?.rate ?? 0,
      reviews: p.rating?.count ?? 0,
    }))
    .sort((a, b) => b.rating - a.rating);
}
