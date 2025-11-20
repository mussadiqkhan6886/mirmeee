import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/models/ProductSchema";
import { connectDB } from "@/lib/config/database/db";
import cloudinary from "@/lib/config/cloudinary";

export const runtime = "nodejs"; // Required for Cloudinary uploads

export const GET = async () => {
  await connectDB();
  try {
    const res = await Product.find({});
    return NextResponse.json({ message: "Fetched Data", data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 400 });
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const collection = formData.get("collection")?.toString() || "";
    const collectionSlug = formData.get("collectionSlug")?.toString()
    const name = formData.get("name")?.toString() || "";
    const slug = formData.get("slug")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = Number(formData.get("price"));
    const discountPrice = Number(formData.get("discountPrice")) || null;
    const onSale = formData.get("onSale") === "true";
    const colors = formData.getAll("colors").map((c) => c.toString());
    const size = formData.getAll("size").map((c) => c.toString());
    const files = formData.getAll("images");
    const inStock = formData.get("inStock") === "true";
    const bundle = formData.get("bundle") === "true";

    
    if (!collection || !name || !description || !price) {
      throw new Error("Missing required fields");
    }
    
    if (!files || files.length === 0) {
      throw new Error("No images uploaded");
    }

    const uploadedImages: string[] = [];
    
    for (const file of files) {
      if (!(file instanceof File)) {
        throw new Error("Invalid file format");
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "mirmee",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
        });
        
        uploadedImages.push(uploadResult.secure_url);
      }
      
      const newProduct = new Product({
        collection,
        collectionSlug,
        slug,
        name,
        description,
        price,
        size,
        discountPrice,
        onSale,
        colors,
        inStock,
        bundle,
        images: uploadedImages,
    });
    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully!", data: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

