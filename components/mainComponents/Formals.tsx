import React from "react";
import Products from "./Products";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

export const fetchCache = 'no-store'; 

const Formals = async () => {
 
  await connectDB()
    
  const res = await Product.find(
    { collection: { $regex: /^formals$/i } } // case-insensitive "formals"
  ).limit(6).lean();

  const formatProducts = JSON.parse(JSON.stringify(res));

  return (
    <section>
      <Products data={formatProducts} heading="Formals For You" />
    </section>
  );
};

export default Formals;

