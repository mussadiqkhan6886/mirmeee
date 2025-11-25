import React from "react";
import Products from "./Products";
import { connectDB } from "@/lib/config/database/db";
import { Product } from "@/lib/models/ProductSchema";

export const revalidate = 60;

const Formals = async () => {
 
  await connectDB()
    
  const res = await Product.find(
    { collection: { $regex: /^formals$/i } } // case-insensitive "formals"
  ).lean();

  const formatProducts = JSON.parse(JSON.stringify(res));

  return (
    <section>
      <Products data={formatProducts} heading="Formals For You" />
    </section>
  );
};

export default Formals;
