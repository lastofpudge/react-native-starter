export interface IPost {
  id: number
  title: string
  body?: string
}

export const PostService = {
  async getPosts(limit: number = 5): Promise<IPost[]> {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`).then((res) =>
      res.json()
    )
  }
}
