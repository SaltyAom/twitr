export interface PostBody {
    id: number
    content: string
    images: string[]
}

export interface RetweetBody extends Omit<PostBody, 'id'> {
    userId: number
    postId: number
}

export interface FavBody {
    userId: number
    postId: number
}

export interface GetPostParam {
    id: string
}