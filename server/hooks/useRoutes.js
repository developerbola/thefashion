const { getProducts, addProduct } = require("../controllers/products");

const useRoutes = (app) => {
  app.get("/products", getProducts);
  app.post("/products", addProduct);
};

module.exports = useRoutes;
