import { Heart, MessageCircle, Repeat, Share } from 'react-feather'

import tw from '@tailwind'

import { Action } from './components'

const TweetActions = () => {
    return (
        <footer className={tw`flex flex-row justify-between w-full pt-2 pr-12`}>
            <Action Icon={Heart} value={1} onClick={() => {}} />
            <Action Icon={Repeat} value={1} onClick={() => {}} />
            <Action Icon={MessageCircle} value={0} onClick={() => {}} />
            <Action Icon={Share} onClick={() => {}} />
        </footer>
    )
}

export default TweetActions
