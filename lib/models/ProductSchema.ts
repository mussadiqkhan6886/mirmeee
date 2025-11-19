import mongoose from "mongoose";

const productSubSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: {type: Number, required: true},
  newPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  inStock: {type: Boolean, default: true, required: true},
  images: { type: [String], required: true },
  colors: { type: [String], default: [] },
  slug: {type: String, required: true},
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSubSchema);
