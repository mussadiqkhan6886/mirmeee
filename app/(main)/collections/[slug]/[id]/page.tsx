import React from 'react'
import ImageProduct from '@/components/mainComponents/ImageProduct';
import AddToCartButton from '@/components/mainComponents/AddToCartButton';
import { Product } from '@/lib/models/ProductSchema';
import { connectDB } from '@/lib/config/database/db';
import HeaderProduct from '@/components/mainComponents/HeaderProduct';
import Link from 'next/link';
import Image from 'next/image';
import { italiano } from '@/lib/fonts';

const ProductPage = async ({params}: {params: Promise<{id: string}>}) => {

  const {id} = await params;

  await connectDB();

 const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
    next: { revalidate: 60 }, // caching optional
  });

  const jsn = await res.json();
  const allProducts = jsn.product;


 const response = await Product.aggregate([
  { $match: { 
      collection: allProducts.collection, 
      slug: { $ne: allProducts.slug } 
    } 
  },
  { $sample: { size: 4 } } // randomly pick 3 products
]);

const products = JSON.parse(JSON.stringify(response))


  const updatedSlug = allProducts.collection
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!allProducts) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 pt-30 sm:pt-44">
      <section className="flex flex-col lg:flex-row gap-8 xl:gap-14">
        {/* LEFT: IMAGES */}
        <ImageProduct images={allProducts.images} name={allProducts.name} />

        <div className="flex-1 pt-10 md:pt-0 flex flex-col gap-6">
          <h1 className={`${italiano.className} text-2xl text-center md:text-left md:text-3xl tracking-widest capitalize`} >{allProducts.name}</h1>
          <div>
           <h2 className="text-gray-700">Rs. {allProducts.onSale ? <span><span className='line-through text-sm opacity-85'>{allProducts.price}</span> <span className='font-medium text-[19px]'>{allProducts.newPrice}</span>  <span className='text-red-500 inline-block ml-4'>save RS {allProducts.price - allProducts.newPrice}</span></span> : allProducts.price }</h2>
            <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>
             <h4 className='flex mt-3 items-center text-gray-700 gap-2 my-1 text-sm'> {allProducts.inStock ? <span className="w-2 h-2 inline-block bg-green-500 rounded-full"></span> : <span className="w-2 h-2 inline-block bg-red-500 rounded-full"></span>} Stock : {allProducts.stock} Available</h4>
             <div className='text-zinc-500 my-3'>
              <h4>Description: </h4>
              <p>{allProducts.description}</p>
             </div>
          </div>
    
          <hr className='opacity-10' />
          {/* Add to Cart */}
         <AddToCartButton id={allProducts._id} images={allProducts.images} price={allProducts.price} onSale={allProducts.onSale} name={allProducts.name} newPrice={allProducts.newPrice} quantity={1} colors={allProducts.colors} stock={allProducts.stock}  />
         
        </div>
      </section>
           <div className='pt-16'>
            <HeaderProduct title='May you like' desc="May You like these awesome related products" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
            {products.length ? products.slice(0,3).map((product: ProductType) => (
              <div  
              key={product._id}
                    className="relative group cursor-pointer overflow-hidden  transition-all duration-300"
                  >
                    <Link href={`/collections/${updatedSlug}/${product.slug}`}>
                    <div className="overflow-hidden h-[200px] md:h-[350px]">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={420}
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
                      />
                    </div>
              
                    {/* Info */}
                    <div className="text-center mt-3">
                      <h3 className="tracking-widest md:uppercase text-[12px] md:text-sm mb-1">{product.name}</h3>
                      <h4 className="text-gray-700">{product.onSale ? <span><span className='line-through text-sm opacity-85'>Rs. {product.price}</span> <span className='font-medium text-[17px]'>Rs. {product.discountPrice}</span>  <span className='text-red-500 inline-block ml-4'>Save Rs. {product.price - product.discountPrice!}</span></span> : "Rs." + product.price }</h4>
                    </div>
                    </Link>
                  </div>
            )) : <div className='text-center text-gray-400'>No Products Found Related</div>}
            </div>
          </div>
    </main>
  );
};

export default ProductPage;

