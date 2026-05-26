export interface IProduct {
  id: number
  title: string
  price: number
  image: string
  description: string
  category: string
}

export interface ICartItem {
  product: IProduct
  quantity: number
}
