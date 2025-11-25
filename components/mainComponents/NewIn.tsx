import React from "react";
import Products from "./Products";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

const NewIn = async () => {
    
   await connectDB()
      
    const res = await Product.find().lean();
  
    const allProducts = JSON.parse(JSON.stringify(res));
  

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter products created in last 7 days
  const newInProducts = allProducts.filter((p: ProductType) => {
    return new Date(p.createdAt) >= sevenDaysAgo;
  });

  return (
    <section id="newArrivals">
      <Products data={newInProducts} heading="New In" />
    </section>
  );
};

export default NewIn;
