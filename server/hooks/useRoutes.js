const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const useRoutes = (app) => {
  app.post("/products", addProduct);
  app.put("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
  app.get("/products", getProducts);

  app.get("/", (c) => {
    return c.json({ message: "tf. backend is running." }, 200);
  });
  
};

module.exports = useRoutes;
