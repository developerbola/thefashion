import { cors } from "hono/cors";

const useCors = (app) => {
  app.use(
    "/*",
    cors({
      origin: [
        "http://localhost:3000/",
        "http://localhost:3000",
        "https://thefashion.vercel.app/",
        "https://thefashion.vercel.app",
      ],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );
};

export default useCors;
