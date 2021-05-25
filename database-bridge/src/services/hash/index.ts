import { hash as argon2Hash, argon2id } from 'argon2'
import type { Options } from 'argon2'

if (typeof process.env.salt === 'undefined') process.exit(1)

let saltString = process.env.salt
const salt = Buffer.from(saltString, 'utf8')

const argon2Config: Options = {
    version: 19,
    type: argon2id,
    salt,
    hashLength: 32,
    timeCost: 256,
    parallelism: 8,
    memoryCost: 1024 * 16
}

const rawHash = async (value: string) =>
    await argon2Hash(value, { ...argon2Config, raw: true })

export const hash = async (value: string) =>
    await rawHash(value).then((v) => v.toString())

export const verify = async (hashValue: string, value: string) =>
    !!(Buffer.from(hashValue).compare(await rawHash(value)) + 1)
