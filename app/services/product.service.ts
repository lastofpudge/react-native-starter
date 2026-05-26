import type { IProduct } from '@/types/product'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const ProductService = {
  getProducts: (): Promise<IProduct[]> => fetch(`${API_URL}/products`).then((r) => r.json()),

  getProduct: (id: number): Promise<IProduct> =>
    fetch(`${API_URL}/products/${id}`).then((r) => r.json()),

  getProductsByCategory: (category: string): Promise<IProduct[]> =>
    fetch(`${API_URL}/products/category/${category}`).then((r) => r.json()),

  getCategories: (): Promise<string[]> =>
    fetch(`${API_URL}/products/categories`).then((r) => r.json())
}
