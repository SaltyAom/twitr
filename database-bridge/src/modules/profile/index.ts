import { validate } from '@services/validation'
import { invalidForm, success, error } from '@services/response'

import {
    getProfile,
    follow,
    getFollowing,
    getFollowedBy,
    getUserPosts
} from './services'

import type { FastifyInstance } from 'fastify'

import {
    ProfileBody,
    FollowBody,
    FollowingParam,
    FollowedByParam,
    GetUserPostParam
} from './types'

export default async (app: FastifyInstance) => {
    app.get<{ Params: ProfileBody }>(
        '/:id',
        async ({ params }, res) => {
            let profile = await getProfile(params)

            if (!profile) return res.status(400).send(error('User not existed'))

            return success(profile)
        }
    )

    app.patch<{ Body: FollowBody }>('/follow', async ({ body }, res) => {
        if (
            !validate(body, {
                from: 'number',
                to: 'number'
            })
        )
            return res.status(400).send(invalidForm())

        let followed = await follow(body)

        if (!followed)
            return res.status(502).send(error('Something went wrong'))

        return success(followed)
    })

    app.get<{
        Params: GetUserPostParam
    }>(
        '/:id/post/:pagination',
        async ({ params, params: { pagination } }, res) => {
            if (+pagination < 1) return res.status(400).send(invalidForm())

            let post = await getUserPosts(params)

            if (!post) return res.status(400).send(error('User not existed'))

            return success(post)
        }
    )

    app.get<{ Params: FollowingParam }>(
        '/:id/following/:pagination',
        async ({ params, params: { pagination } }, res) => {
            if (+pagination < 1) return res.status(400).send(invalidForm())

            let following = await getFollowing(params)

            if (!following)
                return res.status(502).send(error('Something went wrong'))

            return success(following)
        }
    )

    app.get<{ Params: FollowedByParam }>(
        '/:id/followedBy/:pagination',
        async ({ params, params: { pagination } }, res) => {
            if (+pagination < 1) return res.status(400).send(invalidForm())

            let followedBy = await getFollowedBy(params)

            if (!followedBy)
                return res.status(502).send(error('Something went wrong'))

            return success(followedBy)
        }
    )

    return app
}
