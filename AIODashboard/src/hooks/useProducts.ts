import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"], // for caching, unique ID
    queryFn: async () => {
      try {
        // GET /products?page=1&limit=10&category=electronics&price={"min":100,"max":1000}
        const res = await fetch("https://dummyjson.com/products");
        return res.json();
      } catch (err) {
        console.log("err:", err);
        throw err;
      }
    },
  });
};
