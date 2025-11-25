import HeaderProduct from '@/components/mainComponents/HeaderProduct';
import { collectionsData } from '@/lib/constants';
import React from 'react';
import SortWrapper from '@/components/mainComponents/Sorting';

// export async function generateMetadata(
//   { params }: { params: Promise<{ slug: string }> }
// ): Promise<Metadata> {
//   const { slug } = await params;
//   const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

//   return {
//     title: formattedTitle + " M&Z Store", // optional: format the slug
//   };
// }

const Products = async ({params}: {params: Promise<{slug: string}>}) => {

  const slug = (await params).slug

  let data = collectionsData.find(item => item.link === slug)

  if (!data) {
  return (
    <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-24">
      <p className="text-center text-gray-500 my-10">
        Collection not found.
      </p>
    </main>
  );
}

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      next: { revalidate: 60 }, // caching optional
  });

  const json = await res.json();
  const allProducts = json.data;

  let productData;

  if (slug === "all") {
    productData = allProducts;
  } else {
    productData = allProducts.filter((item: ProductType) => item.collectionSlug === slug)
  }


  if (!productData || productData.length === 0) {
    return (
      <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-18">
        <HeaderProduct title={data.title} desc={data.description} />
        <p className="text-center text-gray-500 my-10">
          No products found in this collection.
        </p>
      </main>
    );
  }


  return (
    <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-18">
      <HeaderProduct title={data.title} desc={data.description} />
      <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
        Disclaimer: Colour may slightly differ from the actual picture due to lighting
        and the device being used to view it.
      </p>

      <div className="mb-10 relative">
        <p className="absolute top-3 md:top-5">{productData.length} Products</p>
        <div>
          <SortWrapper key={slug} products={productData} slug={slug} />
        </div>
      </div>
    </main>
  );
};

export default Products
