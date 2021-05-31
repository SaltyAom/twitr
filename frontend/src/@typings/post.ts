export interface AuthorProfile {
    id: number
    name: string
    image: string | null
}

export interface Author {
    profile: AuthorProfile
}

export interface Post {
    id: number
    content: string | null
    images: string[]
    createdAt: string
    author: Author
    retweetFromPost?: Post | null
}

export type UserPost = Post
export type UserPosts = UserPost[]

export interface PostBridge {
    post: UserPosts
}
