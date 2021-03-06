export interface ProfileBody {
    id: string
}

export interface GetUserPostParam {
    id: string
    pagination: string
}

export interface FollowBody {
    from: number
    to: number
}

export interface FollowingParam {
    id: string
    pagination: string
}

export interface FollowedByParam {
    id: string
    pagination: string
}

export interface FeedParam {
    id: string
    pagination: string
}