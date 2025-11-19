"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    newPrice: "",
    onSale: false,
    colors: [] as string[],
    images: [] as string[],
    slug: "",
    inStock: true,
    stock: ""
  });

  const router = useRouter();

  // 🔹 Fetch product and category info
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = (await params).id;
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data.product;
        
        setData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          newPrice: product.newPrice || "",
          onSale: product.onSale || false,
          colors: product.colors || [],
          images: product.images || [],
          slug: product.slug || "",
          inStock: product.inStock || false,
          stock: product.stock
        });

        setExistingImages(product.images || []);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, []);

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
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

  const handleDeleteExistingImage = async (imgUrl: string) => {
    try {
      const id = (await params).id;
      setExistingImages((prev) => prev.filter((url) => url !== imgUrl));
      await axios.patch(`/api/products/${id}`, {
        action: "deleteImage",
        imageUrl: imgUrl,
      });
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { id } = await params;
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else if (value) {
          formData.append(key, value as string);
        }
      });

      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressed);
      }

      const res = await axios.patch(`/api/products/${id}`, formData);

      if (res.status === 200) {
        setResult("✅ Product updated successfully!");
        setTimeout(() => router.push("/admin-dashboard/products-list"), 1500);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setResult("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>

      <form className="grid gap-4 w-full md:w-[50%]" onSubmit={handleSubmit}>
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

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Existing Images:</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, i) => (
                <div key={i} className="relative">
                  <Image src={url} width={90} height={90} alt="Existing" className="rounded border object-cover w-24 h-24" />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(url)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images */}
        <div>
          <label>Upload New Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border rounded p-2" />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {previews.map((url, i) => (
                <Image key={i} src={url} width={80} height={80} alt="Preview" className="w-20 h-20 object-cover border rounded" />
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 mt-4 rounded">
          {loading ? "Updating..." : "Update Product"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default UpdateProduct;
