import React from 'react'

const SingleProduct = async ({params}: {params: Promise<{id: string}>}) => {

  const {id} = await params;
 const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
    next: { revalidate: 60 }, // caching optional
  });

  const jsn = await res.json();
  const allProducts = jsn.product;
  console.log(allProducts)

  return (
    <div>
      
    </div>
  )
}

export default SingleProduct
