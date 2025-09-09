const { cors } = require("hono/cors");

const useCors = (app) => {
  app.use(
    "/*",
    cors({
      origin: ["http://localhost:3001", "https://thefashion.vercel.app"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );
};

module.exports = useCors;
