import type { IProduct } from '@/types/product'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const checkOk = (r: Response) => {
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
  return r
}

export const ProductService = {
  getProducts: (): Promise<IProduct[]> =>
    fetch(`${API_URL}/products`)
      .then(checkOk)
      .then((r) => r.json()),

  getProduct: (id: number): Promise<IProduct> =>
    fetch(`${API_URL}/products/${id}`)
      .then(checkOk)
      .then((r) => r.json()),

  getProductsByCategory: (category: string): Promise<IProduct[]> =>
    fetch(`${API_URL}/products/category/${category}`)
      .then(checkOk)
      .then((r) => r.json()),

  getCategories: (): Promise<string[]> =>
    fetch(`${API_URL}/products/categories`)
      .then(checkOk)
      .then((r) => r.json())
}
