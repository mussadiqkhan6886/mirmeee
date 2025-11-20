import React from "react";
import Products from "./Products";

const NewIn = async () => {
    
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    next: { revalidate: 60 }, // caching optional
  });

  const json = await res.json();
  const allProducts = json.data;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter products created in last 7 days
  const newInProducts = allProducts.filter((p: ProductType) => {
    return new Date(p.createdAt) >= sevenDaysAgo;
  });

  return (
    <section>
      <Products data={newInProducts} heading="New In" />
    </section>
  );
};

export default NewIn;
