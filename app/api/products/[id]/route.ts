  import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/config/cloudinary"
import { Product } from "@/lib/models/ProductSchema"
import { connectDB } from "@/lib/config/database/db"

export const GET = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const {id} = await params
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({message: "Product Found", product}, {status: 200})
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  const id = (await params).id;

  try {
    const contentType = req.headers.get("content-type");

    // 1️⃣ Handle image deletion
    if (contentType?.includes("application/json")) {
          const body = await req.json();
          if (body.action === "deleteImage") {
            await Product.findByIdAndUpdate(id, { $pull: { images: body.imageUrl } });
            return NextResponse.json({ success: true });
          }
        }

    // 2️⃣ Handle form data update
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const newPrice = formData.get("newPrice") ? Number(formData.get("newPrice")) : null;
    const stock = Number(formData.get("stock"))
    const onSale = formData.get("onSale") === "true";
    const colors = formData.getAll("colors").map(c => c.toString());
    const slug = formData.get("slug") as string
    const inStock = formData.get("inStock") === "true";
    const files = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];

    for (const file of files) {
         if (typeof file === "string" || !file?.arrayBuffer) {
          console.log("Skipping invalid file:", file);
          continue; // Skip invalid entries
        }
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "mzstore" }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }).end(buffer);
      });
      uploadedImages.push((uploadRes as any).secure_url);
    }

     // 🔹 Fetch existing product to merge images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Merge existing images with newly uploaded images
    const updatedImages = [...existingProduct.images, ...uploadedImages];

    // Build update object
    const updateQuery = {
      name,
      slug,
      description,
      price,
      stock,
      newPrice,
      onSale,
      colors,
      inStock,
      images: updatedImages, // just overwrite with merged array
    };

    // Update in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updateQuery, { new: true });

    return NextResponse.json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: err.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const id = (await params).id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
};
