"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { collectionsData } from "@/lib/constants"; // adjust path

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [data, setData] = useState({
    collection: "",
    slug: "",
    name: "",
    description: "",     // Product description
    price: "",
    newPrice: "",        // optional
    onSale: false,
    inStock: true,
    colors: [] as string[],
    images: [] as string[],
    stock: ""
  });

  useEffect(() => {
  if (data.name) {
    const slug = data.name
      .toLowerCase()                       // lowercase
      .trim()                               // remove leading/trailing spaces
      .replace(/\s+/g, "-")                 // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, "")           // remove invalid characters
      .replace(/-+/g, "-")                  // replace multiple hyphens with single
      .replace(/^-|-$/g, "");               // remove leading/trailing hyphens
    setData((prev) => ({ ...prev, slug }));
  } else {
    setData((prev) => ({ ...prev, slug: "" }));
  }
}, [data.name]);

  // @ts-ignore
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const updated = [...data.colors];
    updated[index] = value;
    setData({ ...data, colors: updated });
  };

  const addColor = () => setData({ ...data, colors: [...data.colors, ""] });
  const removeColor = (index: number) =>
    setData({ ...data, colors: data.colors.filter((_, i) => i !== index) });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all fields
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Compress images before upload
      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressedFile);
      }

      const res = await axios.post("/api/products", formData);

      if (res.status === 201) {
        setResult("✅ Product added successfully!");
        setData({
          collection: "",
          slug: "",
          name: "",
          description: "",
          price: "",
          newPrice: "",
          onSale: false,
          inStock: false,
          colors: [],
          images: [],
          stock: ""
        });
        setFiles([]);
        setPreviews([]);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form className="grid gap-4 w-full md:w-[50%]" onSubmit={handleSubmit}>
        {/* Collection Select */}
        <div>
          <label className="block font-semibold mb-1">Collection Title</label>
          <select
            name="collection"
            value={data.collection}
            onChange={(e) => setData({ ...data, collection: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select Collection</option>
            {collectionsData.map((col) => (
              <option key={col.slug} value={col.title}>
                {col.title}
              </option>
            ))}
          </select>
        </div>


        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        {/* Slug */}
        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            name="slug"
            value={data.slug}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={data.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            name="stock"
            type="number"
            value={data.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* On Sale */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="onSale"
            checked={data.onSale}
            onChange={handleChange}
          />
          <label className="font-semibold">On Sale</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={data.inStock}
            onChange={handleChange}
          />
          <label className="font-semibold">In Stock</label>
        </div>

        {data.onSale && (
          <div>
            <label className="block font-semibold mb-1">New Price</label>
            <input
              name="newPrice"
              type="number"
              value={data.newPrice}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        )}

        {/* Colors */}
        <div>
          <label className="block font-semibold mb-2">Colors</label>
          {data.colors.map((clr, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={clr}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder={`Color ${i + 1}`}
              />
              <button type="button" onClick={() => removeColor(i)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addColor} className="text-sm text-blue-600">
            + Add Color
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            required
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  width={80}
                  height={80}
                  alt={`Preview ${idx}`}
                  className="w-28 h-28 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 mt-4 rounded"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default AddProduct;
