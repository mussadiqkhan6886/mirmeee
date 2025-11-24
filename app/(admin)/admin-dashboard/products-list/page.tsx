'use client';

import ProductTable from "@/components/adminComp/ProductTable";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        setProducts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  console.log(products)

  return (
    <div className="p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Product List</h1>
      <ProductTable products={products} />
    </div>
  );
}
