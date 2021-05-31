import { ProfileImage } from '@components/atoms'

import tw from '@tailwind'

import { PostLayout, TweetLayout } from './layouts'

import type { PostComponent } from './types'

const Post: PostComponent = ({
    post: {
        content,
        createdAt,
        author: {
            profile,
            profile: { name }
        },
        retweetFromPost
    },
    isRetweet = false
}) => {
    return (
        <PostLayout isRetweet={isRetweet}>
            <ProfileImage profile={profile} />
            <TweetLayout
                name={name}
                createdAt={createdAt}
                isRetweet={isRetweet}
            >
                {!!content && (
                    <>
                        <p className={tw`text-md text-gray-600 my-1`}>
                            {content}
                        </p>
                        {typeof retweetFromPost !== 'undefined' &&
                        retweetFromPost !== null ? (
                            <Post isRetweet post={retweetFromPost} />
                        ) : null}
                    </>
                )}
            </TweetLayout>
        </PostLayout>
    )
}

export default Post
