import type { Product } from "@/types/products"


export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

// Composable para obtener productos con paginación
export const useProducts = () => {
  const config = useRuntimeConfig()
  const apiBaseUrl = 'https://api.escuelajs.co/api/v1'

  // Obtener lista de productos con paginación
  const getProducts = async (page = 1, limit = 12) => {
    const offset = (page - 1) * limit

    const { data, error, pending, refresh } = await useFetch<Product[]>(
      `${apiBaseUrl}/products`,
      {
        query: {
          offset,
          limit
        },
        // SSR habilitado por defecto
        server: true,
        // Cachear la respuesta
        key: `products-${page}-${limit}`,
      }
    )

    return {
      data,
      error,
      pending,
      refresh
    }
  }

  // Obtener un producto específico por ID
  const getProductById = async (id: string | number) => {
    const { data, error, pending } = await useFetch<Product>(
      `${apiBaseUrl}/products/${id}`,
      {
        server: true,
        key: `product-${id}`
      }
    )

    return {
      data,
      error,
      pending
    }
  }


  return {
    getProducts,
    getProductById,
  }
}