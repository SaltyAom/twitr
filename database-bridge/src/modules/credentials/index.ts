import type { FastifyInstance } from 'fastify'

import { validate } from '@services/validation'
import { invalidForm, success, error } from '@services/response'
import { hash, verify } from '@services/hash'

import {
    getCredential,
    createUser,
    changePassword,
    resetPassword
} from './services'

import type {
    CredentialBody,
    CreateUserBody,
    ChangePasswordBody,
    ResetPasswordBody
} from './types'

export default async (app: FastifyInstance) => {
    app.post<{ Body: CredentialBody }>(
        '/validate',
        async ({ body }, res) => {
            if (!validate(body, { username: 'string', password: 'string' }))
                return res.status(400).send(invalidForm())

            let credential = await getCredential(body)

            if (
                !credential ||
                !(await verify(credential.password, body.password))
            )
                return res
                    .status(400)
                    .send(error('Username or password is incorrect'))

            return success({
                username: credential.username
            })
        }
    )

    app.put<{ Body: CreateUserBody }>('/create', async ({ body }, res) => {
        if (
            !validate(body, {
                name: 'string',
                username: 'string',
                password: 'string',
                email: 'string'
            })
        )
            return res.status(400).send(invalidForm())

        let user = await createUser({
            ...body,
            password: await hash(body.password)
        })

        if (!user) return res.status(502).send(error('Something went wrong'))

        return success(user)
    })

    app.patch<{ Body: ResetPasswordBody }>(
        '/reset/password',
        async ({ body }, res) => {
            if (
                !validate(body, {
                    id: 'number',
                    password: 'string'
                })
            )
                return res.status(400).send(invalidForm())

            let newCredential = await resetPassword(body)

            if (!newCredential)
                return res.status(403).send(error('Invalid user'))

            return success({
                username: newCredential.username
            })
        }
    )

    app.patch<{ Body: ChangePasswordBody }>(
        '/change/password',
        async ({ body }, res) => {
            if (
                !validate(body, {
                    id: 'number',
                    oldPassword: 'string',
                    newPassword: 'string'
                })
            )
                return res.status(400).send(invalidForm())

            let newCredential = await changePassword(body)

            if (!newCredential)
                return res.status(403).send(error('Incorrect password'))

            return success({
                username: newCredential.username
            })
        }
    )

    return app
}
