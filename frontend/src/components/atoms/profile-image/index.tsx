import tw from '@tailwind'

import type { ProfileImageComponent } from './types'

const ProfileImage: ProfileImageComponent = ({
    profile: { id, name, image },
    large = false
}) => (
    <figure
        className={tw(
            `block m-0 ${
                large
                    ? 'max-w-[60px] max-h-[60px]'
                    : 'max-w-[48px] max-h-[48px]'
            } bg-gray-200 rounded-full overflow-hidden`
        )}
    >
        <img
            className={tw`w-full rounded-full`}
            src={
                image ||
                'https://avatars.githubusercontent.com/u/35027979?s=400&u=ec6d8d75369813b16a0dc8c426fffb0db1a383e2&v=4'
            }
            alt={name}
        />
    </figure>
)

export default ProfileImage
