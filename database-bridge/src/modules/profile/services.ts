import Prisma from '@database'

import {
    ProfileBody,
    GetUserPostParam,
    FollowBody,
    FollowingParam,
    FollowedByParam
} from './types'

const getPagination = (page: string | number, perPage: number) =>
    +page * perPage

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

const postPerPage = 15

export const getUserPosts = async ({ id, pagination }: GetUserPostParam) =>
    await Prisma.user.findUnique({
        where: {
            id: +id
        },
        select: {
            post: {
                select: {
                    id: true,
                    content: true,
                    images: true,
                    createdAt: true,
                    author: {
                        select: {
                            profile: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    },
                    retweetFromPost: {
                        select: {
                            id: true,
                            content: true,
                            images: true,
                            createdAt: true,
                            author: {
                                select: {
                                    profile: {
                                        select: {
                                            id: true,
                                            name: true,
                                            image: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                skip: getPagination(+pagination - 1, postPerPage),
                take: getPagination(pagination, postPerPage),
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

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

    if (current.following.some((user) => user.id === to)) {
        await Prisma.user.update({
            where: {
                id: from
            },
            data: {
                following: {
                    set: current.following.filter((user) => user.id !== to)
                }
            }
        })

        return {
            id: to,
            type: 'unfollowed'
        }
    } else {
        await Prisma.user.update({
            where: {
                id: from
            },
            data: {
                following: {
                    set: [...current.following, { id: to }]
                }
            }
        })

        return {
            id: to,
            type: 'followed'
        }
    }
}

const followerPerPage = 25

export const getFollowing = async ({ id, pagination }: FollowingParam) =>
    await Prisma.user.findUnique({
        where: {
            id: +id
        },
        select: {
            following: {
                select: {
                    profile: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            bio: true
                        }
                    }
                },
                skip: getPagination(+pagination - 1, followerPerPage),
                take: getPagination(pagination, followerPerPage)
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
                    profile: {
                        select: {
                            id: true,
                            name: true,
                            bio: true,
                            image: true
                        }
                    }
                },
                skip: getPagination(+pagination - 1, followerPerPage),
                take: getPagination(pagination, followerPerPage)
            }
        }
    })
