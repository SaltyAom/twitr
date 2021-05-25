import Prisma from '@database'

import type { PostBody, FavBody, ShareBody, GetPostParam } from './types'

export const post = async ({ id, ...post }: PostBody) =>
    await Prisma.post.create({
        data: {
            ...post,
            author: {
                connect: {
                    id
                }
            }
        }
    })

export const favorite = async ({ userId, postId }: FavBody) => {
    let current = await Prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            favoriteBy: {
                select: {
                    id: true
                }
            }
        }
    })

    if (!current) return null

    return await Prisma.post.update({
        where: {
            id: postId
        },
        data: {
            favoriteBy: {
                set: [{ id: userId }, ...current?.favoriteBy]
            }
        }
    })
}

export const share = async ({ userId, postId }: ShareBody) => {
    let current = await Prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            shareBy: {
                select: {
                    id: true
                }
            }
        }
    })

    if (!current) return null

    return await Prisma.post.update({
        where: {
            id: postId
        },
        data: {
            shareBy: {
                set: [{ id: userId }, ...current?.shareBy]
            }
        }
    })
}

export const getPost = async ({ id: idString }: GetPostParam) => {
    let id = +idString

    let [post, totalFavorite, totalShared] = await Prisma.$transaction([
        Prisma.post.findUnique({
            where: {
                id
            },
            select: {
                content: true,
                createdAt: true,
                images: true,
                author: {
                    select: {
                        profile: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                }
            }
        }),
        Prisma.user.count({
            where: {
                favorite: {
                    some: {
                        id
                    }
                }
            }
        }),
        Prisma.user.count({
            where: {
                share: {
                    some: {
                        id
                    }
                }
            }
        })
    ])

    return {
        ...post,
        totalFavorite,
        totalShared
    }
}
