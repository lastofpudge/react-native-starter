export interface IPost {
  id: number
  title: string
  body?: string
}

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const PostService = {
  async getPosts(limit = 5): Promise<IPost[]> {
    return fetch(`${API_URL}/posts?_limit=${limit}`).then((res) => res.json())
  }
}
