import { supabase } from "../db/supabase.js";

const TABLE_NAME = "watches";
const BUCKET_NAME = "images";

async function addWatch(c) {
  try {
    const form = await c.req.formData();
    const name = form.get("name");
    const slug = form.get("slug");
    const brand = form.get("brand");
    const description = form.get("description");
    const price = parseFloat(form.get("price"));
    const file = form.get("image");

    if (!name || !price || !file) {
      return c.json({ error: "Name, price, and image are required" }, 400);
    }

    // Check if name already exists
    const { data: existing } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .eq('name', name)
      .single();

    if (existing) {
      return c.json({ error: "Watch with this name already exists" }, 400);
    }

    // Upload image to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `watch-${slug}-${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return c.json({ error: "Failed to upload image" }, 500);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    // Insert into database
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        name,
        slug,
        price,
        brand,
        description,
        image_url: publicUrl
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return c.json({ error: error.message }, 500);
    }

    // Transform to match client expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url
    };

    return c.json(transformedData);
  } catch (err) {
    console.error("Add watch error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function deleteWatch(c) {
  const id = c.req.param("id");
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete error:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ message: "Watch deleted successfully" });
  } catch (err) {
    console.error("Delete watch error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function updateWatch(c) {
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
      const fileExt = file.name.split('.').pop();
      const fileName = `watch-${id}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return c.json({ error: "Failed to upload image" }, 500);
      }

      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    const updateData = {
      name,
      brand,
      description,
      price,
      slug,
    };

    if (imageUrl) {
      updateData.image_url = imageUrl;
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return c.json({ error: error.message }, 500);
    }

    // Transform to match client expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url
    };

    return c.json(transformedData);
  } catch (err) {
    console.error("Update watch error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function getWatches(c) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*');

    if (error) {
      console.error("Get watches error:", error);
      return c.json({ error: error.message }, 500);
    }

    // Transform to match client expectations
    const transformedData = data.map(item => ({
      ...item,
      imageUrl: item.image_url
    }));

    return c.json(transformedData);
  } catch (err) {
    console.error("Get watches error:", err);
    return c.json({ error: err.message }, 500);
  }
}

async function getSingleWatch(c) {
  try {
    const slug = c.req.param("slug");
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error("Get single watch error:", error);
      if (error.code === 'PGRST116') {
        return c.json({ error: "Watch not found" }, 404);
      }
      return c.json({ error: error.message }, 500);
    }

    // Transform to match client expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url
    };

    return c.json(transformedData, 200);
  } catch (err) {
    console.error("Get single watch error: ", err);
    return c.json({ error: err.message }, 500);
  }
}

export { addWatch, deleteWatch, updateWatch, getWatches, getSingleWatch };
