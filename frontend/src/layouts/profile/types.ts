import type { FunctionComponent } from "react"

import type { Profile } from "@typings/profile"

export type ProfileProps = Profile & { id: number }

export type ProfileComponent = FunctionComponent<ProfileProps>