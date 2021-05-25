import type { FastifyInstance } from 'fastify'

import { validate } from '@services/validation'
import { invalidForm, error, success } from '@services/response'

import { post, favorite, share, getPost } from './services'

import { FavBody, PostBody, ShareBody, GetPostParam } from './types'

export default (app: FastifyInstance) => {
    app.put<{ Body: PostBody }>('/create', async ({ body }, res) => {
        if (
            !validate(body, {
                id: 'number',
                content: 'string',
                images: 'array'
            })
        )
            return res.status(400).send(invalidForm())

        let posted = await post(body)

        if (!posted) return res.status(502).send(error('Something went wrong'))

        return success(posted)
    })

    app.patch<{ Body: FavBody }>('/favorite', async ({ body }, res) => {
        if (
            !validate(body, {
                userId: 'number',
                postId: 'number'
            })
        )
            return res.status(400).send(invalidForm())

        let favorited = await favorite(body)

        if (!favorited)
            return res.status(502).send(error('Something went wrong'))

        return success(favorited)
    })

    app.patch<{ Body: ShareBody }>('/share', async ({ body }, res) => {
        if (
            !validate(body, {
                userId: 'number',
                postId: 'number'
            })
        )
            return res.status(400).send(invalidForm())

        let shared = await share(body)

        if (!shared) return res.status(502).send(error('Something went wrong'))

        return success(shared)
    })

    app.get<{
        Params: GetPostParam
    }>('/:id', async ({ params }, res) => {
        let post = await getPost(params)

        if (!post) return res.status(404).send(error('Post not existed'))

        return success(post)
    })

    return app
}
