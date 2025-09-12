import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const baseURL = "https://thefashion-s3cu.vercel.app/api";

export async function api(method: string, path: string, data?: FormData) {
  const url = `${baseURL}${path}`;

  const headers = {
    "Content-Type": data ? "multipart/form-data" : "application/json",
  };

  let axiosConfig: AxiosRequestConfig = {
    method: method.toLowerCase(),
    url,
    headers,
  };

  if (data && ["post", "put"].includes(method.toLowerCase())) {
    axiosConfig.data = data;
  }

  if (method.toLowerCase() === "get" && data) {
    axiosConfig.params = data;
  }

  try {
    const res = await axios(axiosConfig);
    return res.data;
  } catch (error) {
    console.error("API error:", error);
  }
}
