"use client";
import { api } from "@/lib/api";
import { useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await api("post", "/products", formData);
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Product name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="w-full"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
}
