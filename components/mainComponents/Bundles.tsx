import React from "react";
import Products from "./Products";

const Bundles = async () => {
    
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    next: { revalidate: 60 }, // caching optional
  });

  const json = await res.json();
  const allProducts = json.data;

  // Filter bundles only
  const bundleProducts = allProducts.filter((p: ProductType) => p.bundle === true);

  return (
    <section>
      <Products data={bundleProducts} heading="Bundles For You" />
    </section>
  );
};

export default Bundles;
