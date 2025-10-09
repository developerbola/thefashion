import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { api } from "./api";
import { Dispatch, SetStateAction } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchProduct(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<ProductType[]>>,
  path: string
) {
  setLoading(true);
  try {
    const data = await api("get", "/" + path);
    setData(data);
  } catch (error) {
    console.error(`Error fetching ${path}: `, error);
  } finally {
    setLoading(false);
  }
}

export const addToCart = (
  product: any,
  setCart: Dispatch<SetStateAction<any[]>>
) => {
  setCart((prevCart) => [...prevCart, product]);
};