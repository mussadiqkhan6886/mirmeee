import React from "react";
import Products from "./Products";

const Formals = async () => {
    
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    next: { revalidate: 60 }, // caching optional
  });

  const json = await res.json();
  const allProducts = json.data;

  const bundleProducts = allProducts.filter((p: ProductType) => p.collection.toLowerCase() === "formals");

  return (
    <section>
      <Products data={bundleProducts} heading="Formals For You" />
    </section>
  );
};

export default Formals;
