import type { FastifyInstance } from 'fastify'

import { validate } from '@services/validation'
import { invalidForm, error, success } from '@services/response'

import { post, favorite, retweet, getPost } from './services'

import type { FavBody, PostBody, RetweetBody, GetPostParam } from './types'

export default (app: FastifyInstance) => {
    app.put<{ Body: PostBody }>('/create', async ({ body }, res) => {
        console.log(body)

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

    app.put<{ Body: RetweetBody }>('/retweet', async ({ body }, res) => {
        if (
            !validate(body, {
                userId: 'number',
                postId: 'number',
                content: 'string',
                images: 'array'
            })
        )
            return res.status(400).send(invalidForm())

        let shared = await retweet(body)

        if (!shared) return res.status(502).send(error('Something went wrong'))

        return success(shared)
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

    app.get<{
        Params: GetPostParam
    }>('/:id', async ({ params }, res) => {
        let post = await getPost(params)

        if (!post) return res.status(404).send(error('Post not existed'))

        return success(post)
    })

    return app
}
