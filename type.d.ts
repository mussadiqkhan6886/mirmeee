interface Product {
  collection: string,
  collectionSlug: string
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  onSale: boolean;
  images: string[];
  colors: string[];
  size: string[]
  slug: string;
  inStock: boolean;
  stock: number
  _id: string; // MongoDB document ID
}

interface reviewType {
  _id: string
  designation: string
  name: string
  message: string
}
