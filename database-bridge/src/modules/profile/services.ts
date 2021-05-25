import Prisma from '@database'

import {
    ProfileBody,
    FollowBody,
    FollowingParam,
    FollowedByParam
} from './types'

const perPage = 25

export const getProfile = async ({ id: idString }: ProfileBody) => {
    let id = +idString

    let [profile, totalFollowing, totalFollowedBy] = await Prisma.$transaction([
        Prisma.user.findUnique({
            where: {
                id
            },
            select: {
                profile: {
                    select: {
                        name: true,
                        bio: true,
                        cover: true,
                        image: true,
                        joinAt: true
                    }
                }
            }
        }),
        Prisma.user.count({
            where: {
                following: {
                    some: {
                        id
                    }
                }
            }
        }),
        Prisma.user.count({
            where: {
                followedBy: {
                    some: {
                        id
                    }
                }
            }
        })
    ])

    if (!profile) return null

    return {
        ...profile,
        totalFollowing,
        totalFollowedBy
    }
}

export const follow = async ({ from, to }: FollowBody) => {
    let current = await Prisma.user.findUnique({
        where: {
            id: from
        },
        select: {
            following: {
                select: {
                    id: true
                }
            }
        }
    })

    if (!current) return null

    return await Prisma.user.update({
        where: {
            id: from
        },
        data: {
            following: {
                set: [...current.following, { id: to }]
            }
        }
    })
}

const getPage = (page: string | number) => +page * perPage

export const getFollowing = async ({ id, pagination }: FollowingParam) =>
    await Prisma.user.findUnique({
        where: {
            id: +id
        },
        select: {
            following: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                },
                skip: getPage(+pagination - 1),
                take: getPage(pagination)
            }
        }
    })

export const getFollowedBy = async ({ id, pagination }: FollowedByParam) =>
    await Prisma.user.findUnique({
        where: {
            id: +id
        },
        select: {
            followedBy: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                },
                skip: getPage(+pagination - 1),
                take: getPage(pagination)
            }
        }
    })
