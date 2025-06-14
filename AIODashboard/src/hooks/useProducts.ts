import { useQuery } from "@tanstack/react-query";
import type { ProductsResponse, Product } from "../types/Products";

export const useProducts = () => {
  return useQuery<ProductsResponse>({
    queryKey: ["products"], // for caching, unique ID
    queryFn: async () => {
      try {
        // 'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
        const res = await fetch("https://dummyjson.com/products?limit=0");
        return res.json();
      } catch (err) {
        console.log("err:", err);
        throw err;
      }
    },
  });
};

export const useProductDetail = (id: string) => {
  return useQuery<Product>({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        return res.json();
      } catch (err) {
        console.log("err:", err);
        throw err;
      }
    },
    enabled: !!id, //  Prevents fetch if id is empty
  });
};
