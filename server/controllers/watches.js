import { Query } from "node-appwrite";
import { databases, storage } from "../db/appwrite.js";

const DATABASE_ID = "68bd963e0029cafcaaba";
const COLLECTION_ID = "watches";
const BUCKET_ID = "68bd93ed002a08ae0fd0";

async function addWatch(c) {
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
      return c.json({ error: "Watch with this name is already exists" });
    }

    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      `watch-${name}`,
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
    console.error("Add watch error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function deleteWatch(c) {
  const id = c.req.param("id");
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return c.json({ message: "watch deleted succesfully" });
  } catch (err) {
    console.error("Delete watch error:", err);
    if (err.code === 404) {
      return c.json({ error: "watch not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function updateWatch(c) {
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
    console.error("Update watch error", err);
    if (err.code == 404) {
      return c.json({ error: "watch not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function getWatches(c) {
  try {
    const list = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return c.json(list.documents);
  } catch (err) {
    console.error("Get watches error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function getSingleWatch(c) {
  try {
    const name = c.req.param("name");

    const watch = await databases.getDocument(DATABASE_ID, COLLECTION_ID, name);

    return c.json(watch, 200);
  } catch (err) {
    console.error("Get single watch error: ", err);
    return c.json({ error: "Watch not found" }, 404);
  }
}

export { addWatch, deleteWatch, updateWatch, getWatches, getSingleWatch };
