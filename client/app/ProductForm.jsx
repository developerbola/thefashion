"use client";
import { useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewSrc(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !price || !imageFile) {
      setMessage({
        type: "error",
        text: "Name, price and image are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      setMessage({ type: "success", text: "Product added successfully." });
      // reset form
      setName("");
      setPrice("");
      setImageFile(null);
      setPreviewSrc(null);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {message && (
        <div
          className={
            "mb-4 px-4 py-2 rounded " +
            (message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700")
          }
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Product name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 p-2"
            placeholder="e.g. Blue Sneakers"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Price (USD)</span>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 p-2"
            placeholder="e.g. 49.99"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Product image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-600"
          />
        </label>

        {previewSrc && (
          <div className="mt-2">
            <span className="text-sm text-gray-600">Preview</span>
            <div className="mt-2">
              <img
                src={previewSrc}
                alt="preview"
                className="w-48 h-48 object-cover rounded-md border"
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex justify-center items-center px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
