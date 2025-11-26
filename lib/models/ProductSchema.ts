import mongoose from "mongoose";

const productSubSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  collectionSlug: { type: String, required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  inStock: {type: Boolean, default: true, required: true},
  images: { type: [String], required: true },
  variants: [
    {
      color: { type: String, default: null }, // optional
      size: { type: String, default: null },  // optional
      stock: { type: Number, default: 0 },
    }
  ],
  slug: {type: String, required: true}, 
  bundle: {type: Boolean, default: false},
},
{ timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSubSchema);
