import tw, { combine } from '@tailwind'
import { isSafari } from '@services/validation'

import type { ProfileComponent } from '../../types'

import styles from './profile.module.sass'

const Profile: ProfileComponent = ({
    profile: { name, bio },
    totalFollowedBy,
    totalFollowing
}) => (
    <header
        className={combine(
            tw(
                `sm:sticky ${
                    !isSafari ? 'top-[180px]' : 'top-[96px]'
                } flex flex-col items-center flex-1 h-content px-4 pb-4 bg-white rounded shadow-sm`
            ),
            styles.side
        )}
    >
        <figure
            className={combine(
                tw`absolute block bg-gray-200 m-0 rounded-full overflow-hidden border-8 border-solid border-white`,
                styles['profile-image']
            )}
        >
            <img
                className={tw`object-cover object-center w-full mx-auto rounded-full`}
                src="https://avatars.githubusercontent.com/u/35027979?s=400&u=ec6d8d75369813b16a0dc8c426fffb0db1a383e2&v=4"
                alt="Profile"
            />
        </figure>
        <div className={tw`block min-h-[60px]`} />
        <h2 className={tw`text-gray-800 text-2xl font-medium m-0`}>{name}</h2>
        {!!bio && (
            <h2 className={tw`text-gray-400 text-base font-normal my-2`}>
                {bio}
            </h2>
        )}
        <footer className={tw`flex flex-row justify-center w-full mt-4 pb-2`}>
            <section className={tw`flex flex-col items-center flex-1`}>
                <h3 className={tw`text-sm text-gray-400 font-normal m-0`}>
                    Followed by
                </h3>
                <h3 className={tw`text-3xl text-gray-700 font-medium m-0 mt-2`}>
                    {totalFollowedBy}
                </h3>
            </section>
            <section className={tw`flex flex-col items-center flex-1`}>
                <h3 className={tw`text-sm text-gray-400 font-normal m-0`}>
                    Following
                </h3>
                <h3 className={tw`text-3xl text-gray-700 font-medium m-0 mt-2`}>
                    {totalFollowing}
                </h3>
            </section>
        </footer>
    </header>
)

export default Profile
