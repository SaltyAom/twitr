import type { FunctionComponent } from 'react'

import type { AuthorProfile } from '@typings/post'

export interface TweetLayoutProps {
    name: AuthorProfile['name']
    createdAt: string
    isRetweet?: boolean
}

export type TweetLayoutComponent = FunctionComponent<TweetLayoutProps>
