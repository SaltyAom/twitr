import Link from 'next/link'
import { useRouter } from 'next/router'

import tw from '@tailwind'

import type { TabComponent } from './types'

const Tab: TabComponent = ({ title, href, id }) => {
    let link = `/profile/[id]${href}`
    let asLink = `/profile/${id}${href}`

    let { asPath } = useRouter()

    let isActive = `${asPath}/` === asLink

    return (
        <Link href={link} as={asLink}>
            <a
                className={tw(
                    `text-md lg:text-lg ${
                        isActive
                            ? 'text-blue-500 border-blue-500'
                            : 'text-gray-500 border-transparent'
                    } font-medium m-0 py-4 px-6 md:px-4 lg:px-6 no-underline border-0 border-b-2 border-solid`
                )}
            >
                {title}
            </a>
        </Link>
    )
}

export default Tab
