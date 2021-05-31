import type { FunctionComponent } from 'react'

import type { AuthorProfile } from '@typings/post'

export interface ProfileImageProps {
    profile: AuthorProfile
    large?: boolean
}

export type ProfileImageComponent = FunctionComponent<ProfileImageProps>
