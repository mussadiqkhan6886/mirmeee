import Image from 'next/image';
import Link from 'next/link';

type Props = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  slug: string;
  discountPrice: number;
  onSale: boolean;
  oldSlug?: string;
  inStock: boolean;
  stock: number
};

const ProductCard = ({
  _id,
  name,
  images,
  price,
  slug,
  discountPrice,
  onSale,
  oldSlug,
  inStock,
  stock,
}: Props) => {

  const content = (
    <>
      <div className="overflow-hidden h-[200px] md:h-[400px] relative">
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium z-10">
            Out of Stock
          </div>
        )}
        <Image
          src={images[0]}
          alt={name}
          width={400}
          height={420}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105 ${
            !inStock ? 'opacity-60' : ''
          }`}
        />
      </div>

      <div className="text-center mt-3">
        <h3 className="tracking-widest md:uppercase text-[12px] md:text-sm mb-1">{name}</h3>
        <h4 className="text-gray-700">
          {onSale ? (
            <span>
              <span className="line-through text-sm opacity-85">Rs. {price}</span>{' '}
              <span className="font-medium text-[17px]">Rs. {discountPrice}</span>{' '}
              <span className="text-red-500 inline-block ml-4">
                Save Rs. {price - discountPrice!}
              </span>
            </span>
          ) : (
            'Rs.' + price
          )}
        </h4>
        <h4 className='flex items-center justify-center gap-1 my-1 text-sm'> {inStock ? <span className="w-2 h-2 inline-block bg-green-500 rounded-full"></span> : <span className="w-2 h-2 inline-block bg-red-500 rounded-full"></span>} Stock : {stock} Available</h4>
      </div>
    </>
  );

  return (
    <div
      className="relative group cursor-pointer overflow-hidden transition-all duration-300"
    >
      {inStock ? (
        <Link href={`${oldSlug}/${slug}`}>{content}</Link>
      ) : (
        <div className="cursor-not-allowed">{content}</div>
      )}
    </div>
  );
};

export default ProductCard;
