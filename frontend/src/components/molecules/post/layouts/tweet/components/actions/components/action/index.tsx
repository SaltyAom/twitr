import tw from '@tailwind'

import type { ActionComponent } from './types'

const TweetAction: ActionComponent = ({ Icon, value, onClick }) => (
    <button
        className={tw`appearance-none flex flex-row items-center text-base text-gray-400 p-0 pr-1 bg-transparent border-0`}
        type="button"
        onClick={onClick}
    >
        <Icon className={tw`w-[16px] h-[16px] mr-1`} />{value}
    </button>
)

export default TweetAction