import tw from '@tailwind'

import type { PostLayoutComponent } from './types'

const PostLayout: PostLayoutComponent = ({ children, isRetweet = false }) => (
    <article
        className={tw(
            `flex flex-col w-full p-4 ${
                isRetweet ? 'my-2 border rounded' : 'pb-2 border-0 border-b'
            } border-solid border-gray-200`
        )}
    >
        <section className={tw`flex flex-row w-full`}>{children}</section>
    </article>
)

export default PostLayout
