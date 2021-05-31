import { FunctionComponent } from 'react'

import type { GetServerSideProps } from 'next'

import { ProfileLayout } from '@layouts'

import { Post } from '@molecules'

import type { Profile } from '@typings/profile'
import type { UserPosts, PostBridge } from '@typings/post'

interface ProfilePageProps {
    id: number
    profile: Profile
    posts: UserPosts
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({
    id,
    profile,
    posts = []
}) => {
    return (
        <ProfileLayout id={id} {...profile}>
            {posts.map((post) => (
                <Post post={post} />
            ))}
        </ProfileLayout>
    )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
    context
) => {
    let {
        query: { id }
    } = context

    let [profile, { post: posts }] = (await Promise.all([
        fetch(`http://localhost:8081/profile/${id}`).then((res) => res.json()),
        fetch(`http://localhost:8081/profile/1/post/${id}`).then((res) =>
            res.json()
        )
    ])) as [Profile, PostBridge]

    return {
        props: {
            id: +id!,
            profile,
            posts
        }
    }
}

export default ProfilePage
