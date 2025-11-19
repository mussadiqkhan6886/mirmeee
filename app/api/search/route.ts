import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

export async function GET(req: Request) {
  await connectDB();

  // Extract query string
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  // Search case-insensitively in name or description
  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { collection: { $regex: query, $options: "i" } },
    ],
  });

  return NextResponse.json({ products });
}
