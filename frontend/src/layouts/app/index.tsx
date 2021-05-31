import type { FunctionComponent } from 'react'

import Link from 'next/link'

import tw from '@tailwind'

const AppLayout: FunctionComponent = ({ children }) => (
    <section className={tw`flex flex-row min-h-screen bg-gray-100`}>
        <aside className={tw`hidden lg:flex flex-col sticky top-0 min-w-[220px] h-screen bg-white`}>
            <header
                className={tw`flex flex-row items-center min-h-[64px] px-6`}
            >
                <h1 className={tw`text-xl font-normal text-blue-400`}>Twitr</h1>
            </header>
            <Link href="/">
                <a
                    className={tw`flex flex-row w-full text-gray-600 text-lg font-normal no-underline px-6 py-6`}
                >
                    Home
                </a>
            </Link>
        </aside>
        <section className={tw`relative flex flex-col flex-1`}>
            <nav
                className={tw`sticky top-0 z-40 flex flex-row items-center w-full min-h-[64px] px-6 bg-white`}
            >
                Twitr
            </nav>
            <main className={tw`flex flex-col w-full`}>{children}</main>
        </section>
    </section>
)

export default AppLayout
