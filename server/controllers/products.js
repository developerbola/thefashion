const { databases, storage } = require("../db/appwrite");
const { nanoid } = require("nanoid");

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

    // Upload image to Appwrite storage
    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      `product-${nanoid()}`,
      file
    );

    const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    // Create product document
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

async function getProducts(c) {
  try {
    const list = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return c.json(list.documents);
  } catch (err) {
    console.error("Get products error:", err);
    return c.json({ error: err.message }, 500);
  }
}

module.exports = { addProduct, getProducts };
