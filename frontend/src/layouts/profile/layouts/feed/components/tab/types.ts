import type { FunctionComponent } from "react"

import { FeedProps } from "../../types"

export interface TabProps extends FeedProps {
    title: string
    href: string
}

export type TabComponent = FunctionComponent<TabProps>
