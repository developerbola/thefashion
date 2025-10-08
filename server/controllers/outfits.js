import { databases, storage } from "../db/appwrite.js";

const DATABASE_ID = "68bd963e0029cafcaaba";
const COLLECTION_ID = "products";
const BUCKET_ID = "68bd93ed002a08ae0fd0";
import { Query } from "node-appwrite";

async function addOutfit(c) {
  try {
    const form = await c.req.formData();
    const name = form.get("name");
    const slug = form.get("slug");
    const price = parseFloat(form.get("price"));
    const brand = form.get("brand");
    const description = form.get("description");
    const file = form.get("image");

    if (!name || !price || !file || !brand || !description || !slug) {
      return c.json({ error: "All fields are required" }, 400);
    }

    const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("slug", [slug]),
    ]);

    if (existing.total > 0) {
      return c.json({ error: "Outfit with this slug already exists" }, 400);
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
      { name, price, imageUrl, brand, description, slug }
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

  try {
    const form = await c.req.formData();
    const name = form.get("name");
    const slug = form.get("slug");
    const price = parseFloat(form.get("price"));
    const brand = form.get("brand");
    const description = form.get("description");
    const file = form.get("image");

    if (!name || !price || !brand || !description || !slug) {
      return c.json(
        { error: "Name, brand, description, and price are required" },
        400
      );
    }

    let imageUrl;

    if (file && file.size > 0) {
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        `outfit-${id}-${Date.now()}`,
        file
      );

      imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    }

    const payload = {
      name,
      brand,
      description,
      price,
      slug,
    };

    if (imageUrl) {
      payload.imageUrl = imageUrl;
    }

    const updated = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      payload
    );

    return c.json(updated);
  } catch (err) {
    console.error("Update outfit error:", err);
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
    const slug = c.req.param("slug");
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("slug", [slug]),
      Query.limit(1),
    ]);

    if (response.total === 0) {
      return c.json({ error: "Outfit not found" }, 404);
    }

    return c.json(response.documents[0], 200);
  } catch (err) {
    console.error("Get single outfit error: ", err);
    return c.json({ error: "Outfit not found" }, 404);
  }
}

export { addOutfit, deleteOutfit, updateOutfit, getOutfits, getSingleOutfit };
