import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

const useRoutes = (app) => {
  app.post("/products", addProduct);
  app.put("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
  app.get("/products", getProducts);

  app.get("/", (c) => {
    return c.json({ message: "tf. backend is running." }, 200);
  });
};

export default useRoutes;
