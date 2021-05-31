export interface Profile {
    profile: {
        name: string
        bio: string | null
        image: string | null
        joinedAt: string
    }
    totalFollowing: number
    totalFollowedBy: number
}