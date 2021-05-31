import tw from '@tailwind'

import dayjs from 'dayjs'

import type { AuthorNameComponent } from './types'

const AuthorName: AuthorNameComponent = ({ name, createdAt }) => (
    <h4 className={tw`text-lg text-gray-700 font-semibold m-0`}>
        {name} ·{' '}
        <span className={tw`text-gray-400 font-normal`}>
            {dayjs(createdAt).format('MMM D')}
        </span>
    </h4>
)

export default AuthorName
