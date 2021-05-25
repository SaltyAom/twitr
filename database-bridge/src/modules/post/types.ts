export interface PostBody {
    id: number
    content: string
    images: string[]
}

export interface FavBody {
    userId: number
    postId: number
}

export interface ShareBody {
    userId: number
    postId: number
}

export interface GetPostParam {
    id: string
}