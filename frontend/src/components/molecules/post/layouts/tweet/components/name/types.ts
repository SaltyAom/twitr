import type { FunctionComponent } from "react"

import type { Profile } from "@typings"

export interface AuthorNameProps {
    name: Profile['profile']['name']
    createdAt: string
}

export type AuthorNameComponent = FunctionComponent<AuthorNameProps>
