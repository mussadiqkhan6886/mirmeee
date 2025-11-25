import React from "react";
import Products from "./Products";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

export const fetchCache = 'no-store'; 

const NewIn = async () => {
    
   await connectDB()
      
     const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const res = await Product.find({ createdAt: { $gte: sevenDaysAgo } })
                           .sort({ createdAt: -1 })
                           .limit(4)
                           .lean();

  const newInProducts = JSON.parse(JSON.stringify(res));

  return (
    <section id="newArrivals">
      <Products data={newInProducts} heading="New In" />
    </section>
  );
};

export default NewIn;
