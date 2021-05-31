import type { FunctionComponent } from 'react'

export interface PostLayoutProps {
    isRetweet?: boolean
}

export type PostLayoutComponent = FunctionComponent<PostLayoutProps>
