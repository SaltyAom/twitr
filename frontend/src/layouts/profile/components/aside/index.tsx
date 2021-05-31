import tw, { combine } from '@tailwind'

import styles from './profile.module.sass'

const Aside = () => {
    return (
        <aside
            className={combine(
                tw`hidden xl:flex flex-col flex-1 h-content p-4 bg-white rounded shadow-sm`,
                styles.side
            )}
        >
            Aside
        </aside>
    )
}

export default Aside
