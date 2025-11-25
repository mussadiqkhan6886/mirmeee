import React from "react";
import Products from "./Products";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

const Formals = async () => {
 
  await connectDB()
    
  const res = await Product.find().lean();

  const allProducts = JSON.parse(JSON.stringify(res));


  const formatProducts = allProducts.filter((p: ProductType) => p.collection.toLowerCase() === "formals");

  return (
    <section>
      <Products data={formatProducts} heading="Formals For You" />
    </section>
  );
};

export default Formals;
