"use client";

import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { collections } from "@/lib/constants";

interface ColorSize {
  name: string;
  stock: number;
}

interface Variant {
  color?: string;
  size?: string;
  stock: number;
}

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [data, setData] = useState({
    collection: "",
    collectionSlug: "",
    slug: "",
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    onSale: false,
    inStock: true,
    images: [] as string[],
    bundle: false,
    colors: [] as ColorSize[],
    sizes: [] as ColorSize[],
    variants: [] as Variant[],
  });

  // Slug generator
  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  // Auto computed slugs
  const productSlug = useMemo(() => toSlug(data.name), [data.name]);
  const collectionSlug = useMemo(() => toSlug(data.collection), [data.collection]);

  // Update slugs into state ONLY when needed
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      slug: productSlug,
      collectionSlug: collectionSlug,
    }));
  }, [productSlug, collectionSlug]);

  // Auto-generate variants whenever colors or sizes change
  useEffect(() => {
    const newVariants: Variant[] = [];

    if (data.colors.length && data.sizes.length) {
      data.colors.forEach((color) => {
        data.sizes.forEach((size) => {
          newVariants.push({
            color: color.name,
            size: size.name,
            stock: Math.min(color.stock, size.stock), // or customize logic
          });
        });
      });
    } else if (data.colors.length) {
      data.colors.forEach((color) => newVariants.push({ color: color.name, stock: color.stock }));
    } else if (data.sizes.length) {
      data.sizes.forEach((size) => newVariants.push({ size: size.name, stock: size.stock }));
    } else {
      newVariants.push({ stock: 0 });
    }

    setData((prev) => ({ ...prev, variants: newVariants }));
  }, [data.colors, data.sizes]);

  // Generic input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle color/size changes
  const handleColorChange = (index: number, field: "name" | "stock", value: string | number) => {
    const updated = [...data.colors];
    // @ts-ignore
    updated[index][field] = field === "stock" ? Number(value) : String(value);
    setData({ ...data, colors: updated });
  };

  const handleSizeChange = (index: number, field: "name" | "stock", value: string | number) => {
    const updated = [...data.sizes];
    // @ts-ignore
    updated[index][field] = field === "stock" ? Number(value) : String(value);
    setData({ ...data, sizes: updated });
  };

  // Add/remove color or size
  const addColor = () => setData({ ...data, colors: [...data.colors, { name: "", stock: 0 }] });
  const addSize = () => setData({ ...data, sizes: [...data.sizes, { name: "", stock: 0 }] });
  const removeColor = (index: number) => setData({ ...data, colors: data.colors.filter((_, i) => i !== index) });
  const removeSize = (index: number) => setData({ ...data, sizes: data.sizes.filter((_, i) => i !== index) });

  // Image selection & previews
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all fields
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, JSON.stringify(item)));
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
          collectionSlug: "",
          slug: "",
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          onSale: false,
          inStock: true,
          images: [],
          bundle: false,
          colors: [],
          sizes: [],
          variants: [],
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
        {/* Collection */}
        <div>
          <label className="block font-semibold mb-1">Collection Title</label>
          <select
            name="collection"
            value={data.collection}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select Collection</option>
            {collections.slice(0, 7).map((col) => (
              <option key={col.link} value={col.title}>
                {col.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Collection Slug</label>
          <input
            name="collectionSlug"
            value={data.collectionSlug}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Product Name & Slug */}
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

        {/* Checkboxes */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="onSale" checked={data.onSale} onChange={handleChange} />
          <label className="font-semibold">On Sale</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="inStock" checked={data.inStock} onChange={handleChange} />
          <label className="font-semibold">In Stock</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="bundle" checked={data.bundle} onChange={handleChange} />
          <label className="font-semibold">Bundle</label>
        </div>

        {data.onSale && (
          <div>
            <label className="block font-semibold mb-1">Discount Price</label>
            <input
              name="discountPrice"
              type="number"
              value={data.discountPrice}
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
                value={clr.name}
                onChange={(e) => handleColorChange(i, "name", e.target.value)}
                placeholder={`Color ${i + 1}`}
                className="border rounded-lg p-2 w-32"
              />
              <input
                type="number"
                value={clr.stock}
                onChange={(e) => handleColorChange(i, "stock", e.target.value)}
                placeholder="Stock"
                className="border rounded-lg p-2 w-20"
                min={0}
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
        {/* Sizes */}
       {/* {(data.collection === "Formals") && (<div>
          <label className="block font-semibold mb-2">Sizes</label>
          {data.sizes.map((sz, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={sz.name}
                onChange={(e) => handleSizeChange(i, "name", e.target.value)}
                placeholder={`Size ${i + 1}`}
                className="border rounded-lg p-2 w-32"
              />
              <input
                type="number"
                value={sz.stock}
                onChange={(e) => handleSizeChange(i, "stock", e.target.value)}
                placeholder="Stock"
                className="border rounded-lg p-2 w-20"
                min={0}
              />
              <button type="button" onClick={() => removeSize(i)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addSize} className="text-sm text-blue-600">
            + Add Size
          </button>
        </div>)} */}

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <input type="file" multiple accept="image/*" required onChange={handleImageChange} className="w-full border rounded-lg p-2" />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((url, idx) => (
                <Image key={idx} src={url} width={80} height={80} alt={`Preview ${idx}`} className="w-28 h-28 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 mt-4 rounded">
          {loading ? "Uploading..." : "Add Product"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default AddProduct;
