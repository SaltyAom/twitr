import tw, { combine } from '@services/tailwind'
import { isSafari } from '@services/validation'

import { Tab } from './components'

import styles from './feed.module.sass'

import type { FeedComponent } from './types'

export const FeedLayout: FeedComponent = ({ children, id }) => (
    <section
        className={combine(
            tw`relative flex flex-col bg-white rounded shadow-sm`,
            styles.feed
        )}
    >
        <div
            className={tw(
                `sticky block ${
                    !isSafari ? 'top-[96px]' : 'top-[64px]'
                } h-[0px] z-10 w-full overflow-visible`
            )}
        >
            <div className={tw`w-full bg-gray-100 h-[40px] rounded`} />
        </div>
        <aside
            className={tw(
                `flex flex-row items-end sticky z-20 ${
                    !isSafari ? 'top-[120px]' : 'top-[88px]'
                } w-full border-0 border-b border-solid rounded rounded-b-none border-gray-200 bg-white`
            )}
        >
            <Tab id={id} title="Tweets" href="/" />
            <Tab id={id} title="Tweets & Replies" href="/replies" />
            <Tab id={id} title="Media" href="/media" />
            <Tab id={id} title="Like" href="/like" />
        </aside>
        <main>{children}</main>
    </section>
)
