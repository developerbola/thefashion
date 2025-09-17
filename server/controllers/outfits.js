import { databases, storage } from "../db/appwrite.js";

const DATABASE_ID = "68bd963e0029cafcaaba";
const COLLECTION_ID = "products";
const BUCKET_ID = "68bd93ed002a08ae0fd0";
import { Query } from "node-appwrite";

async function addOutfit(c) {
  try {
    const form = await c.req.formData();
    const name = form.get("name");
    const price = parseFloat(form.get("price"));
    const file = form.get("image");

    if (!name || !price || !file) {
      return c.json({ error: "Name, price, and image are required" }, 400);
    }

    const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("name", name),
    ]);

    if (existing.total > 0) {
      return c.json({ error: "Outfit with this name already exists" }, 400);
    }

    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      `outfit-${name}`,
      file
    );

    const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      { name, price, imageUrl }
    );

    return c.json(doc);
  } catch (err) {
    console.error("Add outfit error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function deleteOutfit(c) {
  const id = c.req.param("id");
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return c.json({ message: "Outfit deleted succesfully" });
  } catch (err) {
    console.error("Delete outfit error: ", err);
    if (err.code === 404) {
      return c.json({ error: "Outfit not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function updateOutfit(c) {
  const id = c.req.param("id");
  const body = await c.req.json();
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      body
    );
    return c.json(updated);
  } catch (err) {
    console.error("Update outfit error: ", err);
    if (err.code == 404) {
      return c.json({ error: "Outfit not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function getOutfits(c) {
  try {
    const list = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return c.json(list.documents);
  } catch (err) {
    console.error("Get outfits error: ", err);
    return c.json({ error: err.message }, 500);
  }
}

async function getSingleOutfit(c) {
  try {
    const name = c.req.param("name");

    const outfit = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      name
    );

    return c.json(outfit, 200);
  } catch (err) {
    console.error("Get single outfit error: ", err);
    return c.json({ error: "Outfit not found" }, 404);
  }
}

export { addOutfit, deleteOutfit, updateOutfit, getOutfits, getSingleOutfit };
