import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/outfits.js";

import {
  addWatch,
  deleteWatch,
  getSingleWatch,
  getWatches,
  updateWatch,
} from "../controllers/watches.js";

const useRoutes = (app) => {
  // Outfits
  app.post("/outfits", addProduct);
  app.put("/outfits/:id", updateProduct);
  app.delete("/outfits/:id", deleteProduct);
  app.get("/outfits", getProducts);
  app.get("/outfits/:name", getSingleProduct);

  // Watches
  app.post("/watches", addWatch);
  app.put("/watches/:id", updateWatch);
  app.delete("/watches/:id", deleteWatch);
  app.get("/watches", getWatches);
  app.get("/watches/:name", getSingleWatch);

  app.get("/", (c) => {
    return c.json({ message: "tf. backend is running." }, 200);
  });
};

export default useRoutes;
