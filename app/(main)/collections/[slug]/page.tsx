import React from 'react'

const Products = async ({params}: {params: Promise<{slug: string}>}) => {

  const slug = (await params).slug

  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    next: { revalidate: 60 }, // caching optional
  });

  const json = await res.json();
  const allProducts = json.data;

  const data = allProducts.filter((item: ProductType) => item.collectionSlug === slug)

  if(!data){
    return <p>No Data Found in this Collection</p>
  }

  return (
    <main>
      
    </main>
  )
}

export default Products
