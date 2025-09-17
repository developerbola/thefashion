import { databases, storage } from "../db/appwrite.js";
import { nanoid } from "nanoid";

const DATABASE_ID = "68bd963e0029cafcaaba";
const COLLECTION_ID = "products";
const BUCKET_ID = "68bd93ed002a08ae0fd0";

async function addProduct(c) {
  try {
    const form = await c.req.formData();
    const name = form.get("name");
    const price = parseFloat(form.get("price"));
    const file = form.get("image");
    console.log(form);

    if (!name || !price || !file) {
      return c.json({ error: "Name, price, and image are required" }, 400);
    }

    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      `product-${nanoid()}`,
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
    console.error("Add product error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function deleteProduct(c) {
  const id = c.req.param("id");
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return c.json({ message: "Product deleted succesfully" });
  } catch (err) {
    console.error("Delete product error: ", err);
    if (err.code === 404) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function updateProduct(c) {
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
    console.error("Update product error: ", err);
    if (err.code == 404) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json({ error: err.message }, 500);
  }
}

async function getProducts(c) {
  try {
    const list = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return c.json(list.documents);
  } catch (err) {
    console.error("Get products error: ", err);
    return c.json({ error: err.message }, 500);
  }
}

export async function getSingleProduct(c) {
  try {
    const name = c.req.param("name");

    const product = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      name
    );

    return c.json(product, 200);
  } catch (err) {
    console.error("Get single product error: ", err);
    return c.json({ error: "Product not found" }, 404);
  }
}

export {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
};
