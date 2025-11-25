import React from "react";
import Products from "./Products";
import { Product } from "@/lib/models/ProductSchema";
import { connectDB } from "@/lib/config/database/db";

const Bundles = async () => {

  await connectDB()
    
  const res = await Product.find().lean();

  const allProducts = JSON.parse(JSON.stringify(res));

  // Filter bundles only
  const bundleProducts = allProducts.filter((p: ProductType) => p.bundle === true);

  return (
    <section>
      <Products data={bundleProducts} heading="Bundles For You" />
    </section>
  );
};

export default Bundles;
