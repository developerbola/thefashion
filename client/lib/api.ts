import axios from "axios";
const baseURL = "http://thefashion-s3cu.vercel.app/api";

export async function api(method: string, path: string, data = null) {
  const url = `${baseURL}${path}`;
  const headers = {
    "Content-Type": "application/json",
  };

  let axiosConfig: any = {
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
