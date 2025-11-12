// Interfaces
export interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

export interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
  creationAt: string
  updatedAt: string
}

// Props
export interface ProductsSectionProps {
  products: Product[]
  isLoading?: boolean
  isAuthenticated?: boolean
}
