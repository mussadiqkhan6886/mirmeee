interface ProductType {
  _id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  description: string
  images: string[]
  inStock: boolean
  collection: string
  collectionSlug: string
  bundle: boolean        // 👈 add this
  onSale: boolean
  createdAt: string
  updatedAt: string
  variants: {
    color?: string
    size?: string
    stock: number
  }[]
}


interface reviewType {
  _id: string
  rating: string
  name: string
  message: string
}
