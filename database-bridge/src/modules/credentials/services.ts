import Prisma from '@database'
import { hash, verify } from '@services/hash'

import type {
    CredentialBody,
    CreateUserBody,
    ChangePasswordBody,
    ResetPasswordBody,
} from './types'

export const getCredential = async ({ username }: CredentialBody) =>
    await Prisma.user.findUnique({
        where: {
            username
        },
        select: {
            username: true,
            password: true
        }
    })

export const createUser = async ({ name, ...userData }: CreateUserBody) =>
    await Prisma.user.create({
        data: {
            ...userData,
            profile: {
                create: {
                    name
                }
            }
        }
    })

export const resetPassword = async ({ id, password }: ResetPasswordBody) =>
    await Prisma.user.update({
        where: {
            id
        },
        data: {
            password: await hash(password)
        }
    })

export const changePassword = async ({
    id,
    oldPassword,
    newPassword
}: ChangePasswordBody) => {
    let current = await Prisma.user.findUnique({
        where: {
            id
        },
        select: {
            password: true
        }
    })

    if (!current || !verify(current.password, oldPassword)) return

    return await resetPassword({ id, password: newPassword })
}
