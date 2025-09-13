import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/outfits.js";

import {
  addWatch,
  deleteWatch,
  getWatches,
  updateWatch,
} from "../controllers/watches.js";

const useRoutes = (app) => {
  // Outfits
  app.post("/outfits", addProduct);
  app.put("/outfits/:id", updateProduct);
  app.delete("/outfits/:id", deleteProduct);
  app.get("/outfits", getProducts);

  // Watches
  app.post("/watches", addWatch);
  app.put("/watches/:id", updateWatch);
  app.delete("/watches/:id", deleteWatch);
  app.get("/watches", getWatches);

  app.get("/", (c) => {
    return c.json({ message: "tf. backend is running." }, 200);
  });
};

export default useRoutes;
