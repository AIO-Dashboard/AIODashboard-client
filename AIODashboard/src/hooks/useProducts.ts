import { useQuery } from "@tanstack/react-query";
// import type { ProductsResponse, Product } from "../types/Products";
import type { ApiResponse } from "../types";

const baseUrl =
  sessionStorage.getItem("role") === "localhost"
    ? "http://localhost:5000/api"
    : "https://aiodashboard-server.onrender.com/api";

export const useProducts = <T>() => {
  return useQuery<ApiResponse<T>>({
    queryKey: ["products"], // for caching, unique ID
    queryFn: async () => {
      try {
        // 'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
        // const res = await fetch("https://dummyjson.com/products?limit=0");
        const res = await fetch(baseUrl + "/products");
        return res.json();
      } catch (err) {
        console.log("err:", err);
        throw new Error(`Failed to fetch products`);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes expiration
    refetchInterval: 1000 * 60 * 5, // refetches every 5 minutes
  });
};

export const useProductDetail = <T>(id: string) => {
  return useQuery<ApiResponse<T>>({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      try {
        // const res = await fetch(`https://dummyjson.com/products/${id}`);
        const res = await fetch(`${baseUrl}/products/${id}`);

        return res.json();
      } catch (err) {
        console.log("err:", err);
        throw new Error(`Failed to fetch product '${id}'`);
      }
    },
    enabled: !!id, //  Prevents fetch if id is empty
    staleTime: 1000 * 60 * 3, // 3 minutes expiration
    refetchInterval: 1000 * 60 * 3, // refetches every 3 minutes
  });
};
