import tw from '@tailwind'

import { Aside, Profile } from './components'
import { FeedLayout } from './layouts'

import type { ProfileComponent } from './types'

const ProfileLayout: ProfileComponent = ({ children, ...props }) => {
    let { id } = props

    return (
        <>
            <figure className={tw`block w-full aspect-w-9 aspect-h-2 m-0`}>
                <img
                    className={tw`w-full object-cover object-center`}
                    src="/mountain.jpg"
                    alt="Cover"
                />
            </figure>
            <section
                className={tw`relative flex flex-col sm:flex-row justify-between w-full max-w-[1200px] gap-4 transform -translate-y-8 mx-auto px-4 md:px-8`}
            >
                <Profile {...props} />
                <FeedLayout id={id}>{children}</FeedLayout>
                <Aside />
            </section>
        </>
    )
}

export default ProfileLayout
