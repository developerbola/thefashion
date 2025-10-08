import {
  addOutfit,
  deleteOutfit,
  getOutfits,
  getSingleOutfit,
  updateOutfit,
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
  app.post("/outfits", addOutfit);
  app.put("/outfits/:id", updateOutfit);
  app.delete("/outfits/:id", deleteOutfit);
  app.get("/outfits", getOutfits);
  app.get("/outfits/:slug", getSingleOutfit);

  // Watches
  app.post("/watches", addWatch);
  app.put("/watches/:id", updateWatch);
  app.delete("/watches/:id", deleteWatch);
  app.get("/watches", getWatches);
  app.get("/watches/:slug", getSingleWatch);

  app.get("/", (c) => {
    return c.json({ message: "tf. backend is running." }, 200);
  });
};

export default useRoutes;
