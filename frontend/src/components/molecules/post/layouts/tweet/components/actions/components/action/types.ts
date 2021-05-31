import type { FunctionComponent } from 'react'

import type { Icon } from 'react-feather'

export interface ActionProps {
    Icon: Icon
    value?: string | number
    onClick: () => void
}

export type ActionComponent = FunctionComponent<ActionProps>
