import tw from '@tailwind'

import { Actions, AuthorName } from './components'

import type { TweetLayoutComponent } from './types'

const TweetLayout: TweetLayoutComponent = ({
    children,
    name,
    createdAt,
    isRetweet = false
}) => (
    <>
        <section className={tw`flex flex-col flex-1 pl-3`}>
            <AuthorName name={name} createdAt={createdAt} />
            {children}
            {!isRetweet && <Actions />}
        </section>
    </>
)

export default TweetLayout
