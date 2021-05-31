import type { FunctionComponent } from "react"

import type { UserPost } from "@typings"

export interface PostProps {
    post: UserPost
    isRetweet?: boolean
}

export type PostComponent = FunctionComponent<PostProps>
