import './alias'

import { config } from 'dotenv'

config()

import { fastify } from 'fastify'

import { base, credentials, profile, post } from '@modules'

import run from '@services/server'

const app = fastify()

const server = () => {
    app.register(base)
        .register(credentials, {
            prefix: '/credential'
        })
        .register(profile, {
            prefix: '/profile'
        })
        .register(post, {
            prefix: '/post'
        })
        .listen(8080, '0.0.0.0', (err, addr) => {
            if (err) return console.error(err)

            console.log(addr)
        })
}

run(server)
